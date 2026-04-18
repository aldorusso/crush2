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

      // Collect non-overlapping matches on the ORIGINAL text. Never mutate
      // `seg` during scanning — a previous replacement would inject <a href="…">
      // and the next keyword could match inside that URL, producing nested <a>.
      type Match = { start: number; end: number; entry: KeywordEntry; matched: string };
      const matches: Match[] = [];
      const localSlugs = new Set<string>();

      for (const [keyword, entry] of sorted) {
        if (linksAdded + matches.length >= MAX_LINKS) break;
        if (usedSlugs.has(entry.slug) || localSlugs.has(entry.slug)) continue;

        // Word boundary that handles Spanish accented characters
        const esc = escapeRegex(keyword);
        const re = new RegExp(
          `(?<![a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9])(${esc})(?![a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9])`,
          "i",
        );
        const m = re.exec(seg);
        if (!m) continue;

        const start = m.index;
        const end = start + m[0].length;
        // Reject overlaps with earlier (longer) matches
        if (matches.some((x) => start < x.end && end > x.start)) continue;

        matches.push({ start, end, entry, matched: m[0] });
        localSlugs.add(entry.slug);
      }

      if (matches.length === 0) return seg;

      matches.sort((a, b) => a.start - b.start);
      let out = "";
      let pos = 0;
      for (const m of matches) {
        out += seg.slice(pos, m.start);
        out += `<a href="${m.entry.href}" class="internal-link">${m.matched}</a>`;
        pos = m.end;
        usedSlugs.add(m.entry.slug);
        linksAdded++;
      }
      out += seg.slice(pos);
      return out;
    })
    .join("");
}
