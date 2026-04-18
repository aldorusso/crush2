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
      {hero && (
        <section aria-labelledby="featured-heading" class="mb-12">
          <h2 id="featured-heading" class="sr-only">
            Artículos destacados
          </h2>
          <div class="grid gap-6 lg:grid-cols-3">
            <div class="lg:col-span-2">
              <ArticleCard article={hero} variant="featured" loading="eager" />
            </div>
            <div class="flex flex-col gap-4">
              {featuredRest.slice(0, 3).map((a) => (
                <ArticleCard key={a.slug} article={a} variant="horizontal" />
              ))}
            </div>
          </div>
        </section>
      )}

      {Object.entries(byCategory).map(([slug, articles]) =>
        articles.length === 0 ? null : (
          <section key={slug} aria-labelledby={`cat-${slug}`} class="mb-12">
            <div class="mb-5 flex items-baseline justify-between">
              <h2 id={`cat-${slug}`} class="font-display font-700 text-2xl">
                {CAT_LABELS[slug] ?? slug}
              </h2>
              <a
                href={`/${slug}/`}
                class="text-sm font-medium text-[var(--color-brand)] hover:underline"
              >
                Ver todo →
              </a>
            </div>
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
