import type { RequestHandler } from "@builder.io/qwik-city";
import { loadArticles } from "~/lib/content";

const SITE_URL = "https://crush.news";

export const onGet: RequestHandler = ({ send }) => {
  const articles = loadArticles();

  const months = new Set(articles.map((a) => a.publishedAt.slice(0, 7)));

  const sitemaps = Array.from(months)
    .sort()
    .reverse()
    .map(
      (ym) =>
        `  <sitemap>
    <loc>${SITE_URL}/sitemap-${ym}.xml</loc>
    <lastmod>${ym}-01</lastmod>
  </sitemap>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  send(
    new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    }),
  );
};
