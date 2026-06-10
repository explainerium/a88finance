import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ContentIcon } from "@/components/shared/icon";
import { Reveal } from "@/components/shared/reveal";
import { blogPosts as defaultPosts, type BlogPost } from "@/lib/content";

type BlogSectionProps = {
  kicker?: string;
  title?: string;
  intro?: string;
  posts?: BlogPost[];
  cta?: { label: string; href: string };
  /** Optional element rendered between the heading and the grid (e.g. filters). */
  filter?: React.ReactNode;
};

export function BlogSection({
  kicker = "Blog",
  title = "Your Finance Guide",
  intro = "Clear tips and real advice that explain the finance process and help you make informed choices at every step.",
  posts = defaultPosts,
  cta = { label: "View All Blogs", href: "/blog" },
  filter,
}: BlogSectionProps) {
  return (
    <section className="blog section-pad">
      <div className="wrap">
        <div className="svc-top">
          <Reveal className="shead">
            <span className="kicker">{kicker}</span>
            <h2>{title}</h2>
            <p>{intro}</p>
          </Reveal>
          {cta && (
            <Link className="btn btn-ghost" href={cta.href}>
              {cta.label}
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        {filter}

        <div className="blog-grid">
          {posts.map((post, i) => (
            <Reveal as="article" className="bcard" key={post.slug} delay={i * 0.05}>
              <Link href={`/blog/${post.slug}`}>
                <div className={`top${post.gradient ? ` ${post.gradient}` : ""}`}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt || post.title}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px"
                      className="object-cover"
                    />
                  ) : (
                    <ContentIcon name={post.categoryIcon} />
                  )}
                  <span>{post.category}</span>
                </div>
                <div className="body">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="readmore">
                    Read more <ArrowRight />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
