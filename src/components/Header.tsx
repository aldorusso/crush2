import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
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

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const update = () => (dateStr.value = formatDateTime(new Date()));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  });

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
          <span class="text-[10px] font-medium tracking-wider text-[var(--text-muted)] capitalize">
            {dateStr.value}
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
                    {/* Dropdown */}
                    <ul class="pointer-events-none absolute top-full left-0 z-50 min-w-[180px] rounded-lg border border-[var(--border)] bg-[var(--surface)] py-1 opacity-0 shadow-lg transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                      {link.subs.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            class="block px-4 py-2 text-sm whitespace-nowrap text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--color-brand)]"
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
