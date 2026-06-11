"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { slugify, uniqueSlug } from "@/lib/slug";
import { type FormState, str, nullable } from "@/lib/actions/form-state";

async function requireAdmin(): Promise<string | null> {
  const user = await getCurrentUser();
  if (!user) return "Not authenticated.";
  if (user.role !== "ADMIN") return "Admins only.";
  return null;
}

const categoryInput = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80),
  slug: z.string().trim().max(80).optional().default(""),
  description: z.string().trim().max(400).optional().default(""),
});

const tagInput = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80),
  slug: z.string().trim().max(80).optional().default(""),
});

function revalidateBlogTaxonomy() {
  revalidatePath("/blog");
  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard/tags");
}

// ── Categories ──────────────────────────────────────────────────────────────

export async function createCategoryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const authError = await requireAdmin();
  if (authError) return { ok: false, error: authError };

  const parsed = categoryInput.safeParse({
    name: str(formData, "name"),
    slug: str(formData, "slug"),
    description: str(formData, "description"),
  });
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const d = parsed.data;

  try {
    const slug = await uniqueSlug(
      slugify(d.slug || d.name),
      async (c) => (await prisma.category.count({ where: { slug: c } })) > 0,
    );
    await prisma.category.create({
      data: { name: d.name, slug, description: nullable(d.description) },
    });
  } catch (error) {
    console.error("[createCategory]", error);
    return { ok: false, error: "Could not create the category." };
  }

  revalidateBlogTaxonomy();
  return { ok: true };
}

export async function updateCategoryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const authError = await requireAdmin();
  if (authError) return { ok: false, error: authError };

  const id = str(formData, "id");
  if (!id) return { ok: false, error: "Missing category id." };

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Category not found." };

  const parsed = categoryInput.safeParse({
    name: str(formData, "name"),
    slug: str(formData, "slug"),
    description: str(formData, "description"),
  });
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const d = parsed.data;

  try {
    const desired = slugify(d.slug || d.name);
    const slug =
      desired === existing.slug
        ? existing.slug
        : await uniqueSlug(
            desired,
            async (c) =>
              (await prisma.category.count({
                where: { slug: c, NOT: { id } },
              })) > 0,
          );
    await prisma.category.update({
      where: { id },
      data: { name: d.name, slug, description: nullable(d.description) },
    });
  } catch (error) {
    console.error("[updateCategory]", error);
    return { ok: false, error: "Could not update the category." };
  }

  revalidateBlogTaxonomy();
  return { ok: true };
}

export async function deleteCategoryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const authError = await requireAdmin();
  if (authError) return { ok: false, error: authError };

  const id = str(formData, "id");
  if (!id) return { ok: false, error: "Missing category id." };

  try {
    await prisma.category.delete({ where: { id } });
  } catch (error) {
    console.error("[deleteCategory]", error);
    return { ok: false, error: "Could not delete the category." };
  }

  revalidateBlogTaxonomy();
  return { ok: true };
}

// ── Tags ────────────────────────────────────────────────────────────────────

export async function createTagAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const authError = await requireAdmin();
  if (authError) return { ok: false, error: authError };

  const parsed = tagInput.safeParse({
    name: str(formData, "name"),
    slug: str(formData, "slug"),
  });
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const d = parsed.data;

  try {
    const slug = await uniqueSlug(
      slugify(d.slug || d.name),
      async (c) => (await prisma.tag.count({ where: { slug: c } })) > 0,
    );
    await prisma.tag.create({ data: { name: d.name, slug } });
  } catch (error) {
    console.error("[createTag]", error);
    return { ok: false, error: "Could not create the tag." };
  }

  revalidateBlogTaxonomy();
  return { ok: true };
}

export async function deleteTagAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const authError = await requireAdmin();
  if (authError) return { ok: false, error: authError };

  const id = str(formData, "id");
  if (!id) return { ok: false, error: "Missing tag id." };

  try {
    await prisma.tag.delete({ where: { id } });
  } catch (error) {
    console.error("[deleteTag]", error);
    return { ok: false, error: "Could not delete the tag." };
  }

  revalidateBlogTaxonomy();
  return { ok: true };
}
