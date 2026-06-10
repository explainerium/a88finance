import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { deleteTagAction } from "@/lib/actions/taxonomy";
import { TagCreateForm } from "@/components/admin/tag-create-form";
import { ActionButton } from "@/components/admin/action-button";
import { card } from "@/components/admin/classes";

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
        <div className={card}>
          {tags.length === 0 ? (
            <p className="text-sm text-brand-ink-3">No tags yet.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-2 rounded-full border border-border bg-brand-paper-2 px-3 py-1.5 text-sm text-brand-ink"
                >
                  <span>{t.name}</span>
                  <span className="text-xs text-brand-ink-3">
                    ({t._count.posts})
                  </span>
                  <ActionButton
                    action={deleteTagAction}
                    fields={{ id: t.id }}
                    confirm={`Delete tag "${t.name}"?`}
                    className="text-red-500 hover:text-red-700"
                    successMessage="Tag deleted."
                    pendingLabel="…"
                  >
                    ×
                  </ActionButton>
                </li>
              ))}
            </ul>
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
