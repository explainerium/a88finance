import "server-only";
import { prisma } from "@/lib/prisma";
import { makeExcerpt } from "@/lib/markdown";
import { blogPosts as staticPosts } from "@/lib/content";

/** Card shape consumed by the existing <BlogSection> marketing component. */
export type BlogCard = {
  slug: string;
  title: string;
  category: string;
  categoryIcon: string;
  excerpt: string;
  gradient?: "g2" | "g3";
  coverImage?: string;
  coverImageAlt?: string;
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
  coverImage: string | null;
  coverImageAlt: string | null;
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
    coverImage: post.coverImage ?? undefined,
    coverImageAlt: post.coverImageAlt ?? undefined,
  };
}

/** Categories that have at least one published post (for the blog filter). */
export async function getBlogCategories(): Promise<
  { name: string; slug: string }[]
> {
  try {
    return await prisma.category.findMany({
      where: { posts: { some: { published: true } } },
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    });
  } catch {
    return [];
  }
}

/**
 * Static demo posts (from content.ts) used as a fallback when the database
 * isn't configured — so the public site stays complete on a frontend-only
 * preview deploy with no DATABASE_URL.
 */
function staticCards(limit?: number): BlogCard[] {
  const cards: BlogCard[] = staticPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    categoryIcon: p.categoryIcon,
    excerpt: p.excerpt,
    gradient: p.gradient,
  }));
  return limit ? cards.slice(0, limit) : cards;
}

export function getStaticPost(slug: string) {
  return staticPosts.find((p) => p.slug === slug) ?? null;
}

/** Published posts as marketing cards (newest first). */
export async function getPublishedPostCards(limit?: number): Promise<BlogCard[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: limit,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        coverImage: true,
        coverImageAlt: true,
        categories: { select: { name: true }, take: 1 },
      },
    });
    return posts.map(toCard);
  } catch {
    // No database (e.g. frontend-only preview) — show the static demo posts.
    return staticCards(limit);
  }
}

/** Full post for the article page (only published posts are public). */
export async function getPublishedPostBySlug(slug: string) {
  try {
    return await prisma.post.findFirst({
      where: { slug, published: true },
      include: {
        author: { select: { name: true, image: true } },
        categories: { select: { name: true, slug: true } },
        tags: { select: { name: true, slug: true } },
      },
    });
  } catch {
    return null; // DB unavailable — the page falls back to the static post.
  }
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
      coverImage: true,
      coverImageAlt: true,
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
      coverImage: true,
      coverImageAlt: true,
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
