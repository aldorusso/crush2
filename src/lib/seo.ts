const SITE_URL = "https://crush.news";
const SITE_NAME = "crush.news";

export function buildHreflang(path: string) {
  const url = `${SITE_URL}${path}`;
  return [
    { rel: "alternate", hreflang: "es-ES", href: url },
    { rel: "alternate", hreflang: "x-default", href: url },
  ];
}

export function buildOgArticle(params: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageType?: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  section: string;
  tags: string[];
  isOpinion?: boolean;
}) {
  return [
    { property: "og:type", content: "article" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: params.title },
    { property: "og:description", content: params.description },
    { property: "og:url", content: params.url },
    { property: "og:image", content: params.image },
    { property: "og:image:alt", content: params.imageAlt },
    { property: "og:image:type", content: params.imageType ?? "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "675" },
    { property: "article:published_time", content: params.publishedAt },
    { property: "article:modified_time", content: params.updatedAt },
    { property: "article:author", content: params.author },
    { property: "article:section", content: params.section },
    { property: "article:content_tier", content: "free" },
    { property: "article:opinion", content: params.isOpinion ? "true" : "false" },
    ...params.tags.map((t) => ({ property: "article:tag", content: t })),
    { name: "author", content: params.author },
  ];
}

export function buildTwitterCard(params: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
  creator?: string;
}) {
  const tags = [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: params.title },
    { name: "twitter:description", content: params.description },
    { name: "twitter:image", content: params.image },
    { name: "twitter:image:alt", content: params.imageAlt },
    { name: "twitter:url", content: params.url },
    { name: "twitter:domain", content: "crush.news" },
    { name: "twitter:site", content: "@crushnews" },
  ];
  if (params.creator) {
    const handle = params.creator.startsWith("@") ? params.creator : `@${params.creator}`;
    tags.push({ name: "twitter:creator", content: handle });
  }
  return tags;
}

export function buildArticleExtraMeta(params: {
  tags: string[];
  year?: number;
}) {
  const year = params.year ?? new Date().getUTCFullYear();
  // News Keywords: up to 10 comma-separated, Google News reads these.
  const keywords = params.tags.slice(0, 10).join(", ");
  // Note: content-language http-equiv intentionally omitted; <html lang>
  // serves the same purpose and Qwik's DocumentMeta doesn't emit http-equiv
  // with the hyphen correctly in current dev output.
  return [
    { name: "keywords", content: keywords },
    { name: "news_keywords", content: keywords },
    { name: "copyright", content: `© ${year} ${SITE_NAME}` },
  ];
}

export function buildRobotsMeta(noindex = false) {
  return [
    {
      name: "robots",
      content: noindex
        ? "noindex, nofollow"
        : "max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
  ];
}

export function buildOgPage(params: { title: string; description: string }) {
  return [
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: params.title },
    { property: "og:description", content: params.description },
  ];
}
