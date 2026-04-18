import { component$, Slot, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { AdSlot } from "~/components/AdSlot";
import { CookieBanner } from "~/components/CookieBanner";
import { Analytics } from "~/components/Analytics";
import { BreakingTicker } from "~/components/BreakingTicker";
import { getContentIndex } from "~/lib/content";

export const useThemeCookie = routeLoader$(({ cookie }) => {
  return cookie.get("theme")?.value ?? "light";
});

export const useConsentCookie = routeLoader$(({ cookie }) => {
  return !!cookie.get("consent")?.value;
});

export const useTickerArticles = routeLoader$(() => {
  // Random subset of articles for the breaking-news ticker. Shuffled on
  // each render so the rotation order isn't frozen. Placeholder behaviour
  // until real "destacadas" editorial curation arrives.
  const all = getContentIndex().articles;
  const pool = all.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i] as (typeof pool)[number];
    pool[i] = pool[j] as (typeof pool)[number];
    pool[j] = tmp;
  }
  return pool.slice(0, 5);
});

export default component$(() => {
  const theme = useThemeCookie();
  const hasConsent = useConsentCookie();
  const ticker = useTickerArticles();
  const stuck = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const sentinel = document.getElementById("masthead-sentinel");
    if (!sentinel || typeof IntersectionObserver === "undefined") return;
    // Sentinel sits just below the sticky wrapper's natural position.
    // While it's visible the user is still near the top, so the masthead
    // keeps its full size. Once it scrolls off-screen the sticky has
    // "taken over" the top and we toggle .is-stuck to shrink.
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) stuck.value = !entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(sentinel);
    cleanup(() => io.disconnect());
  });

  return (
    <div
      class={theme.value === "dark" ? "dark" : ""}
      style="background-color:var(--surface);color:var(--text);min-height:100vh"
    >
      {/* Ticker — normal flow, scrolls away with the page. We want it at
          the top only, not following the sticky masthead. */}
      <BreakingTicker articles={ticker.value} />

      {/* Sticky masthead — the only thing that follows the scroll. The
          menu overlay (z-[60]) still wins when the hamburger is open. */}
      <div class={["sticky top-0 z-40", stuck.value ? "is-stuck" : ""].join(" ")}>
        <Header />
      </div>

      {/* Zero-height sentinel placed right below the sticky wrapper's
          natural position. While it's in the viewport the masthead renders
          full size; once the user scrolls past it we flip to compact. */}
      <div id="masthead-sentinel" aria-hidden="true" />
      {/* Header leaderboard — desktop only, non-lazy (above fold) */}
      <div class="mx-auto hidden max-w-7xl px-4 py-2 md:block">
        <AdSlot slotId="header-leaderboard" lazy={false} />
      </div>
      <main id="main-content" tabIndex={-1}>
        <Slot />
      </main>
      <Footer />
      {/* Anchor bottom — mobile only, fixed, non-lazy */}
      <div class="ad-anchor">
        <AdSlot slotId="anchor-bottom" lazy={false} />
      </div>
      <CookieBanner hasConsent={hasConsent.value} />
      <Analytics />
    </div>
  );
});
