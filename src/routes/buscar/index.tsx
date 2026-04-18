import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getContentIndex } from "~/lib/content";
import { ArticleCard } from "~/components/ArticleCard";
import type { Article } from "~/lib/types";

export const useSearchIndex = routeLoader$(() => {
  return getContentIndex().articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    category: a.category,
    subcategory: a.subcategory,
    tags: a.tags,
    author: a.author,
    publishedAt: a.publishedAt,
    heroImage: a.heroImage,
    readingTime: a.readingTime,
    featured: a.featured,
    breaking: a.breaking,
    updatedAt: a.updatedAt,
    body: "",
    filePath: "",
  })) as Article[];
});

export default component$(() => {
  const index = useSearchIndex();
  const query = useSignal("");

  const results = useComputed$(() => {
    const q = query.value.toLowerCase().trim();
    if (q.length < 2) return [];
    return index.value.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q)),
    );
  });

  return (
    <div class="mx-auto max-w-3xl px-4 py-8">
      <h1 class="font-display font-800 mb-6 text-3xl">Buscar</h1>

      <div class="relative mb-8">
        <label for="search-input" class="sr-only">
          Buscar artículos
        </label>
        <input
          id="search-input"
          type="search"
          placeholder="¿Qué quieres leer?"
          class="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 pr-10 text-base outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20"
          value={query.value}
          onInput$={(e) => {
            query.value = (e.target as HTMLInputElement).value;
          }}
          aria-label="Buscar artículos"
          autocomplete="off"
        />
      </div>

      {query.value.length >= 2 && (
        <p class="mb-4 text-sm text-[var(--text-muted)]">
          {results.value.length} resultado
          {results.value.length !== 1 ? "s" : ""} para «{query.value}»
        </p>
      )}

      {results.value.length > 0 && (
        <div class="grid gap-6 sm:grid-cols-2">
          {results.value.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}

      {query.value.length >= 2 && results.value.length === 0 && (
        <p class="text-[var(--text-muted)]">No se encontraron artículos para «{query.value}».</p>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Buscar — crush.news",
  meta: [{ name: "robots", content: "noindex" }],
};
