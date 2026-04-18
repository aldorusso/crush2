import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getCategoryBySlug, getArticlesBySubcategory } from "~/lib/content";
import { ArticleCard } from "~/components/ArticleCard";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const useSubcategoryData = routeLoader$(({ params, status }) => {
  const catSlug = params["category"] ?? "";
  const subSlug = params["subcategory"] ?? "";
  const category = getCategoryBySlug(catSlug);
  if (!category) {
    status(404);
    return null;
  }

  const subcategory = category.subcategories.find((s) => s.slug === subSlug);
  if (!subcategory) {
    status(404);
    return null;
  }

  const articles = getArticlesBySubcategory(catSlug, subSlug);
  return { category, subcategory, articles };
});

export default component$(() => {
  const data = useSubcategoryData();
  if (!data.value) return <p>Subcategoría no encontrada.</p>;

  const { category, subcategory, articles } = data.value;

  return (
    <div class="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: category.name, href: `/${category.slug}/` },
          { label: subcategory.name },
        ]}
      />

      <header class="mb-8">
        <h1 class="font-display font-800 text-4xl">{subcategory.name}</h1>
        <p class="mt-2 text-lg text-[var(--text-muted)]">{subcategory.description}</p>
      </header>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <ArticleCard key={a.slug} article={a} loading={i < 6 ? "eager" : "lazy"} />
        ))}
      </div>

      {articles.length === 0 && <p class="text-[var(--text-muted)]">Sin artículos todavía.</p>}
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useSubcategoryData);
  if (!data) return { title: "No encontrado — crush.news" };
  return {
    title: `${data.subcategory.name} — ${data.category.name} — crush.news`,
    meta: [{ name: "description", content: data.subcategory.description }],
  };
};
