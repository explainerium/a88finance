import { siteConfig } from "@/lib/site-config";

const { url, name, description, contact, socials, hours } = siteConfig;

const dayMap: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
};

export const localBusinessSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${url}/#organization`,
  name,
  description,
  url,
  telephone: contact.phone,
  email: contact.email,
  image: `${url}/logo.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 3752, 470 St Kilda Road",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    postalCode: "3004",
    addressCountry: "AU",
  },
  areaServed: "AU",
  priceRange: "$$",
  sameAs: [socials.facebook, socials.linkedin, socials.instagram],
  openingHoursSpecification: hours
    .filter((h) => dayMap[h.day])
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[h.day],
      opens: "09:30",
      closes: "17:00",
    })),
};

export const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  url,
};

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}): Record<string, unknown> {
  const canonical = `${url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(post.image ? { image: [post.image] } : {}),
    author: {
      "@type": post.authorName ? "Person" : "Organization",
      name: post.authorName ?? name,
    },
    publisher: {
      "@type": "Organization",
      name,
      logo: { "@type": "ImageObject", url: `${url}/logo.svg` },
    },
    ...(post.datePublished ? { datePublished: post.datePublished } : {}),
    ...(post.dateModified ? { dateModified: post.dateModified } : {}),
  };
}
