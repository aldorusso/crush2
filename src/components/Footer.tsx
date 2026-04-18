import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { AdSlot } from "~/components/AdSlot";

const CATEGORIES = [
  { href: "/tecnologia/", label: "Tecnología" },
  { href: "/estilo-de-vida/", label: "Estilo de vida" },
  { href: "/ciencia/", label: "Ciencia" },
  { href: "/viajes/", label: "Viajes" },
  { href: "/cultura/", label: "Cultura" },
];

const LEGAL = [
  { href: "/legal/sobre-nosotros/", label: "Sobre nosotros" },
  { href: "/legal/privacidad/", label: "Privacidad" },
  { href: "/legal/cookies/", label: "Cookies" },
  { href: "/legal/etica/", label: "Ética editorial" },
  { href: "/legal/correcciones/", label: "Correcciones" },
  { href: "/legal/contacto/", label: "Contacto" },
];

export const Footer = component$(() => {
  const year = new Date().getFullYear();

  return (
    <footer class="mt-16 border-t border-[var(--border)] bg-[var(--surface-2)]">
      {/* Footer ad — lazy, full-width */}
      <div class="border-b border-[var(--border)] py-3">
        <div class="mx-auto max-w-7xl px-4">
          <AdSlot slotId="footer" lazy />
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-10">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div class="col-span-2 md:col-span-1">
            <Link href="/" class="font-display font-800 text-lg text-[var(--color-brand)]">
              crush<span class="text-[var(--text)]">.news</span>
            </Link>
            <p class="mt-2 text-sm text-[var(--text-muted)]">
              Tecnología, ciencia, cultura y estilo de vida en español.
            </p>
          </div>

          <div>
            <p class="mb-3 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Secciones
            </p>
            <ul class="space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    class="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p class="mb-3 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Legal
            </p>
            <ul class="space-y-2">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    class="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p class="mb-3 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Feed
            </p>
            <ul class="space-y-2">
              <li>
                <a
                  href="/rss.xml"
                  class="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                >
                  RSS global
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  class="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--text-muted)]">
          © {year} crush.news — Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
});
