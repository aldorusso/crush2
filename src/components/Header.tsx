import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
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
  useVisibleTask$(({ track, cleanup }) => {
    track(() => menuOpen.value);
    document.body.style.overflow = menuOpen.value ? "hidden" : "";

    if (!menuOpen.value) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        menuOpen.value = false;
        openCategory.value = null;
      }
    };
    document.addEventListener("keydown", onKey);
    cleanup(() => document.removeEventListener("keydown", onKey));
  });

  const closeMenu = $(() => {
    menuOpen.value = false;
    openCategory.value = null;
  });

  return (
    <header class="bg-[var(--surface)]">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--color-brand)] focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>

      {/* Editorial masthead — centered, NYT/Economist style */}
      <div class="border-b-2 border-[var(--color-brand)] bg-[var(--surface)]">
        {/* Row 1 — masthead with corner actions */}
        <div class="masthead-row relative mx-auto max-w-7xl px-4 py-5 text-center md:py-7">
          {/* Search — left corner */}
          <Link
            href="/buscar/"
            aria-label="Buscar"
            class="absolute top-1/2 left-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-[var(--surface-3)] md:left-4"
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

          {/* Right corner — dark mode + hamburger (all breakpoints) */}
          <div class="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1 md:right-4 md:gap-2">
            <DarkModeToggle />

            <button
              class="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full transition-colors hover:bg-[var(--surface-3)]"
              aria-label={menuOpen.value ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen.value}
              aria-controls="fullscreen-menu"
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

          {/* Centered wordmark */}
          <Link
            href="/"
            class="masthead-logo font-display inline-block leading-none tracking-tight"
            style="font-weight: 900"
            aria-label="crush.news — inicio"
            onClick$={closeMenu}
          >
            <span class="text-[var(--color-brand)]">crush</span>
            <span class="text-[var(--text)]">.news</span>
          </Link>

          {/* Dateline */}
          <p class="masthead-date mt-2 text-[10px] font-semibold tracking-[0.18em] text-[var(--text-muted)] uppercase sm:text-[11px]">
            {dateStr.value || "\u00a0"}
          </p>
        </div>
      </div>

      {/* Fullscreen centered menu overlay — desktop + mobile unified */}
      {menuOpen.value && (
        <div
          id="fullscreen-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          class="menu-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick$={closeMenu}
        >
          <nav
            aria-label="Navegación principal"
            class="menu-panel relative w-full max-w-3xl px-6 py-16 text-center text-white"
            onClick$={(e) => e.stopPropagation()}
          >
            <ul class="space-y-8 md:space-y-10">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} class="menu-item" style={`--i:${i}`}>
                  <Link
                    href={link.href}
                    onClick$={closeMenu}
                    class="font-display block text-4xl leading-none tracking-tight transition-colors hover:text-[var(--color-brand)] sm:text-5xl md:text-6xl"
                    style="font-weight: 900"
                  >
                    {link.label}
                  </Link>
                  <ul class="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-white/60">
                    {link.subs.map((sub, j) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick$={closeMenu}
                          class="transition-colors hover:text-white"
                        >
                          {sub.label}
                          {j < link.subs.length - 1 && (
                            <span class="ml-4 text-white/25" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div class="menu-item mt-12 border-t border-white/15 pt-8" style="--i:5">
              <Link
                href="/buscar/"
                onClick$={closeMenu}
                class="font-display inline-flex items-center gap-3 text-2xl font-bold transition-colors hover:text-[var(--color-brand)]"
              >
                <svg
                  width="22"
                  height="22"
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
      )}
    </header>
  );
});
