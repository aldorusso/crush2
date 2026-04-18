import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import {
  getArticleByPath,
  getAuthorBySlug,
  getRelatedArticles,
  getCategoryBySlug,
} from "~/lib/content";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { AuthorBox } from "~/components/AuthorBox";
import { RelatedArticles } from "~/components/RelatedArticles";

export const useArticleData = routeLoader$(({ params, status }) => {
  const article = getArticleByPath(
    params["category"] ?? "",
    params["subcategory"] ?? "",
    params["slug"] ?? "",
  );
  if (!article) {
    status(404);
    return null;
  }

  const author = getAuthorBySlug(article.author);
  const related = getRelatedArticles(article, 6);
  const category = getCategoryBySlug(article.category);
  const subcategory = category?.subcategories.find((s) => s.slug === article.subcategory);

  return { article, author, related, category, subcategory };
});

export default component$(() => {
  const data = useArticleData();
  if (!data.value) {
    return (
      <div class="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 class="font-display font-800 text-4xl">Artículo no encontrado</h1>
        <a href="/" class="mt-4 inline-block text-[var(--color-brand)] hover:underline">
          ← Volver al inicio
        </a>
      </div>
    );
  }

  const { article, author, related, category, subcategory } = data.value;

  const publishDate = new Date(article.publishedAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div class="mx-auto max-w-7xl px-4 py-8">
      <div class="mx-auto max-w-3xl">
        <Breadcrumbs
          crumbs={[
            { label: "Inicio", href: "/" },
            {
              label: category?.name ?? article.category,
              href: `/${article.category}/`,
            },
            {
              label: subcategory?.name ?? article.subcategory,
              href: `/${article.category}/${article.subcategory}/`,
            },
            { label: article.title },
          ]}
        />

        <header class="mb-8">
          <a
            href={`/${article.category}/${article.subcategory}/`}
            class="text-xs font-semibold tracking-wide text-[var(--color-brand)] uppercase hover:underline"
          >
            {subcategory?.name ?? article.subcategory}
          </a>
          <h1 class="font-display font-800 mt-2 text-3xl leading-tight sm:text-4xl">
            {article.title}
          </h1>
          <p class="mt-3 text-lg text-[var(--text-muted)]">{article.description}</p>

          <div class="mt-4 flex flex-wrap items-center gap-4">
            {author && (
              <div class="flex items-center gap-2">
                <img
                  src={author.avatar}
                  alt={author.name}
                  width={32}
                  height={32}
                  loading="eager"
                  decoding="async"
                  class="h-8 w-8 rounded-full object-cover"
                />
                <a
                  href={`/autor/${author.slug}/`}
                  class="text-sm font-medium transition-colors hover:text-[var(--color-brand)]"
                >
                  {author.name}
                </a>
              </div>
            )}
            <span class="text-sm text-[var(--text-muted)]">{publishDate}</span>
            <span class="text-sm text-[var(--text-muted)]">
              {article.readingTime} min de lectura
            </span>
          </div>
        </header>

        <figure class="mb-8">
          <img
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            width={article.heroImage.width}
            height={article.heroImage.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            class="w-full rounded-xl object-cover"
          />
          {article.heroImage.credit && (
            <figcaption class="mt-1.5 text-xs text-[var(--text-muted)]">
              Imagen: {article.heroImage.credit}
            </figcaption>
          )}
        </figure>

        <div class="prose" dangerouslySetInnerHTML={article.body} />

        {article.tags.length > 0 && (
          <div class="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <a
                key={tag}
                href={`/tag/${tag}/`}
                class="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-3)] hover:text-[var(--text)]"
              >
                #{tag}
              </a>
            ))}
          </div>
        )}

        {author && <AuthorBox author={author} />}
      </div>

      <div class="mx-auto max-w-7xl">
        <RelatedArticles articles={related} />
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useArticleData);
  if (!data) return { title: "Artículo no encontrado — crush.news" };
  const { article } = data;
  return {
    title: `${article.title} — crush.news`,
    meta: [
      { name: "description", content: article.description },
      { property: "og:type", content: "article" },
      { property: "og:title", content: article.title },
      { property: "og:description", content: article.description },
      { property: "og:image", content: article.heroImage.src },
      {
        name: "robots",
        content: "max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
    ],
  };
};
