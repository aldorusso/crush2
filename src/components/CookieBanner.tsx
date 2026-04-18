import { component$, useSignal } from "@builder.io/qwik";

interface Props {
  hasConsent: boolean;
}

export const CookieBanner = component$<Props>(({ hasConsent }) => {
  const visible = useSignal(!hasConsent);

  if (!visible.value) return <></>;

  return (
    <div role="dialog" aria-modal="false" aria-label="Aviso de cookies" class="cookie-banner">
      <p class="cookie-banner-text">
        Usamos cookies para mejorar tu experiencia y mostrar publicidad personalizada. Puedes
        aceptar o rechazar su uso.{" "}
        <a href="/legal/cookies/" class="cookie-banner-link">
          Más información sobre nuestra política de cookies
        </a>
      </p>
      <div class="cookie-banner-actions">
        <button
          class="cookie-btn cookie-btn-reject"
          onClick$={() => {
            document.cookie = "consent=denied; max-age=31536000; path=/; SameSite=Lax";
            visible.value = false;
          }}
        >
          Rechazar
        </button>
        <button
          class="cookie-btn cookie-btn-accept"
          onClick$={() => {
            document.cookie = "consent=granted; max-age=31536000; path=/; SameSite=Lax";
            // Google Consent Mode v2 update
            const gtag = (window as unknown as Record<string, unknown>)["gtag"];
            if (typeof gtag === "function") {
              (gtag as (...args: unknown[]) => void)("consent", "update", {
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
                analytics_storage: "granted",
              });
            }
            visible.value = false;
          }}
        >
          Aceptar todo
        </button>
      </div>
    </div>
  );
});
