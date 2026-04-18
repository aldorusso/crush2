import type { RequestHandler } from "@builder.io/qwik-city";

const SITE_URL = "https://crush.news";

export const onGet: RequestHandler = ({ send }) => {
  const content = `# crush.news robots.txt — reviewed quarterly

User-agent: Googlebot
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: *
Allow: /
Disallow: /buscar/

Sitemap: ${SITE_URL}/sitemap.xml
`;

  send(
    new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }),
  );
};
