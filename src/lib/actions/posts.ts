"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { slugify, uniqueSlug } from "@/lib/slug";
import { makeExcerpt } from "@/lib/markdown";
import {
  type FormState,
  str,
  bool,
  list,
  nullable,
} from "@/lib/actions/form-state";

const postInput = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  slug: z.string().trim().max(200).optional().default(""),
  content: z.string().trim().min(1, "Content is required."),
  metaTitle: z.string().trim().max(200).optional().default(""),
  metaDescription: z.string().trim().max(320).optional().default(""),
  coverImage: z.string().trim().max(2048).optional().default(""),
  coverImageAlt: z.string().trim().max(200).optional().default(""),
  published: z.boolean(),
  categoryIds: z.array(z.string()),
  tagIds: z.array(z.string()),
});

function parsePostForm(formData: FormData) {
  return postInput.safeParse({
    title: str(formData, "title"),
    slug: str(formData, "slug"),
    content: str(formData, "content"),
    metaTitle: str(formData, "metaTitle"),
    metaDescription: str(formData, "metaDescription"),
    coverImage: str(formData, "coverImage"),
    coverImageAlt: str(formData, "coverImageAlt"),
    published: bool(formData, "published"),
    categoryIds: list(formData, "categoryIds"),
    tagIds: list(formData, "tagIds"),
  });
}

/** Revalidate the public surfaces affected by a post change. */
function revalidatePostPaths(slug: string) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/dashboard/posts");
}

export async function createPostAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Not authenticated." };

  const parsed = parsePostForm(formData);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  let createdSlug: string;
  try {
    const base = slugify(data.slug || data.title);
    createdSlug = await uniqueSlug(
      base,
      async (candidate) =>
        (await prisma.post.count({ where: { slug: candidate } })) > 0,
    );

    await prisma.post.create({
      data: {
        title: data.title,
        slug: createdSlug,
        content: data.content,
        excerpt: makeExcerpt(data.content),
        metaTitle: nullable(data.metaTitle),
        metaDescription: nullable(data.metaDescription),
        coverImage: nullable(data.coverImage),
        coverImageAlt: nullable(data.coverImageAlt),
        published: data.published,
        publishedAt: data.published ? new Date() : null,
        authorId: user.id,
        categories: { connect: data.categoryIds.map((id) => ({ id })) },
        tags: { connect: data.tagIds.map((id) => ({ id })) },
      },
    });
  } catch (error) {
    console.error("[createPost]", error);
    return { ok: false, error: "Could not create the post. Please try again." };
  }

  revalidatePostPaths(createdSlug);
  redirect("/dashboard/posts");
}

export async function updatePostAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Not authenticated." };

  const id = str(formData, "id");
  if (!id) return { ok: false, error: "Missing post id." };

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Post not found." };

  // AUTHORs may only edit their own posts; ADMINs may edit any.
  if (user.role !== "ADMIN" && existing.authorId !== user.id) {
    return { ok: false, error: "You can only edit your own posts." };
  }

  const parsed = parsePostForm(formData);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  let finalSlug = existing.slug;
  try {
    // Recompute the slug only when the author explicitly changed it.
    const desired = slugify(data.slug || data.title);
    if (data.slug && desired !== existing.slug) {
      finalSlug = await uniqueSlug(
        desired,
        async (candidate) =>
          (await prisma.post.count({
            where: { slug: candidate, NOT: { id } },
          })) > 0,
      );
    }

    await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: finalSlug,
        content: data.content,
        excerpt: makeExcerpt(data.content),
        metaTitle: nullable(data.metaTitle),
        metaDescription: nullable(data.metaDescription),
        coverImage: nullable(data.coverImage),
        coverImageAlt: nullable(data.coverImageAlt),
        published: data.published,
        publishedAt: data.published
          ? (existing.publishedAt ?? new Date())
          : null,
        categories: { set: data.categoryIds.map((cid) => ({ id: cid })) },
        tags: { set: data.tagIds.map((tid) => ({ id: tid })) },
      },
    });
  } catch (error) {
    console.error("[updatePost]", error);
    return { ok: false, error: "Could not save the post. Please try again." };
  }

  // Revalidate both the old and new slug paths in case the slug changed.
  revalidatePostPaths(existing.slug);
  if (finalSlug !== existing.slug) revalidatePath(`/blog/${finalSlug}`);
  redirect("/dashboard/posts");
}

export async function deletePostAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Not authenticated." };

  const id = str(formData, "id");
  if (!id) return { ok: false, error: "Missing post id." };

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Post not found." };
  if (user.role !== "ADMIN" && existing.authorId !== user.id) {
    return { ok: false, error: "You can only delete your own posts." };
  }

  await prisma.post.delete({ where: { id } });
  revalidatePostPaths(existing.slug);
  return { ok: true };
}

/** Quick publish/unpublish toggle from the posts list. */
export async function togglePublishAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Not authenticated." };

  const id = str(formData, "id");
  if (!id) return { ok: false, error: "Missing post id." };

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Post not found." };
  if (user.role !== "ADMIN" && existing.authorId !== user.id) {
    return { ok: false, error: "You can only change your own posts." };
  }

  const nowPublished = !existing.published;
  await prisma.post.update({
    where: { id },
    data: {
      published: nowPublished,
      publishedAt: nowPublished ? (existing.publishedAt ?? new Date()) : null,
    },
  });
  revalidatePostPaths(existing.slug);
  return { ok: true };
}
