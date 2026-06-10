import { prisma } from "@/lib/prisma";
import { createPostAction } from "@/lib/actions/posts";
import { PostForm } from "@/components/admin/post-form";

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.tag.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-brand-ink">
        New post
      </h1>
      <PostForm
        action={createPostAction}
        categories={categories}
        tags={tags}
        submitLabel="Create post"
      />
    </div>
  );
}
