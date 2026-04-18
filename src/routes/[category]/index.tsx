import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getCategoryBySlug, getArticlesByCategory } from "~/lib/content";
import { ArticleCard } from "~/components/ArticleCard";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const useCategoryData = routeLoader$(({ params, status }) => {
  const slug = params["category"] ?? "";
  const category = getCategoryBySlug(slug);
  if (!category) {
    status(404);
    return null;
  }
  const articles = getArticlesByCategory(slug);
  return { category, articles };
});

export default component$(() => {
  const data = useCategoryData();
  if (!data.value) return <p>Categoría no encontrada.</p>;

  const { category, articles } = data.value;

  return (
    <div class="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs crumbs={[{ label: "Inicio", href: "/" }, { label: category.name }]} />

      <header class="mb-8">
        <h1 class="font-display font-800 text-4xl">{category.name}</h1>
        <p class="mt-2 text-lg text-[var(--text-muted)]">{category.description}</p>
      </header>

      {category.subcategories.length > 0 && (
        <nav aria-label="Subcategorías" class="mb-8 flex flex-wrap gap-2">
          {category.subcategories.map((sub) => (
            <a
              key={sub.slug}
              href={`/${category.slug}/${sub.slug}/`}
              class="rounded-full border border-[var(--border)] px-4 py-1.5 text-sm font-medium transition-colors hover:bg-[var(--surface-3)]"
            >
              {sub.name}
            </a>
          ))}
        </nav>
      )}

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <ArticleCard key={a.slug} article={a} loading={i < 6 ? "eager" : "lazy"} />
        ))}
      </div>

      {articles.length === 0 && (
        <p class="text-[var(--text-muted)]">No hay artículos en esta categoría todavía.</p>
      )}
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useCategoryData);
  if (!data) return { title: "Categoría no encontrada — crush.news" };
  return {
    title: `${data.category.name} — crush.news`,
    meta: [{ name: "description", content: data.category.description }],
  };
};
