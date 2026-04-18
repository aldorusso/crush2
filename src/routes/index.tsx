import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getContentIndex, getFeaturedArticles, getArticlesByCategory } from "~/lib/content";
import { ArticleCard } from "~/components/ArticleCard";
import type { Article } from "~/lib/types";

export const useHomeData = routeLoader$(() => {
  const featured = getFeaturedArticles(1);
  const allArticles = getContentIndex().articles;
  const hero = featured[0];

  // Three-pane hero: one big featured card, a text-only "Lo último" column,
  // and a thumbnail "Destacados" column. Skip the hero slug in both lists so
  // the same story never appears twice.
  const filtered = hero ? allArticles.filter((a) => a.slug !== hero.slug) : allArticles;
  const latest = filtered.slice(0, 5);
  const picks = filtered.slice(5, 9);

  const cats = ["tecnologia", "ciencia", "estilo-de-vida", "viajes", "cultura"];
  const byCategory: Record<string, Article[]> = {};
  for (const cat of cats) {
    byCategory[cat] = getArticlesByCategory(cat).slice(0, 4);
  }

  return { hero, latest, picks, byCategory };
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
  const { hero, latest, picks, byCategory } = data.value;

  return (
    <div class="mx-auto max-w-7xl px-4 py-8">
      {/* ── Hero / Portada — three-pane layout ─────────────────────────── */}
      {hero && (
        <section aria-labelledby="featured-heading" class="mb-14">
          <div class="mb-4 flex items-center gap-4">
            <h2 id="featured-heading" class="section-heading-label shrink-0">
              Portada
            </h2>
            <div class="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
          </div>

          <div class="grid gap-6 lg:grid-cols-[2fr_1.25fr_1.25fr]">
            {/* Pane 1 — featured */}
            <ArticleCard article={hero} variant="featured" loading="eager" />

            {/* Pane 2 — Lo último (text-only) */}
            {latest.length > 0 && (
              <div>
                <h3 class="section-heading-label mb-4">Lo último</h3>
                <ul class="divide-y divide-[var(--border)]">
                  {latest.map((a) => (
                    <li key={a.slug} class="py-3 first:pt-0 last:pb-0">
                      <ArticleCard article={a} variant="text-only" />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pane 3 — Destacados (thumbnails) */}
            {picks.length > 0 && (
              <div>
                <h3 class="section-heading-label mb-4">Destacados</h3>
                <ul class="divide-y divide-[var(--border)]">
                  {picks.map((a) => (
                    <li key={a.slug} class="py-3 first:pt-0 last:pb-0">
                      <ArticleCard article={a} variant="horizontal" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
