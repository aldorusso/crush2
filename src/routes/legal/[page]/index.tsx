import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { loadSitePage } from "~/lib/site";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { buildBreadcrumbSchema, schemaToScript } from "~/lib/jsonld";
import { buildOgPage, buildHreflang, buildRobotsMeta } from "~/lib/seo";

export const usePageData = routeLoader$(({ params, status }) => {
  const page = loadSitePage(params["page"] ?? "");
  if (!page) {
    status(404);
    return null;
  }
  return page;
});

export default component$(() => {
  const data = usePageData();

  if (!data.value) {
    return (
      <div class="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 class="font-display font-800 text-4xl">Página no encontrada</h1>
        <a href="/" class="mt-4 inline-block text-[var(--color-brand)] hover:underline">
          ← Volver al inicio
        </a>
      </div>
    );
  }

  const { title, body } = data.value;

  return (
    <div class="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Legal", href: "/legal/" },
          { label: title },
        ]}
      />
      <h1 class="font-display font-800 mt-4 mb-8 text-3xl leading-tight sm:text-4xl">{title}</h1>
      <div class="prose" dangerouslySetInnerHTML={body} />
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(usePageData);
  if (!data) return { title: "Página no encontrada — crush.news" };

  const path = `/legal/${data.slug}/`;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Inicio", href: "/" },
    { label: "Legal", href: "/legal/" },
    { label: data.title },
  ]);

  return {
    title: `${data.title} — crush.news`,
    meta: [
      { name: "description", content: data.description },
      ...buildRobotsMeta(),
      ...buildOgPage({ title: data.title, description: data.description }),
    ],
    links: buildHreflang(path),
    scripts: [schemaToScript(breadcrumbSchema)],
  };
};
