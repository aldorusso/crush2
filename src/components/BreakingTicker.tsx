import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Article } from "~/lib/types";

interface Props {
  articles: Article[];
  /** Milliseconds between rotations. Default 5s. */
  interval?: number;
}

export const BreakingTicker = component$<Props>(({ articles, interval = 5000 }) => {
  const idx = useSignal(0);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (articles.length <= 1) return;
    const timer = setInterval(() => {
      idx.value = (idx.value + 1) % articles.length;
    }, interval);
    cleanup(() => clearInterval(timer));
  });

  const current = articles[idx.value];
  if (!current) return null;
  const href = `/${current.category}/${current.subcategory}/${current.slug}/`;

  return (
    <div class="bg-black text-white">
      <div class="mx-auto flex max-w-7xl items-center gap-3 overflow-hidden px-4 py-2 text-xs sm:gap-4 sm:text-sm">
        <span class="inline-flex shrink-0 items-center gap-1.5 rounded bg-[var(--color-brand)] px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white uppercase sm:text-[11px]">
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
          Noticia destacada
        </span>
        {/* Keying on slug restarts the CSS enter animation on every rotation */}
        <Link
          key={current.slug}
          href={href}
          aria-live="polite"
          class="ticker-headline min-w-0 truncate font-medium transition-opacity hover:opacity-80"
        >
          {current.title}
        </Link>
      </div>
    </div>
  );
});
