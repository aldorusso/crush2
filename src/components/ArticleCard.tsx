import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Article } from "~/lib/types";
import { SmartImage } from "~/components/SmartImage";

interface Props {
  article: Article;
  variant?: "vertical" | "horizontal" | "featured";
  loading?: "lazy" | "eager";
}

export const ArticleCard = component$<Props>(
  ({ article, variant = "vertical", loading = "lazy" }) => {
    const href = `/${article.category}/${article.subcategory}/${article.slug}/`;

    if (variant === "featured") {
      return (
        <article class="group relative overflow-hidden rounded-xl bg-[var(--surface-2)]">
          <Link href={href} class="block" tabIndex={-1} aria-hidden="true">
            <SmartImage
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              width={article.heroImage.width}
              height={article.heroImage.height}
              loading={loading}
              class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
          </Link>
          <div class="p-5">
            <CategoryBadge category={article.category} subcategory={article.subcategory} />
            <h2 class="font-display font-700 mt-2 text-xl leading-tight">
              <Link href={href} class="transition-colors hover:text-[var(--color-brand)]">
                {article.title}
              </Link>
            </h2>
            <p class="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">{article.description}</p>
            <ArticleMeta article={article} />
          </div>
        </article>
      );
    }

    if (variant === "horizontal") {
      return (
        <article class="group flex gap-4">
          <Link href={href} class="shrink-0" tabIndex={-1} aria-hidden="true">
            <SmartImage
              src={article.heroImage.src}
              alt={article.heroImage.alt}
              width={160}
              height={90}
              loading={loading}
              class="h-[90px] w-[160px] rounded-lg object-cover transition-opacity group-hover:opacity-90"
              sizes="160px"
            />
          </Link>
          <div class="min-w-0">
            <CategoryBadge category={article.category} subcategory={article.subcategory} />
            <h3 class="font-display font-600 mt-1 text-sm leading-snug">
              <Link
                href={href}
                class="line-clamp-2 transition-colors hover:text-[var(--color-brand)]"
              >
                {article.title}
              </Link>
            </h3>
            <ArticleMeta article={article} compact />
          </div>
        </article>
      );
    }

    return (
      <article class="group flex flex-col overflow-hidden rounded-xl bg-[var(--surface-2)]">
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <SmartImage
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            width={article.heroImage.width}
            height={article.heroImage.height}
            loading={loading}
            class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          />
        </Link>
        <div class="flex flex-1 flex-col p-4">
          <CategoryBadge category={article.category} subcategory={article.subcategory} />
          <h3 class="font-display font-700 mt-2 text-base leading-snug">
            <Link
              href={href}
              class="line-clamp-2 transition-colors hover:text-[var(--color-brand)]"
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

const CategoryBadge = component$<{ category: string; subcategory: string }>(
  ({ category, subcategory }) => (
    <Link
      href={`/${category}/${subcategory}/`}
      class="inline-block text-xs font-semibold tracking-wide text-[var(--color-brand)] uppercase hover:underline"
    >
      {subcategory.replace(/-/g, " ")}
    </Link>
  ),
);

const ArticleMeta = component$<{ article: Article; compact?: boolean }>(({ article, compact }) => {
  const date = new Date(article.publishedAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      class={[
        "flex items-center gap-2 text-xs text-[var(--text-muted)]",
        compact ? "mt-1" : "mt-3",
      ].join(" ")}
    >
      <span>{date}</span>
      <span aria-hidden="true">·</span>
      <span>{article.readingTime} min</span>
    </div>
  );
});
