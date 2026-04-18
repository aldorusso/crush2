import type { Article } from "./types";

const MIN_KEYWORD_LENGTH = 4;
const MAX_LINKS = 4;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface KeywordEntry {
  slug: string;
  href: string;
  priority: number;
}

function buildKeywordMap(
  currentSlug: string,
  currentCategory: string,
  articles: Article[],
): Map<string, KeywordEntry> {
  const map = new Map<string, KeywordEntry>();

  for (const article of articles) {
    if (article.slug === currentSlug) continue;

    const href = `/${article.category}/${article.subcategory}/${article.slug}/`;
    // Same category = higher priority
    const priority = article.category === currentCategory ? 2 : 1;

    for (const tag of article.tags) {
      const keyword = tag.replace(/-/g, " ").toLowerCase();
      if (keyword.length < MIN_KEYWORD_LENGTH) continue;

      const existing = map.get(keyword);
      if (!existing || priority > existing.priority) {
        map.set(keyword, { slug: article.slug, href, priority });
      }
    }
  }

  return map;
}

/**
 * Scans rendered HTML and wraps the first MAX_LINKS keyword occurrences
 * with internal anchor tags. Never modifies text inside existing <a> tags.
 */
export function autoLinkArticle(
  html: string,
  currentSlug: string,
  currentCategory: string,
  articles: Article[],
): string {
  const keywordMap = buildKeywordMap(currentSlug, currentCategory, articles);

  // Longer keywords first to avoid partial matches (e.g. "machine learning" before "learning")
  const sorted = [...keywordMap.entries()].sort((a, b) => {
    if (b[0].length !== a[0].length) return b[0].length - a[0].length;
    return b[1].priority - a[1].priority;
  });

  let linksAdded = 0;
  const usedSlugs = new Set<string>();

  // Split preserving HTML tags as delimiters
  const segments = html.split(/(<[^>]*>)/g);
  let insideAnchor = 0;

  return segments
    .map((seg) => {
      // Tag segment — track anchor depth, pass through unchanged
      if (seg.startsWith("<")) {
        if (/^<a[\s>]/i.test(seg)) insideAnchor++;
        if (/^<\/a>/i.test(seg)) insideAnchor = Math.max(0, insideAnchor - 1);
        return seg;
      }

      // Text segment inside an anchor or budget exhausted — skip
      if (insideAnchor > 0 || linksAdded >= MAX_LINKS || !seg.trim()) {
        return seg;
      }

      let text = seg;

      for (const [keyword, entry] of sorted) {
        if (linksAdded >= MAX_LINKS) break;
        if (usedSlugs.has(entry.slug)) continue;

        // Word boundary that handles Spanish accented characters
        const esc = escapeRegex(keyword);
        const re = new RegExp(
          `(?<![a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9])(${esc})(?![a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9])`,
          "i",
        );

        if (re.test(text)) {
          text = text.replace(
            re,
            `<a href="${entry.href}" class="internal-link">$1</a>`,
          );
          usedSlugs.add(entry.slug);
          linksAdded++;
        }
      }

      return text;
    })
    .join("");
}
