import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon, Plus, X } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import {
  deletePostAction,
  togglePublishAction,
} from "@/lib/actions/posts";
import { ActionButton } from "@/components/admin/action-button";
import { actionBtn } from "@/components/admin/action-buttons";
import { btnPrimary, card } from "@/components/admin/classes";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = (await getCurrentUser())!;
  const isAdmin = user.role === "ADMIN";

  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const baseWhere = isAdmin ? {} : { authorId: user.id };
  const posts = await prisma.post.findMany({
    where: query
      ? { ...baseWhere, title: { contains: query, mode: "insensitive" } }
      : baseWhere,
    orderBy: [{ updatedAt: "desc" }],
    include: {
      author: { select: { name: true, email: true } },
      categories: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-ink">
            Posts
          </h1>
          <p className="mt-1 text-sm text-brand-ink-3">
            {isAdmin ? "All blog posts." : "Your blog posts."}
          </p>
        </div>
        <Link href="/admin/posts/new" className={btnPrimary}>
          <Plus className="size-4" />
          New post
        </Link>
      </header>

      {query && (
        <div className="flex items-center gap-2 text-sm text-brand-ink-3">
          <span>
            {posts.length} result{posts.length === 1 ? "" : "s"} for{" "}
            <span className="font-semibold text-brand-ink">
              &ldquo;{query}&rdquo;
            </span>
          </span>
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs hover:border-brand-gold hover:text-brand-gold-deep"
          >
            <X className="size-3" />
            Clear
          </Link>
        </div>
      )}

      {posts.length === 0 ? (
        <div className={`${card} text-center`}>
          <p className="text-sm text-brand-ink-3">
            {query ? (
              <>No posts match your search.</>
            ) : (
              <>
                No posts yet.{" "}
                <Link href="/admin/posts/new" className="text-brand-gold-deep hover:underline">
                  Create one →
                </Link>
              </>
            )}
          </p>
        </div>
      ) : (
        <div className={`${card} overflow-x-auto p-0`}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-brand-ink-3">
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                {isAdmin && <th className="px-4 py-3 font-semibold">Author</th>}
                <th className="px-4 py-3 font-semibold">Updated</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="align-middle">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt=""
                          width={56}
                          height={40}
                          className="h-10 w-14 shrink-0 rounded-md object-cover"
                        />
                      ) : (
                        <span className="grid h-10 w-14 shrink-0 place-items-center rounded-md border border-border bg-brand-paper-2 text-brand-ink-3">
                          <ImageIcon className="size-4" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="font-medium text-brand-ink hover:text-brand-gold-deep"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-brand-ink-3">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        post.published
                          ? "rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700"
                          : "rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700"
                      }
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-brand-ink-3">
                      {post.author.name || post.author.email}
                    </td>
                  )}
                  <td className="px-4 py-3 text-brand-ink-3">
                    {post.updatedAt.toLocaleDateString("en-AU")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className={actionBtn.view}
                        >
                          View
                        </Link>
                      )}
                      <ActionButton
                        action={togglePublishAction}
                        fields={{ id: post.id }}
                        className={
                          post.published ? actionBtn.unpublish : actionBtn.publish
                        }
                        successMessage={
                          post.published ? "Unpublished." : "Published."
                        }
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </ActionButton>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className={actionBtn.edit}
                      >
                        Edit
                      </Link>
                      <ActionButton
                        action={deletePostAction}
                        fields={{ id: post.id }}
                        confirm={`Delete "${post.title}"? This can't be undone.`}
                        className={actionBtn.delete}
                        successMessage="Post deleted."
                      >
                        Delete
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
