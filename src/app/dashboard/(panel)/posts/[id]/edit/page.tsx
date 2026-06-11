import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { updatePostAction } from "@/lib/actions/posts";
import { PostForm } from "@/components/dashboard/post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await getCurrentUser())!;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: { select: { id: true } },
      tags: { select: { id: true } },
    },
  });

  if (!post) notFound();

  // Authors can only edit their own posts; admins can edit any.
  if (user.role !== "ADMIN" && post.authorId !== user.id) {
    redirect("/dashboard/posts");
  }

  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.tag.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-brand-ink">
        Edit post
      </h1>
      <PostForm
        action={updatePostAction}
        categories={categories}
        tags={tags}
        submitLabel="Save changes"
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: post.content,
          metaTitle: post.metaTitle ?? "",
          metaDescription: post.metaDescription ?? "",
          coverImage: post.coverImage ?? "",
          coverImageAlt: post.coverImageAlt ?? "",
          published: post.published,
          categoryIds: post.categories.map((c) => c.id),
          tagIds: post.tags.map((t) => t.id),
        }}
      />
    </div>
  );
}
