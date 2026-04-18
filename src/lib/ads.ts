export type AdPosition = 1 | 2 | 3;

export type ArticleSegment =
  | { kind: "html"; content: string }
  | { kind: "ad"; position: AdPosition };

export interface SlotConfig {
  minHeight: number;
  label: string;
}

export const SLOT_CONFIG: Record<string, SlotConfig> = {
  "anchor-bottom": { minHeight: 100, label: "Anuncio — 320×100" },
  "header-leaderboard": { minHeight: 90, label: "Anuncio — 728×90" },
  "in-article-1": { minHeight: 280, label: "Anuncio — 336×280" },
  "in-article-2": { minHeight: 280, label: "Anuncio — 336×280" },
  "in-article-3": { minHeight: 280, label: "Anuncio — 336×280" },
  "sidebar-sticky": { minHeight: 600, label: "Anuncio — 300×600" },
  "multiplex-related": { minHeight: 280, label: "Anuncio — responsive" },
  footer: { minHeight: 90, label: "Anuncio — 970×90" },
};

const AD_AFTER_PARAGRAPH = [2, 5, 8] as const;

export function injectAdsIntoArticle(html: string): ArticleSegment[] {
  const parts = html.split("</p>");
  const paras = parts.slice(0, -1).map((p) => p + "</p>");
  const tail = parts[parts.length - 1] ?? "";

  const result: ArticleSegment[] = [];
  let buffer = "";
  let pCount = 0;
  let adCount = 0;

  for (const chunk of paras) {
    buffer += chunk;
    if (/^\s*<p[\s>]/i.test(chunk)) {
      pCount++;
      const triggerAt = AD_AFTER_PARAGRAPH[adCount];
      if (adCount < 3 && triggerAt !== undefined && pCount === triggerAt) {
        result.push({ kind: "html", content: buffer });
        buffer = "";
        result.push({ kind: "ad", position: (adCount + 1) as AdPosition });
        adCount++;
      }
    }
  }

  const finalBuffer = buffer + tail;
  if (finalBuffer.trim()) result.push({ kind: "html", content: finalBuffer });

  return result;
}
