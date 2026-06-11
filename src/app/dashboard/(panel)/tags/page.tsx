import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { deleteTagAction } from "@/lib/actions/taxonomy";
import { TagCreateForm } from "@/components/dashboard/tag-create-form";
import { ActionButton } from "@/components/dashboard/action-button";
import { actionBtn } from "@/components/dashboard/action-buttons";
import { card } from "@/components/dashboard/classes";

export default async function AdminTagsPage() {
  await requireAdmin();

  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold text-brand-ink">
          Tags
        </h1>
        <p className="mt-1 text-sm text-brand-ink-3">
          Lightweight topic labels that power /blog/tag/[slug] pages.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className={`${card} overflow-x-auto p-0`}>
          {tags.length === 0 ? (
            <p className="p-5 text-sm text-brand-ink-3">No tags yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-brand-ink-3">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Posts</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tags.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-3 font-medium text-brand-ink">
                      {t.name}
                    </td>
                    <td className="px-4 py-3 text-brand-ink-3">/{t.slug}</td>
                    <td className="px-4 py-3 text-brand-ink-3">
                      {t._count.posts}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <ActionButton
                          action={deleteTagAction}
                          fields={{ id: t.id }}
                          confirm={`Delete tag "${t.name}"?`}
                          className={actionBtn.delete}
                          successMessage="Tag deleted."
                        >
                          Delete
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={card}>
          <h2 className="mb-4 font-display text-base font-semibold text-brand-ink">
            New tag
          </h2>
          <TagCreateForm />
        </div>
      </div>
    </div>
  );
}
