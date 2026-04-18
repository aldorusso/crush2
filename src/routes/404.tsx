import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => (
  <div class="mx-auto max-w-xl px-4 py-24 text-center">
    <p class="font-display font-800 text-8xl text-[var(--color-brand)]">404</p>
    <h1 class="font-display font-700 mt-4 text-2xl">Página no encontrada</h1>
    <p class="mt-2 text-[var(--text-muted)]">Esta URL no existe o el artículo ha sido eliminado.</p>
    <a
      href="/"
      class="mt-6 inline-block rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-dark)]"
    >
      ← Volver al inicio
    </a>
  </div>
));

export const head: DocumentHead = {
  title: "404 — Página no encontrada — crush.news",
  meta: [{ name: "robots", content: "noindex" }],
};
