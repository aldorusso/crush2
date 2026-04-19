import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface Props {
  label: string;
  id?: string;
  seeAllHref?: string;
  /** Drops the top margin — use for the first divider on a page. */
  first?: boolean;
}

/**
 * Editorial section divider: thick rule above, thin rule below, bold
 * title on the left and an optional "Ver todo" kicker on the right.
 * Inspired by elpais.com's themed-section headers.
 */
export const SectionDivider = component$<Props>(({ label, id, seeAllHref, first }) => (
  <div class={["section-divider", first ? "section-divider-first" : ""].join(" ")}>
    <h2 id={id} class="section-divider-title">
      {label}
    </h2>
    {seeAllHref && (
      <Link href={seeAllHref} class="section-divider-more">
        Ver todo →
      </Link>
    )}
  </div>
));
