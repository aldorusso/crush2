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

const PILL =
  "rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.1em] uppercase transition-colors hover:text-white";
const PILL_STYLE = "border: 1px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.65)";

export const Footer = component$(() => {
  const year = new Date().getFullYear();

  return (
    <footer class="mt-16">
      {/* Ad slot — light surface, above the dark section */}
      <div class="border-t border-b border-[var(--border)] bg-[var(--surface-2)] py-3">
        <div class="mx-auto max-w-7xl px-4">
          <AdSlot slotId="footer" lazy />
        </div>
      </div>

      {/* Editorial footer — always dark */}
      <div class="bg-[#0f0f0f]" style="color: white">
        <div class="mx-auto max-w-7xl px-4 pt-14 pb-5">
          {/* ── Top row: tagline | pills | legal ────────────────────────── */}
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_2fr_1.5fr]">
            {/* Col 1 — tagline */}
            <div>
              <p
                class="font-display leading-[1.05] text-white"
                style="font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 900"
              >
                Divulgación
                <br />
                en español.
              </p>
              <p class="mt-3 text-sm leading-relaxed" style="color: rgba(255,255,255,0.4)">
                Tecnología, ciencia, cultura,
                <br />
                viajes y estilo de vida.
              </p>
            </div>

            {/* Col 2 — category pills */}
            <div class="flex flex-wrap content-start gap-2">
              {CATEGORIES.map((c) => (
                <Link key={c.href} href={c.href} class={PILL} style={PILL_STYLE}>
                  {c.label}
                </Link>
              ))}
              <a href="/rss.xml" class={PILL} style={PILL_STYLE}>
                RSS
              </a>
            </div>

            {/* Col 3 — legal links */}
            <div class="flex flex-col gap-2.5 lg:items-end">
              {LEGAL.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  class="text-sm transition-colors hover:text-white"
                  style="color: rgba(255,255,255,0.45)"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Brand name — full-width display ──────────────────────────── */}
          <div class="mt-10 overflow-hidden">
            <div
              class="font-display leading-[0.85] tracking-tight select-none"
              style="font-size: clamp(3.5rem, 13vw, 12rem); font-weight: 900; -webkit-text-stroke: 0.5px currentColor"
            >
              <span style="color: var(--color-brand)">crush</span>
              <span style="color: rgba(255,255,255,0.9)">.news</span>
            </div>
          </div>

          {/* ── Bottom strip ─────────────────────────────────────────────── */}
          <div
            class="mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-5 text-xs"
            style="border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.3)"
          >
            <span>© {year} crush.news — Todos los derechos reservados</span>
            <a href="/sitemap.xml" class="transition-colors hover:text-white">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});
