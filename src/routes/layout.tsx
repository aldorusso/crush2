import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export const useThemeCookie = routeLoader$(({ cookie }) => {
  return cookie.get("theme")?.value ?? "light";
});

export default component$(() => {
  const theme = useThemeCookie();

  return (
    <div
      class={theme.value === "dark" ? "dark" : ""}
      style="background-color:var(--surface);color:var(--text);min-height:100vh"
    >
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
