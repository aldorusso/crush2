import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Author } from "~/lib/types";

interface Props {
  author: Author;
  compact?: boolean;
}

export const AuthorBox = component$<Props>(({ author, compact }) => {
  if (compact) {
    return (
      <div class="flex items-center gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          class="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <Link
            href={`/autor/${author.slug}/`}
            class="text-sm font-semibold transition-colors hover:text-[var(--color-brand)]"
          >
            {author.name}
          </Link>
          <p class="text-xs text-[var(--text-muted)]">{author.role}</p>
        </div>
      </div>
    );
  }

  return (
    <aside class="mt-10 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
      <div class="flex items-start gap-4">
        <img
          src={author.avatar}
          alt={author.name}
          width={72}
          height={72}
          loading="lazy"
          decoding="async"
          class="h-18 w-18 shrink-0 rounded-full object-cover"
        />
        <div>
          <Link
            href={`/autor/${author.slug}/`}
            class="font-display font-700 text-lg transition-colors hover:text-[var(--color-brand)]"
          >
            {author.name}
          </Link>
          <p class="text-sm text-[var(--text-muted)]">{author.role}</p>
          {author.bio && (
            <p class="mt-3 text-sm leading-relaxed text-[var(--text)]">
              {author.bio.slice(0, 220)}
              {author.bio.length > 220 ? "…" : ""}
            </p>
          )}
          <Link
            href={`/autor/${author.slug}/`}
            class="mt-2 inline-block text-sm font-medium text-[var(--color-brand)] hover:underline"
          >
            Ver perfil completo →
          </Link>
        </div>
      </div>
    </aside>
  );
});
