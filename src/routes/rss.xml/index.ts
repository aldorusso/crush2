import type { RequestHandler } from "@builder.io/qwik-city";
import { loadArticles } from "~/lib/content";

const SITE_URL = "https://crush.news";
const SITE_NAME = "crush.news";
const SITE_DESC = "Tecnología, ciencia, cultura y estilo de vida en español.";

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toRfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

export const onGet: RequestHandler = ({ send }) => {
  const articles = loadArticles().slice(0, 50);

  const items = articles
    .map((a) => {
      const link = `${SITE_URL}/${a.category}/${a.subcategory}/${a.slug}/`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(a.description)}</description>
      <pubDate>${toRfc822(a.publishedAt)}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <enclosure url="${escapeXml(a.heroImage.src)}" type="image/jpeg" length="0" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESC}</description>
    <language>es-ES</language>
    <lastBuildDate>${toRfc822(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  send(
    new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }),
  );
};
