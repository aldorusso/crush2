export type AdPosition = 1 | 2 | 3;

export type ArticleSegment =
  | { kind: "html"; content: string }
  | { kind: "ad"; position: AdPosition };

export interface SlotConfig {
  minHeight: number;
  adSlot: string;
  adFormat: string;
  adLayout?: string;
  adLayoutKey?: string;
  fullWidthResponsive?: boolean;
}

export const SLOT_CONFIG: Record<string, SlotConfig> = {
  "anchor-bottom": {
    minHeight: 100,
    adSlot: "3778440909",
    adFormat: "auto",
    fullWidthResponsive: true,
  },
  "header-leaderboard": {
    minHeight: 90,
    adSlot: "8120655375",
    adFormat: "auto",
    fullWidthResponsive: true,
  },
  "in-article-1": {
    minHeight: 280,
    adSlot: "4203082356",
    adFormat: "fluid",
    adLayout: "in-article",
  },
  "in-article-2": {
    minHeight: 280,
    adSlot: "6561636473",
    adFormat: "fluid",
    adLayout: "in-article",
  },
  "in-article-3": {
    minHeight: 280,
    adSlot: "3097165888",
    adFormat: "fluid",
    adLayoutKey: "-dv+9k-2z-l9+1dp",
  },
  "sidebar-sticky": {
    minHeight: 600,
    adSlot: "8935043599",
    adFormat: "auto",
    fullWidthResponsive: true,
  },
  "multiplex-related": {
    minHeight: 280,
    adSlot: "3874288601",
    adFormat: "fluid",
    adLayoutKey: "-i5+h-1y-7h+l5",
  },
  footer: {
    minHeight: 90,
    adSlot: "3097165888",
    adFormat: "fluid",
    adLayoutKey: "-dv+9k-2z-l9+1dp",
  },
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
