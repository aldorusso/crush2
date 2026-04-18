import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { DarkModeToggle } from "./DarkModeToggle";

const NAV_LINKS = [
  { href: "/tecnologia/", label: "Tecnología" },
  { href: "/estilo-de-vida/", label: "Estilo de vida" },
  { href: "/ciencia/", label: "Ciencia" },
  { href: "/viajes/", label: "Viajes" },
  { href: "/cultura/", label: "Cultura" },
];

export const Header = component$(() => {
  const loc = useLocation();

  return (
    <header class="sticky top-0 z-50 bg-[var(--surface)]">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--color-brand)] focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>

      {/* Top strip — tagline */}
      <div class="border-b border-[var(--border)] bg-[var(--surface-2)]">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <span class="hidden text-[10px] font-semibold tracking-[0.14em] text-[var(--text-muted)] uppercase sm:block">
            Tecnología · Ciencia · Cultura · Viajes · Estilo de vida
          </span>
          <span class="text-[10px] font-semibold tracking-[0.14em] text-[var(--text-muted)] uppercase sm:hidden">
            crush.news
          </span>
          <span class="text-[10px] font-medium tracking-wider text-[var(--text-muted)] uppercase">
            ES
          </span>
        </div>
      </div>

      {/* Main header — logo + actions, red bottom border */}
      <div class="border-b-2 border-[var(--color-brand)]">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            class="font-display font-800 text-2xl leading-none tracking-tight"
            aria-label="crush.news — inicio"
          >
            <span class="text-[var(--color-brand)]">crush</span>
            <span class="text-[var(--text)]">.news</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" class="hidden md:block">
            <ul class="flex">
              {NAV_LINKS.map((link) => {
                const active = loc.url.pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link href={link.href} class={["nav-link", active ? "active" : ""].join(" ")}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div class="flex items-center gap-2">
            <Link
              href="/buscar/"
              aria-label="Buscar"
              class="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--surface-3)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div class="border-b border-[var(--border)] md:hidden">
        <nav aria-label="Navegación principal móvil">
          <ul class="flex gap-1 overflow-x-auto px-4 py-2">
            {NAV_LINKS.map((link) => {
              const active = loc.url.pathname.startsWith(link.href);
              return (
                <li key={link.href} class="shrink-0">
                  <Link
                    href={link.href}
                    class={[
                      "block px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                      active
                        ? "font-semibold text-[var(--color-brand)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
});
