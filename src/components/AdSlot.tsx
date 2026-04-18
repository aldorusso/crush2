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

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    visible.value = true;
    // Push after a microtask so the <ins> is in the DOM
    const t = setTimeout(() => {
      try {
        // @ts-expect-error adsbygoogle is injected globally
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* AdSense not loaded yet */
      }
    }, 0);
    cleanup(() => clearTimeout(t));
  });

  if (!config) return null;

  return (
    <div
      class={["ad-slot", extraClass].filter(Boolean).join(" ")}
      style={`min-height:${config.minHeight}px`}
      aria-label="Espacio publicitario"
      role="complementary"
    >
      {visible.value && (
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
      )}
    </div>
  );
});
