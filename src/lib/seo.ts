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
  publishedAt: string;
  updatedAt: string;
  author: string;
  section: string;
  tags: string[];
}) {
  return [
    { property: "og:type", content: "article" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: params.title },
    { property: "og:description", content: params.description },
    { property: "og:image", content: params.image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "675" },
    { property: "article:published_time", content: params.publishedAt },
    { property: "article:modified_time", content: params.updatedAt },
    { property: "article:author", content: params.author },
    { property: "article:section", content: params.section },
    ...params.tags.map((t) => ({ property: "article:tag", content: t })),
  ];
}

export function buildTwitterCard(params: {
  title: string;
  description: string;
  image: string;
}) {
  return [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: params.title },
    { name: "twitter:description", content: params.description },
    { name: "twitter:image", content: params.image },
    { name: "twitter:site", content: "@crushnews" },
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
