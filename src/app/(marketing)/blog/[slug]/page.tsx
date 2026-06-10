import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { JsonLd } from "@/components/shared/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";
import { getPublishedPostBySlug, getStaticPost } from "@/lib/blog";
import { makeExcerpt } from "@/lib/markdown";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// ISR: each post is generated on first request and cached, then revalidated
// hourly + on-demand (revalidatePath) when edited/published. We don't enumerate
// slugs at build time on purpose — the Prisma 7 query compiler crashes Next's
// Turbopack build workers, so all DB access happens at runtime.
export const revalidate = 3600;
export const dynamicParams = true;

function absoluteUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    // Static demo fallback (no DB configured).
    const sp = getStaticPost(slug);
    if (!sp) return { title: "Article not found", robots: { index: false } };
    return {
      title: sp.title,
      description: sp.excerpt,
      alternates: { canonical: `/blog/${sp.slug}` },
      openGraph: {
        type: "article",
        title: sp.title,
        description: sp.excerpt,
        url: `${siteConfig.url}/blog/${sp.slug}`,
      },
    };
  }

  const description =
    post.metaDescription || post.excerpt || makeExcerpt(post.content);
  const ogImage = absoluteUrl(post.coverImage);

  return {
    title: post.metaTitle || post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author.name ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage, alt: post.coverImageAlt ?? post.title }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: post.metaTitle || post.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    // No DB post — render the static demo article if the slug matches one.
    const sp = getStaticPost(slug);
    if (!sp) notFound();
    return <StaticArticle post={sp} />;
  }

  const description =
    post.metaDescription || post.excerpt || makeExcerpt(post.content);
  // Content is rich HTML produced by the TipTap editor; render it directly.
  const html = post.content;
  const primaryCategory = post.categories[0];

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description,
          slug: post.slug,
          image: absoluteUrl(post.coverImage),
          datePublished: post.publishedAt?.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          authorName: post.author.name ?? undefined,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article className="section-pad">
        <div className="wrap">
          <Reveal className="shead">
            <div style={{ maxWidth: "760px" }}>
              {primaryCategory && (
                <Link
                  href={`/blog/category/${primaryCategory.slug}`}
                  className="kicker"
                >
                  {primaryCategory.name}
                </Link>
              )}
              <h1
                style={{
                  fontSize: "clamp(2rem,4vw,3rem)",
                  lineHeight: 1.08,
                  margin: "10px 0 16px",
                }}
              >
                {post.title}
              </h1>
              <p className="text-brand-ink-3" style={{ fontSize: "0.95rem" }}>
                {post.author.name ? `By ${post.author.name}` : null}
                {post.publishedAt && (
                  <>
                    {post.author.name ? " · " : ""}
                    <time dateTime={post.publishedAt.toISOString()}>
                      {post.publishedAt.toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </>
                )}
              </p>
            </div>
          </Reveal>

          {post.coverImage && (
            <Reveal>
              <div
                style={{
                  position: "relative",
                  maxWidth: "860px",
                  aspectRatio: "16 / 9",
                  margin: "28px 0 8px",
                  borderRadius: "18px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt ?? post.title}
                  fill
                  sizes="(max-width: 880px) 100vw, 860px"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          )}

          <Reveal>
            <div
              className="article-body"
              style={{ maxWidth: "760px", marginTop: "28px" }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Reveal>

          {post.tags.length > 0 && (
            <div
              className="flex flex-wrap gap-2"
              style={{ maxWidth: "760px", marginTop: "32px" }}
            >
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="rounded-full border border-[color:var(--line)] px-3 py-1 text-sm text-brand-ink-3 transition-colors hover:border-brand-gold hover:text-brand-gold-deep"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          <div style={{ marginTop: "40px" }}>
            <Link className="btn btn-ghost" href="/blog">
              <ArrowLeft size={18} />
              Back to blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

/** Fallback article view for the static demo posts (used when there's no DB). */
function StaticArticle({
  post,
}: {
  post: { slug: string; title: string; category: string; excerpt: string };
}) {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article className="section-pad">
        <div className="wrap">
          <Reveal className="shead">
            <div style={{ maxWidth: "760px" }}>
              <span className="kicker">{post.category}</span>
              <h1
                style={{
                  fontSize: "clamp(2rem,4vw,3rem)",
                  lineHeight: 1.08,
                  margin: "10px 0 16px",
                }}
              >
                {post.title}
              </h1>
              <p style={{ fontSize: "1.08rem" }}>{post.excerpt}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="article-body" style={{ maxWidth: "760px", marginTop: "28px" }}>
              <p>
                {post.excerpt} In this article we break the topic down into
                clear, practical steps so you know exactly what to consider
                before making a decision, and where A88 Finance Group can help.
              </p>
              <p className="text-brand-gold-deep" style={{ fontWeight: 600 }}>
                The full article is coming soon. In the meantime, get in touch
                and we&apos;ll walk you through your options one-on-one.
              </p>
            </div>
          </Reveal>

          <div style={{ marginTop: "40px" }}>
            <Link className="btn btn-ghost" href="/blog">
              <ArrowLeft size={18} />
              Back to blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
