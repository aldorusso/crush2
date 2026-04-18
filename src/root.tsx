import { component$, isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { buildWebSiteSchema, buildOrganizationSchema, schemaToScript } from "./lib/jsonld";

import "./global.css";

const websiteScript = schemaToScript(buildWebSiteSchema());
const orgScript = schemaToScript(buildOrganizationSchema());

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />}
        {/* Google Consent Mode v2 — must run before any Google scripts */}
        <script dangerouslySetInnerHTML="window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});" />
        <RouterHead />
        <script type={websiteScript.props.type} dangerouslySetInnerHTML={websiteScript.script} />
        <script type={orgScript.props.type} dangerouslySetInnerHTML={orgScript.script} />
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body lang="es">
        <RouterOutlet />
        {!isDev && (
          <script
            dangerouslySetInnerHTML={`if('serviceWorker' in navigator){navigator.serviceWorker.register('/service-worker.js',{scope:'/'})}`}
          />
        )}
      </body>
    </QwikCityProvider>
  );
});
