import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { SLOT_CONFIG } from "~/lib/ads";

interface Props {
  slotId: string;
  lazy?: boolean;
  class?: string;
}

export const AdSlot = component$<Props>(({ slotId, lazy = true, class: extraClass }) => {
  const config = SLOT_CONFIG[slotId] ?? { minHeight: 280, label: "Anuncio" };
  const loaded = useSignal(!lazy);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    loaded.value = true;
  });

  return (
    <div
      class={["ad-slot", extraClass].filter(Boolean).join(" ")}
      style={`min-height:${config.minHeight}px`}
      aria-label="Espacio publicitario"
      role="complementary"
    >
      {loaded.value && (
        <div class="ad-slot-inner">
          {/* Phase placeholder — replace with <ins class="adsbygoogle"> when AdSense approved */}
          <span class="ad-slot-label">{config.label}</span>
        </div>
      )}
    </div>
  );
});
