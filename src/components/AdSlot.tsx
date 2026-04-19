import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { SLOT_CONFIG } from "~/lib/ads";

const CLIENT_ID = "ca-pub-3992058202623173";

interface Props {
  slotId: string;
  lazy?: boolean;
  class?: string;
}

export const AdSlot = component$<Props>(({ slotId, lazy = true, class: extraClass }) => {
  const config = SLOT_CONFIG[slotId];
  const visible = useSignal(!lazy);
  const filled = useSignal(true);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    visible.value = true;
    // Push after a microtask so the <ins> is in the DOM
    const pushTimer = setTimeout(() => {
      try {
        // @ts-expect-error adsbygoogle is injected globally
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* AdSense not loaded yet */
      }
    }, 0);

    // Grace period for AdSense to fill the slot. If it comes back marked
    // "unfilled" (or the <ins> ended up with zero rendered height because
    // the script never ran or the request was blocked) collapse the slot
    // so readers don't see an empty box. Matches CLAUDE.md §7.3.
    const checkTimer = setTimeout(() => {
      const ins = document.querySelector<HTMLElement>(`[data-slot-id="${slotId}"] ins.adsbygoogle`);
      if (!ins) {
        filled.value = false;
        return;
      }
      const status = ins.getAttribute("data-ad-status");
      if (status === "unfilled" || ins.clientHeight === 0) {
        filled.value = false;
      }
    }, 3000);

    cleanup(() => {
      clearTimeout(pushTimer);
      clearTimeout(checkTimer);
    });
  });

  if (!config) return null;

  const isEmpty = visible.value && !filled.value;

  return (
    <div
      data-slot-id={slotId}
      class={["ad-slot", isEmpty ? "ad-slot-empty" : "", extraClass].filter(Boolean).join(" ")}
      style={`min-height:${isEmpty ? 0 : config.minHeight}px`}
      aria-label="Espacio publicitario"
      aria-hidden={isEmpty ? "true" : undefined}
      role="complementary"
    >
      {visible.value && (
        <>
          <span class="ad-slot-label" aria-hidden="true">
            Publicidad
          </span>
          <ins
            class="adsbygoogle"
            style="display:block;text-align:center"
            data-ad-client={CLIENT_ID}
            data-ad-slot={config.adSlot}
            data-ad-format={config.adFormat}
            {...(config.adLayout ? { "data-ad-layout": config.adLayout } : {})}
            {...(config.adLayoutKey ? { "data-ad-layout-key": config.adLayoutKey } : {})}
            {...(config.fullWidthResponsive ? { "data-full-width-responsive": "true" } : {})}
          />
        </>
      )}
    </div>
  );
});
