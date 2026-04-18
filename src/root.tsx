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
      </body>
    </QwikCityProvider>
  );
});
