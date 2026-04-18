import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import {
  getArticleByPath,
  getAuthorBySlug,
  getRelatedArticles,
  getCategoryBySlug,
  getContentIndex,
} from "~/lib/content";
import { autoLinkArticle } from "~/lib/autolink";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { AuthorBox } from "~/components/AuthorBox";
import { RelatedArticles } from "~/components/RelatedArticles";
import { SmartImage } from "~/components/SmartImage";
import { AdSlot } from "~/components/AdSlot";
import { buildArticleSchema, buildBreadcrumbSchema, schemaToScript } from "~/lib/jsonld";
import { buildOgArticle, buildTwitterCard, buildHreflang, buildRobotsMeta } from "~/lib/seo";
import { injectAdsIntoArticle } from "~/lib/ads";
import { ReadingProgress } from "~/components/ReadingProgress";
import { ArticleDateTime } from "~/components/ArticleDateTime";

const SITE_URL = "https://crush.news";

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
  const { articles } = getContentIndex();
  const linkedBody = autoLinkArticle(article.body, article.slug, article.category, articles);

  return { article: { ...article, body: linkedBody }, author, related, category, subcategory };
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

  const updateDate = new Date(article.updatedAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Show correction notice if article was meaningfully updated (>24h after publish)
  const wasUpdated =
    new Date(article.updatedAt).getTime() - new Date(article.publishedAt).getTime() >
    24 * 60 * 60 * 1000;

  return (
    <div class="mx-auto max-w-7xl px-4 py-8">
      <ReadingProgress />
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
            <ArticleDateTime iso={article.publishedAt} class="text-sm text-[var(--text-muted)]" />
            <span class="text-sm text-[var(--text-muted)]">
              {article.readingTime} min de lectura
            </span>
          </div>
        </header>

        {wasUpdated && (
          <div class="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm dark:border-amber-800 dark:bg-amber-950">
            <strong class="font-semibold text-amber-800 dark:text-amber-200">Actualización:</strong>{" "}
            <span class="text-amber-700 dark:text-amber-300">
              Este artículo fue actualizado el {updateDate}. Consulta nuestra{" "}
              <a href="/legal/correcciones/" class="underline underline-offset-2">
                política de correcciones
              </a>
              .
            </span>
          </div>
        )}

        <figure class="mb-8">
          <SmartImage
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            width={article.heroImage.width}
            height={article.heroImage.height}
            loading="eager"
            fetchPriority="high"
            class="w-full rounded-xl object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
          />
          {article.heroImage.credit && (
            <figcaption class="mt-1.5 text-xs text-[var(--text-muted)]">
              Imagen: {article.heroImage.credit}
            </figcaption>
          )}
        </figure>

        <div class="ad-slot my-8">
          <AdSlot slotId="header-leaderboard" />
        </div>

        {injectAdsIntoArticle(article.body).map((seg, i) =>
          seg.kind === "html" ? (
            <div key={i} class="prose" dangerouslySetInnerHTML={seg.content} />
          ) : (
            <div key={i} class="ad-slot-in-article my-8">
              <AdSlot slotId={`in-article-${seg.position}`} lazy />
            </div>
          ),
        )}

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
  const { article, author, category, subcategory } = data;
  const path = `/${article.category}/${article.subcategory}/${article.slug}/`;

  const articleSchema = buildArticleSchema(article, author ?? undefined);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Inicio", href: "/" },
    { label: category?.name ?? article.category, href: `/${article.category}/` },
    {
      label: subcategory?.name ?? article.subcategory,
      href: `/${article.category}/${article.subcategory}/`,
    },
    { label: article.title },
  ]);

  const absoluteUrl = `${SITE_URL}${path}`;
  const imageAlt = article.heroImage.alt || article.title;

  return {
    title: `${article.title} — crush.news`,
    meta: [
      { name: "description", content: article.description },
      ...buildRobotsMeta(),
      ...buildOgArticle({
        title: article.title,
        description: article.description,
        image: article.heroImage.src,
        imageAlt,
        url: absoluteUrl,
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt,
        author: author?.name ?? article.author,
        section: article.category,
        tags: article.tags,
      }),
      ...buildTwitterCard({
        title: article.title,
        description: article.description,
        image: article.heroImage.src,
        imageAlt,
        url: absoluteUrl,
      }),
    ],
    links: [
      ...buildHreflang(path),
      {
        rel: "preload",
        as: "image",
        href: article.heroImage.src,
        fetchpriority: "high",
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: `crush.news — ${category?.name ?? article.category}`,
        href: `/rss/${article.category}.xml`,
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "crush.news",
        href: "/rss.xml",
      },
    ],
    scripts: [schemaToScript(articleSchema), schemaToScript(breadcrumbSchema)],
  };
};
