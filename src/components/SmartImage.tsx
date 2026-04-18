import { component$ } from "@builder.io/qwik";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  class?: string;
  sizes?: string;
}

const WIDTHS = [400, 800, 1200, 1600];

function picsumSrcset(base: string, origW: number, origH: number, ext = ""): string {
  const ratio = origH / origW;
  return WIDTHS.filter((w) => w <= origW + 200)
    .map((w) => `${base}${w}/${Math.round(w * ratio)}${ext} ${w}w`)
    .join(", ");
}

export const SmartImage = component$<Props>(
  ({
    src,
    alt,
    width,
    height,
    loading = "lazy",
    fetchPriority,
    class: className,
    sizes = "(min-width: 1024px) 50vw, 100vw",
  }) => {
    const picsumMatch = /^(https:\/\/picsum\.photos\/seed\/[^/]+\/)(\d+)\/(\d+)$/.exec(src);

    if (picsumMatch) {
      const base = picsumMatch[1] ?? "";
      const origW = parseInt(picsumMatch[2] ?? "1200");
      const origH = parseInt(picsumMatch[3] ?? "675");
      const webpSrcset = picsumSrcset(base, origW, origH, ".webp");
      const jpegSrcset = picsumSrcset(base, origW, origH);

      return (
        <picture>
          <source type="image/webp" srcset={webpSrcset} sizes={sizes} />
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
            srcset={jpegSrcset}
            sizes={sizes}
            class={className}
          />
        </picture>
      );
    }

    // Non-picsum: plain img with width/height for CLS prevention
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        class={className}
      />
    );
  },
);
