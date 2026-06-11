import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { updateCategoryAction } from "@/lib/actions/taxonomy";
import { CategoryForm } from "@/components/dashboard/category-form";
import { btnGhost, card } from "@/components/dashboard/classes";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="font-display text-2xl font-semibold text-brand-ink">
        Edit category
      </h1>
      <div className={card}>
        <CategoryForm
          action={updateCategoryAction}
          submitLabel="Save changes"
          redirectOnDone="/dashboard/categories"
          category={{
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description ?? "",
          }}
        />
      </div>
      <Link href="/dashboard/categories" className={btnGhost}>
        Back to categories
      </Link>
    </div>
  );
}
