import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import {
  createCategoryAction,
  deleteCategoryAction,
} from "@/lib/actions/taxonomy";
import { CategoryForm } from "@/components/admin/category-form";
import { ActionButton } from "@/components/admin/action-button";
import { card } from "@/components/admin/classes";

export default async function AdminCategoriesPage() {
  await requireAdmin();

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold text-brand-ink">
          Categories
        </h1>
        <p className="mt-1 text-sm text-brand-ink-3">
          Topic groupings that power /blog/category/[slug] pages.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className={`${card} overflow-x-auto p-0`}>
          {categories.length === 0 ? (
            <p className="p-5 text-sm text-brand-ink-3">No categories yet.</p>
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
                {categories.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-3 font-medium text-brand-ink">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-brand-ink-3">/{c.slug}</td>
                    <td className="px-4 py-3 text-brand-ink-3">
                      {c._count.posts}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/categories/${c.id}/edit`}
                          className="text-xs font-medium text-brand-ink hover:text-brand-gold-deep"
                        >
                          Edit
                        </Link>
                        <ActionButton
                          action={deleteCategoryAction}
                          fields={{ id: c.id }}
                          confirm={`Delete category "${c.name}"?`}
                          className="text-xs font-medium text-red-600 hover:underline"
                          successMessage="Category deleted."
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
            New category
          </h2>
          <CategoryForm action={createCategoryAction} submitLabel="Add category" />
        </div>
      </div>
    </div>
  );
}
