import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getContentIndex, getFeaturedArticles, getArticlesByCategory } from "~/lib/content";
import { ArticleCard } from "~/components/ArticleCard";
import type { Article } from "~/lib/types";

export const useHomeData = routeLoader$(() => {
  const featured = getFeaturedArticles(5);
  const allArticles = getContentIndex().articles;
  const recent = allArticles.slice(0, 6);

  const cats = ["tecnologia", "ciencia", "estilo-de-vida", "viajes", "cultura"];
  const byCategory: Record<string, Article[]> = {};
  for (const cat of cats) {
    byCategory[cat] = getArticlesByCategory(cat).slice(0, 4);
  }

  return { featured, recent, byCategory };
});

const CAT_LABELS: Record<string, string> = {
  tecnologia: "Tecnología",
  ciencia: "Ciencia",
  "estilo-de-vida": "Estilo de vida",
  viajes: "Viajes",
  cultura: "Cultura",
};

export default component$(() => {
  const data = useHomeData();
  const { featured, byCategory } = data.value;
  const [hero, ...featuredRest] = featured;

  return (
    <div class="mx-auto max-w-7xl px-4 py-8">
      {/* ── Hero / Portada ──────────────────────────────────────────────── */}
      {hero && (
        <section aria-labelledby="featured-heading" class="mb-14">
          {/* Editorial section label */}
          <div class="mb-4 flex items-center gap-4">
            <h2 id="featured-heading" class="section-heading-label shrink-0">
              Portada
            </h2>
            <div class="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
          </div>

          <div class="grid gap-6 lg:grid-cols-3">
            {/* Hero card — full overlay */}
            <div class="lg:col-span-2">
              <ArticleCard article={hero} variant="featured" loading="eager" />
            </div>

            {/* Numbered sidebar */}
            <div class="flex flex-col divide-y divide-[var(--border)]">
              {featuredRest.slice(0, 3).map((a, i) => (
                <div key={a.slug} class="py-4 first:pt-0 last:pb-0">
                  <ArticleCard article={a} variant="horizontal" rank={i + 1} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Category sections ──────────────────────────────────────────── */}
      {Object.entries(byCategory).map(([slug, articles]) =>
        articles.length === 0 ? null : (
          <section key={slug} aria-labelledby={`cat-${slug}`} class="mb-14">
            {/* Editorial section heading with rule */}
            <div class="mb-6 flex items-center gap-4">
              <h2 id={`cat-${slug}`} class="section-heading-label shrink-0">
                {CAT_LABELS[slug] ?? slug}
              </h2>
              <div class="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
              <a
                href={`/${slug}/`}
                class="shrink-0 text-[11px] font-semibold tracking-[0.1em] text-[var(--text-muted)] uppercase transition-colors hover:text-[var(--color-brand-text)]"
              >
                Ver todo →
              </a>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        ),
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "crush.news — Tecnología, ciencia, cultura y estilo de vida",
  meta: [
    {
      name: "description",
      content:
        "Divulgación en español sobre tecnología, ciencia, cultura, viajes y estilo de vida. Artículos claros, rigurosos y atemporales.",
    },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "crush.news" },
    {
      property: "og:description",
      content:
        "Divulgación en español sobre tecnología, ciencia, cultura, viajes y estilo de vida.",
    },
  ],
};
