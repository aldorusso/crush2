import { component$ } from "@builder.io/qwik";
import type { Article } from "~/lib/types";
import { ArticleCard } from "./ArticleCard";

interface Props {
  articles: Article[];
}

export const RelatedArticles = component$<Props>(({ articles }) => {
  if (articles.length === 0) return null;

  return (
    <section class="mt-12" aria-labelledby="related-heading">
      <h2 id="related-heading" class="font-display font-700 mb-6 text-xl">
        También te puede interesar
      </h2>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
});
