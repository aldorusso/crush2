import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getArticlesByTag } from "~/lib/content";
import { ArticleCard } from "~/components/ArticleCard";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const useTagData = routeLoader$(({ params, status }) => {
  const tag = params["tag"] ?? "";
  const articles = getArticlesByTag(tag);
  if (articles.length === 0) status(404);
  return { tag, articles };
});

export default component$(() => {
  const data = useTagData();
  const { tag, articles } = data.value;

  return (
    <div class="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs crumbs={[{ label: "Inicio", href: "/" }, { label: `#${tag}` }]} />

      <header class="mb-8">
        <h1 class="font-display font-800 text-3xl">#{tag}</h1>
        <p class="mt-1 text-[var(--text-muted)]">
          {articles.length} artículo{articles.length !== 1 ? "s" : ""}
        </p>
      </header>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>

      {articles.length === 0 && (
        <p class="text-[var(--text-muted)]">No hay artículos con este tag.</p>
      )}
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useTagData);
  return {
    title: `#${data.tag} — crush.news`,
    meta: [
      {
        name: "description",
        content: `Artículos sobre ${data.tag} en crush.news.`,
      },
    ],
  };
};
