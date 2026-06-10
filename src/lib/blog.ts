import "server-only";
import { prisma } from "@/lib/prisma";
import { makeExcerpt } from "@/lib/markdown";

/** Card shape consumed by the existing <BlogSection> marketing component. */
export type BlogCard = {
  slug: string;
  title: string;
  category: string;
  categoryIcon: string;
  excerpt: string;
  gradient?: "g2" | "g3";
};

const GRADIENTS: (undefined | "g2" | "g3")[] = [undefined, "g2", "g3"];

const ICON_BY_CATEGORY: Record<string, string> = {
  business: "building",
  "business finance": "building",
  "business loans": "building",
  "car finance": "car",
  "vehicle finance": "car",
  "personal loans": "user",
  credit: "shield",
  specialty: "shield",
};

function iconForCategory(name?: string): string {
  if (!name) return "fileText";
  return ICON_BY_CATEGORY[name.toLowerCase()] ?? "fileText";
}

type PostWithCategory = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  categories: { name: string }[];
};

function toCard(post: PostWithCategory, index: number): BlogCard {
  return {
    slug: post.slug,
    title: post.title,
    category: post.categories[0]?.name ?? "Article",
    categoryIcon: iconForCategory(post.categories[0]?.name),
    excerpt: post.excerpt ?? makeExcerpt(post.content),
    gradient: GRADIENTS[index % GRADIENTS.length],
  };
}

/** Published posts as marketing cards (newest first). */
export async function getPublishedPostCards(limit?: number): Promise<BlogCard[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: limit,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      categories: { select: { name: true }, take: 1 },
    },
  });
  return posts.map(toCard);
}

/** Full post for the article page (only published posts are public). */
export async function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
    include: {
      author: { select: { name: true, image: true } },
      categories: { select: { name: true, slug: true } },
      tags: { select: { name: true, slug: true } },
    },
  });
}

/** Slugs of all published posts (for generateStaticParams / sitemap). */
export async function getPublishedSlugs(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => p.slug);
}

/** Published posts within a category, plus the category record. */
export async function getCategoryWithPosts(slug: string) {
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return null;
  const posts = await prisma.post.findMany({
    where: { published: true, categories: { some: { slug } } },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      categories: { select: { name: true }, take: 1 },
    },
  });
  return { category, posts: posts.map(toCard) };
}

/** Published posts carrying a tag, plus the tag record. */
export async function getTagWithPosts(slug: string) {
  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) return null;
  const posts = await prisma.post.findMany({
    where: { published: true, tags: { some: { slug } } },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      categories: { select: { name: true }, take: 1 },
    },
  });
  return { tag, posts: posts.map(toCard) };
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await prisma.category.findMany({ select: { slug: true } });
  return categories.map((c) => c.slug);
}

export async function getAllTagSlugs(): Promise<string[]> {
  const tags = await prisma.tag.findMany({ select: { slug: true } });
  return tags.map((t) => t.slug);
}
