import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  crumbs: Crumb[];
}

export const Breadcrumbs = component$<Props>(({ crumbs }) => (
  <nav aria-label="Ruta de navegación" class="mb-4">
    <ol
      class="flex flex-wrap items-center gap-1 text-sm text-[var(--text-muted)]"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {crumbs.map((crumb, i) => (
        <li
          key={crumb.label}
          class="flex items-center gap-1"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {i > 0 && (
            <span aria-hidden="true" class="text-[var(--border)]">
              /
            </span>
          )}
          {crumb.href ? (
            <Link
              href={crumb.href}
              class="transition-colors hover:text-[var(--text)]"
              itemProp="item"
            >
              <span itemProp="name">{crumb.label}</span>
            </Link>
          ) : (
            <span class="font-medium text-[var(--text)]" itemProp="name" aria-current="page">
              {crumb.label}
            </span>
          )}
          <meta itemProp="position" content={String(i + 1)} />
        </li>
      ))}
    </ol>
  </nav>
));
