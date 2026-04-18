import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface Props {
  iso: string;
  class?: string;
}

// "18 abr 2026, 15:00 GMT+2"
function formatEs(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "shortOffset",
    timeZone,
  }).format(date);
}

export const ArticleDateTime = component$<Props>(({ iso, class: className }) => {
  // SSR: render in the primary-audience timezone (Spain). After hydration,
  // replace with the visitor's actual local timezone — mirrors The Verge.
  const text = useSignal(formatEs(new Date(iso), "Europe/Madrid"));

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && tz !== "Europe/Madrid") {
      text.value = formatEs(new Date(iso), tz);
    }
  });

  return (
    <time dateTime={iso} class={className}>
      {text.value}
    </time>
  );
});
