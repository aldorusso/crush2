import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const ReadingProgress = component$(() => {
  const progress = useSignal(0);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progress.value = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
    };
    window.addEventListener("scroll", update, { passive: true });
    cleanup(() => window.removeEventListener("scroll", update));
  });

  return (
    <div
      role="progressbar"
      aria-label="Progreso de lectura"
      aria-valuenow={Math.round(progress.value)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 60,
        height: "3px",
        width: `${progress.value}%`,
        backgroundColor: "var(--color-brand)",
        transition: "width 80ms linear",
        pointerEvents: "none",
      }}
    />
  );
});
