import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { prisma } from "@/lib/prisma";

// Generated per-request (DB access at runtime only — the Prisma 7 query
// compiler crashes Next's Turbopack build workers during prerender).
export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/services/personal-loans",
  "/services/business-loans",
  "/services/car-finance",
  "/blog",
  "/contact",
  "/apply",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [posts, categories, tags] = await Promise.all([
      prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.category.findMany({ select: { slug: true } }),
      prisma.tag.findMany({ select: { slug: true } }),
    ]);

    dynamicRoutes = [
      ...posts.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...categories.map((c) => ({
        url: `${base}/blog/category/${c.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
      ...tags.map((t) => ({
        url: `${base}/blog/tag/${t.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      })),
    ];
  } catch {
    // DB unavailable — ship the static routes only.
    dynamicRoutes = [];
  }

  return [...staticRoutes, ...dynamicRoutes];
}
