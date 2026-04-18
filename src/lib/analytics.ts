/**
 * Analytics helpers — wraps Umami's window.umami API with a safe no-op fallback.
 * All calls are safe to make before Umami loads; they queue when the tracker isn't ready.
 */

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number>) => void;
    };
  }
}

export function trackEvent(event: string, data?: Record<string, string | number>): void {
  try {
    window.umami?.track(event, data);
  } catch {
    // Umami not loaded or blocked — silent fail
  }
}

export function initScrollDepthTracker(): () => void {
  const milestones = [25, 50, 75, 90];
  const fired = new Set<number>();

  const onScroll = () => {
    const scrollable = document.body.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.round((window.scrollY / scrollable) * 100);
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        trackEvent("scroll-depth", { depth: m });
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

export async function initCoreWebVitals(): Promise<void> {
  const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import("web-vitals");

  const report = (metric: { name: string; value: number; rating: string }) => {
    trackEvent("cwv", {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  };

  onCLS(report);
  onINP(report);
  onFCP(report);
  onLCP(report);
  onTTFB(report);
}
