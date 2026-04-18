import type { Article, Author } from "./types";

const SITE_URL = "https://crush.news";
const SITE_NAME = "crush.news";
const LOGO_URL = `${SITE_URL}/logo.png`;

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "es-ES",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/buscar/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 600,
      height: 60,
    },
    sameAs: [],
  };
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildArticleSchema(
  article: Article,
  author?: Author,
  sectionName?: string,
) {
  const articleUrl = `${SITE_URL}/${article.category}/${article.subcategory}/${article.slug}/`;
  const imageBase = article.heroImage.src;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    alternativeHeadline: article.description,
    description: article.description,
    image: [
      imageBase,
      imageBase.replace("1200/675", "1200/1200"),
      imageBase.replace("1200/675", "1200/900"),
    ],
    thumbnailUrl: imageBase,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: `${SITE_URL}/autor/${author.slug}/`,
          jobTitle: author.role,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL, width: 600, height: 60 },
    },
    isPartOf: { "@type": "CreativeWork", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    articleSection: sectionName ?? article.category,
    articleBody: stripHtml(article.body),
    keywords: article.tags.join(", "),
    inLanguage: "es-ES",
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content",
        "/html/body//h1",
      ],
    },
  };
}

export function buildBreadcrumbSchema(
  crumbs: Array<{ label: string; href?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${SITE_URL}${c.href}` : undefined,
    })),
  };
}

export function buildPersonSchema(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `${SITE_URL}/autor/${author.slug}/`,
    jobTitle: author.role,
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    knowsAbout: author.expertise,
    image: author.avatar,
    sameAs: [
      author.twitter ? `https://twitter.com/${author.twitter.replace("@", "")}` : null,
      author.linkedin ? `https://linkedin.com/in/${author.linkedin}` : null,
    ].filter(Boolean),
  };
}

export function schemaToScript(schema: object) {
  return {
    props: { type: "application/ld+json" },
    script: JSON.stringify(schema),
  };
}
