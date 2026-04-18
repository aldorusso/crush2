import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { DarkModeToggle } from "./DarkModeToggle";

function formatDateTime(d: Date): string {
  return d.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const NAV_LINKS = [
  {
    href: "/tecnologia/",
    label: "Tecnología",
    subs: [
      { href: "/tecnologia/apps-y-servicios/", label: "Apps y Servicios" },
      { href: "/tecnologia/inteligencia-artificial/", label: "Inteligencia Artificial" },
      { href: "/tecnologia/gadgets/", label: "Gadgets" },
      { href: "/tecnologia/cultura-digital/", label: "Cultura Digital" },
    ],
  },
  {
    href: "/estilo-de-vida/",
    label: "Estilo de vida",
    subs: [
      { href: "/estilo-de-vida/productividad/", label: "Productividad" },
      { href: "/estilo-de-vida/hogar/", label: "Hogar" },
      { href: "/estilo-de-vida/relaciones/", label: "Relaciones" },
      { href: "/estilo-de-vida/habitos/", label: "Hábitos" },
    ],
  },
  {
    href: "/ciencia/",
    label: "Ciencia",
    subs: [
      { href: "/ciencia/el-porque-de-las-cosas/", label: "El Porqué de las Cosas" },
      { href: "/ciencia/curiosidades/", label: "Curiosidades" },
      { href: "/ciencia/cuerpo-humano/", label: "Cuerpo Humano" },
      { href: "/ciencia/historia-de-la-ciencia/", label: "Historia de la Ciencia" },
    ],
  },
  {
    href: "/viajes/",
    label: "Viajes",
    subs: [
      { href: "/viajes/guias-de-ciudad/", label: "Guías de Ciudad" },
      { href: "/viajes/experiencias/", label: "Experiencias" },
      { href: "/viajes/consejos-practicos/", label: "Consejos Prácticos" },
      { href: "/viajes/descubrimientos/", label: "Descubrimientos" },
    ],
  },
  {
    href: "/cultura/",
    label: "Cultura",
    subs: [
      { href: "/cultura/series-y-cine/", label: "Series y Cine" },
      { href: "/cultura/musica/", label: "Música" },
      { href: "/cultura/videojuegos/", label: "Videojuegos" },
      { href: "/cultura/libros/", label: "Libros" },
    ],
  },
];

export const Header = component$(() => {
  const loc = useLocation();
  const dateStr = useSignal("");
  const menuOpen = useSignal(false);
  const openCategory = useSignal<string | null>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const update = () => (dateStr.value = formatDateTime(new Date()));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => menuOpen.value);
    document.body.style.overflow = menuOpen.value ? "hidden" : "";
  });

  const closeMenu = $(() => {
    menuOpen.value = false;
    openCategory.value = null;
  });

  return (
    <header class="sticky top-0 z-50 bg-[var(--surface)]">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--color-brand)] focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>

      {/* Top strip */}
      <div class="border-b border-[var(--border)] bg-[var(--surface-2)]">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <span class="hidden text-[10px] font-semibold tracking-[0.14em] text-[var(--text-muted)] uppercase sm:block">
            Tecnología · Ciencia · Cultura · Viajes · Estilo de vida
          </span>
          <span class="text-[10px] font-semibold tracking-[0.14em] text-[var(--text-muted)] uppercase sm:hidden">
            crush.news
          </span>
          <span class="text-[10px] font-medium tracking-wider text-[var(--text-muted)] capitalize">
            {dateStr.value}
          </span>
        </div>
      </div>

      {/* Main header */}
      <div class="border-b-2 border-[var(--color-brand)]">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            class="font-display text-2xl leading-none tracking-tight"
            style="font-weight: 900"
            aria-label="crush.news — inicio"
            onClick$={closeMenu}
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
                  <li key={link.href} class="group relative">
                    <Link
                      href={link.href}
                      class={[
                        "nav-link inline-flex items-center gap-1",
                        active ? "active" : "",
                      ].join(" ")}
                    >
                      {link.label}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        aria-hidden="true"
                        class="opacity-50 transition-transform group-hover:rotate-180"
                      >
                        <path
                          d="M1 3l4 4 4-4"
                          stroke="currentColor"
                          stroke-width="1.5"
                          fill="none"
                          stroke-linecap="round"
                        />
                      </svg>
                    </Link>
                    <ul class="pointer-events-none absolute top-full left-0 z-50 min-w-[180px] rounded-lg border border-[var(--border)] bg-[var(--surface)] py-1 opacity-0 shadow-lg transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                      {link.subs.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            class="block px-4 py-2 text-sm whitespace-nowrap text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--color-brand-text)]"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions */}
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

            {/* Hamburger — mobile only */}
            <button
              class="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full transition-colors hover:bg-[var(--surface-3)] md:hidden"
              aria-label={menuOpen.value ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen.value}
              aria-controls="mobile-menu"
              onClick$={() => {
                menuOpen.value = !menuOpen.value;
                if (!menuOpen.value) openCategory.value = null;
              }}
            >
              <span
                class={[
                  "h-0.5 w-5 bg-current transition-all duration-300",
                  menuOpen.value ? "translate-y-2 rotate-45" : "",
                ].join(" ")}
              />
              <span
                class={[
                  "h-0.5 w-5 bg-current transition-all duration-300",
                  menuOpen.value ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                class={[
                  "h-0.5 w-5 bg-current transition-all duration-300",
                  menuOpen.value ? "-translate-y-2 -rotate-45" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen.value && (
        <div
          class="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-hidden="true"
          onClick$={closeMenu}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menú de navegación"
        class={[
          "fixed top-0 left-0 z-50 h-full w-72 bg-[var(--surface)] shadow-2xl transition-transform duration-300 ease-in-out md:hidden",
          menuOpen.value ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div class="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <Link
            href="/"
            class="font-display text-xl leading-none"
            style="font-weight: 900"
            onClick$={closeMenu}
          >
            <span class="text-[var(--color-brand)]">crush</span>
            <span class="text-[var(--text)]">.news</span>
          </Link>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
            aria-label="Cerrar menú"
            onClick$={closeMenu}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M2 2l14 14M16 2L2 16"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Drawer nav */}
        <nav aria-label="Navegación móvil" class="h-[calc(100%-65px)] overflow-y-auto px-2 py-3">
          <ul>
            {NAV_LINKS.map((link) => {
              const active = loc.url.pathname.startsWith(link.href);
              const isOpen = openCategory.value === link.href;
              return (
                <li key={link.href}>
                  {/* Category row */}
                  <div class="flex items-center">
                    <Link
                      href={link.href}
                      class={[
                        "flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                        active
                          ? "text-[var(--color-brand-text)]"
                          : "text-[var(--text)] hover:bg-[var(--surface-2)]",
                      ].join(" ")}
                      onClick$={closeMenu}
                    >
                      {link.label}
                    </Link>
                    <button
                      class="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)]"
                      aria-label={isOpen ? `Cerrar ${link.label}` : `Abrir ${link.label}`}
                      aria-expanded={isOpen}
                      onClick$={() => {
                        openCategory.value = isOpen ? null : link.href;
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        class={[
                          "transition-transform duration-200",
                          isOpen ? "rotate-180" : "",
                        ].join(" ")}
                      >
                        <path
                          d="M2 4l5 6 5-6"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          fill="none"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Subcategories accordion */}
                  {isOpen && (
                    <ul class="mb-1 ml-4 border-l border-[var(--border)] pl-3">
                      {link.subs.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            class="block rounded-lg px-3 py-2.5 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--color-brand-text)]"
                            onClick$={closeMenu}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Buscar */}
          <div class="mt-3 border-t border-[var(--border)] pt-3">
            <Link
              href="/buscar/"
              class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
              onClick$={closeMenu}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Buscar
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
});
