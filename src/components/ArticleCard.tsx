import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Article } from "~/lib/types";
import { SmartImage } from "~/components/SmartImage";

interface Props {
  article: Article;
  variant?: "vertical" | "horizontal" | "featured" | "text-only";
  loading?: "lazy" | "eager";
  rank?: number;
}

export const ArticleCard = component$<Props>(
  ({ article, variant = "vertical", loading = "lazy", rank }) => {
    const href = `/${article.category}/${article.subcategory}/${article.slug}/`;

    // ── Featured: full-bleed image with gradient overlay ──────────────────
    if (variant === "featured") {
      return (
        <article class="group relative aspect-video overflow-hidden rounded-xl">
          <Link href={href} class="absolute inset-0 block" tabIndex={-1} aria-hidden="true">
            <SmartImage
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              width={article.heroImage.width}
              height={article.heroImage.height}
              loading={loading}
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
          </Link>
          {/* gradient */}
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
            aria-hidden="true"
          />
          {/* text */}
          <div class="absolute right-0 bottom-0 left-0 p-5 md:p-7">
            <CategoryBadge category={article.category} subcategory={article.subcategory} light />
            <h2 class="font-display font-800 mt-2 text-xl leading-tight text-white md:text-3xl lg:text-4xl">
              <Link href={href} class="transition-opacity hover:opacity-90">
                {article.title}
              </Link>
            </h2>
            <p class="mt-2 line-clamp-2 text-sm text-white/75 md:text-base">
              {article.description}
            </p>
            <ArticleMeta article={article} light />
          </div>
        </article>
      );
    }

    // ── Text-only: kicker + headline + meta, no image. Used in the
    //    "Lo último" hero column for density above the fold.
    if (variant === "text-only") {
      return (
        <article class="group">
          <CategoryBadge category={article.category} subcategory={article.subcategory} />
          <h3 class="font-display font-700 mt-1 text-[15px] leading-snug">
            <Link
              href={href}
              class="line-clamp-3 transition-colors hover:text-[var(--color-brand-text)]"
            >
              {article.title}
            </Link>
          </h3>
          <ArticleMeta article={article} compact />
        </article>
      );
    }

    // ── Horizontal: numbered sidebar item ────────────────────────────────
    if (variant === "horizontal") {
      return (
        <article class="group flex items-start gap-3">
          {rank !== undefined && (
            <span
              class="font-display font-800 w-7 shrink-0 pt-0.5 text-right text-xl leading-none text-[var(--border)] tabular-nums select-none"
              aria-hidden="true"
            >
              {String(rank).padStart(2, "0")}
            </span>
          )}
          <Link href={href} class="shrink-0" tabIndex={-1} aria-hidden="true">
            <SmartImage
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              width={112}
              height={75}
              loading={loading}
              class="h-[75px] w-[112px] rounded-md object-cover transition-opacity group-hover:opacity-85"
              sizes="112px"
            />
          </Link>
          <div class="min-w-0">
            <CategoryBadge category={article.category} subcategory={article.subcategory} />
            <h3 class="font-display font-600 mt-1 text-sm leading-snug">
              <Link
                href={href}
                class="line-clamp-2 transition-colors hover:text-[var(--color-brand-text)]"
              >
                {article.title}
              </Link>
            </h3>
            <ArticleMeta article={article} compact />
          </div>
        </article>
      );
    }

    // ── Vertical: bare image + typography, no card background ────────────
    return (
      <article class="group flex flex-col">
        <Link href={href} tabIndex={-1} aria-hidden="true" class="block overflow-hidden rounded-lg">
          <SmartImage
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            width={article.heroImage.width}
            height={article.heroImage.height}
            loading={loading}
            class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          />
        </Link>
        <div class="flex flex-1 flex-col pt-3">
          <CategoryBadge category={article.category} subcategory={article.subcategory} />
          <h3 class="font-display font-700 mt-1.5 text-base leading-snug">
            <Link
              href={href}
              class="line-clamp-2 transition-colors hover:text-[var(--color-brand-text)]"
            >
              {article.title}
            </Link>
          </h3>
          <p class="mt-1.5 line-clamp-2 flex-1 text-sm text-[var(--text-muted)]">
            {article.description}
          </p>
          <ArticleMeta article={article} />
        </div>
      </article>
    );
  },
);

// ── Sub-components ───────────────────────────────────────────────────────────

const CategoryBadge = component$<{
  category: string;
  subcategory: string;
  light?: boolean;
}>(({ category, subcategory, light }) => (
  <Link
    href={`/${category}/${subcategory}/`}
    class={[
      "inline-block text-xs font-semibold tracking-wide uppercase transition-colors",
      light
        ? "rounded-sm bg-[var(--color-brand)] px-2 py-0.5 text-white hover:bg-[var(--color-brand-dark)]"
        : "text-[var(--color-brand-text)] hover:underline",
    ].join(" ")}
  >
    {subcategory.replace(/-/g, " ")}
  </Link>
));

const ArticleMeta = component$<{ article: Article; compact?: boolean; light?: boolean }>(
  ({ article, compact, light }) => {
    const date = new Date(article.publishedAt).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <div
        class={[
          "flex items-center gap-2 text-xs",
          compact ? "mt-1" : "mt-3",
          light ? "text-white/65" : "text-[var(--text-muted)]",
        ].join(" ")}
      >
        <span>{date}</span>
        <span aria-hidden="true">·</span>
        <span>{article.readingTime} min</span>
      </div>
    );
  },
);
