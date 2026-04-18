import { component$, useVisibleTask$ } from "@builder.io/qwik";

// Env vars injected at build time by Vite — empty string = analytics disabled
const UMAMI_URL = import.meta.env["PUBLIC_UMAMI_URL"] as string | undefined;
const UMAMI_ID = import.meta.env["PUBLIC_UMAMI_ID"] as string | undefined;

/**
 * Loads Umami analytics + Web Vitals reporter after the browser goes idle.
 * Renders nothing visible. Safe to include unconditionally — no-ops in dev
 * or when env vars are not configured.
 */
export const Analytics = component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    async () => {
      const { initCoreWebVitals, initScrollDepthTracker } = await import("~/lib/analytics");

      // Always measure Core Web Vitals (sent to Umami if loaded)
      initCoreWebVitals();

      // Scroll depth tracking
      initScrollDepthTracker();

      // Load Umami script dynamically when URL + ID are configured
      if (UMAMI_URL && UMAMI_ID) {
        const script = document.createElement("script");
        script.src = UMAMI_URL;
        script.defer = true;
        script.dataset["websiteId"] = UMAMI_ID;
        document.head.appendChild(script);
      }
    },
    { strategy: "document-idle" },
  );

  return <></>;
});
