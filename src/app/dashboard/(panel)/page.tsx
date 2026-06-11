import Link from "next/link";
import { FileText, FolderTree, Plus, Tags, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { btnPrimary, card } from "@/components/dashboard/classes";

export default async function AdminOverviewPage() {
  const user = (await getCurrentUser())!; // guaranteed by panel layout
  const isAdmin = user.role === "ADMIN";
  const postWhere = isAdmin ? {} : { authorId: user.id };

  const [totalPosts, published, drafts, userCount, categoryCount, tagCount, recent] =
    await Promise.all([
      prisma.post.count({ where: postWhere }),
      prisma.post.count({ where: { ...postWhere, published: true } }),
      prisma.post.count({ where: { ...postWhere, published: false } }),
      isAdmin
        ? prisma.user.count({ where: { deletedAt: null } })
        : Promise.resolve(0),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.post.findMany({
        where: postWhere,
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: { author: { select: { name: true, email: true } } },
      }),
    ]);

  const stats = [
    { label: isAdmin ? "Total posts" : "Your posts", value: totalPosts, icon: FileText },
    { label: "Published", value: published, icon: FileText },
    { label: "Drafts", value: drafts, icon: FileText },
    ...(isAdmin
      ? [{ label: "Users", value: userCount, icon: Users as typeof FileText }]
      : []),
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-ink">
            Welcome back{user.name ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-1 text-sm text-brand-ink-3">
            {isAdmin
              ? "You have full access to posts, users, and settings."
              : "Manage your own blog posts here."}
          </p>
        </div>
        <Link href="/dashboard/posts/new" className={btnPrimary}>
          <Plus className="size-4" />
          New post
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={card}>
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-gold/10 text-brand-gold-deep">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-2xl font-semibold leading-tight text-brand-ink">
                    {s.value}
                  </p>
                  <p className="truncate text-xs font-medium text-brand-ink-3">
                    {s.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className={card}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-brand-ink">
            Recent posts
          </h2>
          <Link
            href="/dashboard/posts"
            className="text-sm font-medium text-brand-gold-deep hover:underline"
          >
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-brand-ink-3">
            No posts yet.{" "}
            <Link href="/dashboard/posts/new" className="text-brand-gold-deep hover:underline">
              Write your first one →
            </Link>
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <Link
                    href={`/dashboard/posts/${post.id}/edit`}
                    className="block truncate text-sm font-medium text-brand-ink hover:text-brand-gold-deep"
                  >
                    {post.title}
                  </Link>
                  <p className="truncate text-xs text-brand-ink-3">
                    {post.author.name || post.author.email} ·{" "}
                    {post.updatedAt.toLocaleDateString("en-AU")}
                  </p>
                </div>
                <span
                  className={
                    post.published
                      ? "shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700"
                      : "shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700"
                  }
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {isAdmin && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/dashboard/categories" className={`${card} flex items-center gap-3 hover:border-brand-gold`}>
            <FolderTree className="size-5 text-brand-gold" />
            <div>
              <p className="text-sm font-semibold text-brand-ink">Categories</p>
              <p className="text-xs text-brand-ink-3">{categoryCount} total</p>
            </div>
          </Link>
          <Link href="/dashboard/tags" className={`${card} flex items-center gap-3 hover:border-brand-gold`}>
            <Tags className="size-5 text-brand-gold" />
            <div>
              <p className="text-sm font-semibold text-brand-ink">Tags</p>
              <p className="text-xs text-brand-ink-3">{tagCount} total</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
