import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthorBySlug, getContentIndex } from "~/lib/content";
import { ArticleCard } from "~/components/ArticleCard";
import { Breadcrumbs } from "~/components/Breadcrumbs";

export const useAuthorData = routeLoader$(({ params, status }) => {
  const author = getAuthorBySlug(params["author"] ?? "");
  if (!author) {
    status(404);
    return null;
  }

  const articles = getContentIndex().articles.filter((a) => a.author === author.slug);
  return { author, articles };
});

export default component$(() => {
  const data = useAuthorData();
  if (!data.value) {
    return (
      <div class="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 class="font-display font-800 text-4xl">Autor no encontrado</h1>
        <a href="/" class="mt-4 inline-block text-[var(--color-brand)] hover:underline">
          ← Inicio
        </a>
      </div>
    );
  }

  const { author, articles } = data.value;

  return (
    <div class="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Autores", href: "/" },
          { label: author.name },
        ]}
      />

      <div class="mx-auto max-w-3xl">
        <header class="mb-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          <img
            src={author.avatar}
            alt={author.name}
            width={96}
            height={96}
            loading="eager"
            decoding="async"
            class="h-24 w-24 shrink-0 rounded-full object-cover"
          />
          <div>
            <h1 class="font-display font-800 text-3xl">{author.name}</h1>
            <p class="mt-1 font-medium text-[var(--color-brand)]">{author.role}</p>
            <p class="mt-3 text-[var(--text-muted)]">{author.bio}</p>
            {author.expertise.length > 0 && (
              <div class="mt-4 flex flex-wrap gap-2">
                {author.expertise.map((e) => (
                  <span
                    key={e}
                    class="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-medium"
                  >
                    {e}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
      </div>

      <section aria-labelledby="author-articles">
        <h2 id="author-articles" class="font-display font-700 mb-6 text-xl">
          Artículos de {author.name} ({articles.length})
        </h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useAuthorData);
  if (!data) return { title: "Autor no encontrado — crush.news" };
  return {
    title: `${data.author.name} — crush.news`,
    meta: [
      {
        name: "description",
        content: `Artículos escritos por ${data.author.name}, ${data.author.role} en crush.news.`,
      },
    ],
  };
};
