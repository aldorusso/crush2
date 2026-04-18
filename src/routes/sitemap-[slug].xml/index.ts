import type { RequestHandler } from "@builder.io/qwik-city";
import { loadArticles } from "~/lib/content";

const SITE_URL = "https://crush.news";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const onGet: RequestHandler = ({ params, send, status }) => {
  const slug = params["slug"] ?? "";
  const match = /^(\d{4})-(\d{2})$/.exec(slug);
  if (!match) {
    status(404);
    send(new Response("Not found", { status: 404 }));
    return;
  }

  const [, year, month] = match;
  const prefix = `${year}-${month}`;

  const articles = loadArticles().filter((a) => a.publishedAt.startsWith(prefix));

  const urls = articles
    .map((a) => {
      const loc = `${SITE_URL}/${a.category}/${a.subcategory}/${a.slug}/`;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${a.updatedAt.slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  send(
    new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    }),
  );
};
