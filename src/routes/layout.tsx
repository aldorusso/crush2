import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { AdSlot } from "~/components/AdSlot";
import { CookieBanner } from "~/components/CookieBanner";
import { Analytics } from "~/components/Analytics";

export const useThemeCookie = routeLoader$(({ cookie }) => {
  return cookie.get("theme")?.value ?? "light";
});

export const useConsentCookie = routeLoader$(({ cookie }) => {
  return !!cookie.get("consent")?.value;
});

export default component$(() => {
  const theme = useThemeCookie();
  const hasConsent = useConsentCookie();

  return (
    <div
      class={theme.value === "dark" ? "dark" : ""}
      style="background-color:var(--surface);color:var(--text);min-height:100vh"
    >
      <Header />
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
