import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const DarkModeToggle = component$(() => {
  const isDark = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    isDark.value = document.documentElement.classList.contains("dark");
  });

  return (
    <button
      type="button"
      aria-label={isDark.value ? "Activar modo claro" : "Activar modo oscuro"}
      class="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--surface-3)]"
      onClick$={() => {
        const next = !isDark.value;
        isDark.value = next;
        document.documentElement.classList.toggle("dark", next);
        document.cookie = `theme=${next ? "dark" : "light"};path=/;max-age=31536000;SameSite=Lax`;
      }}
    >
      {isDark.value ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
});
