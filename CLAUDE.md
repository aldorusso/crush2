# CLAUDE.md — crush.news

> Briefing maestro que Claude Code lee automáticamente al arrancar. Contiene stack bloqueado, objetivos no negociables y plan de construcción por fases.
> **Fase actual: construir la WEB (frontend + SEO + monetización) con contenido mock. El pipeline editorial automatizado se aborda después en §16 (actualmente en placeholder).**

---

## 0. CÓMO DEBES TRABAJAR (instrucciones para Claude Code)

1. Lee este archivo completo antes de escribir código.
2. Trabaja **por fases** (§9). No saltes fases.
3. Antes de cada fase: lista archivos a crear/modificar y espera confirmación.
4. Después de cada fase: ejecuta tests y linters (§10), reporta resultado.
5. Si una decisión es ambigua, **pregunta**. No inventes librerías ni APIs.
6. TypeScript estricto (`strict: true`, sin `any`).
7. Commits en **Conventional Commits** (`feat:`, `fix:`, `perf:`, `docs:`, `refactor:`, `test:`, `chore:`).
8. Ningún commit baja Lighthouse Performance de 95.
9. Si una decisión de este doc choca con la realidad (API deprecada, lib muerta), **detente y avisa**.
10. Si te piden construir el pipeline editorial, revisa §16 — si sigue en placeholder, **detente y avisa** que falta definirlo con el owner.

---

## 1. PROYECTO

**Nombre:** crush.news
**Tipo:** Medio de comunicación digital (noticias, actualidad, tecnología, entretenimiento, virales).
**Mercado:** Hispanohablante (ES-ES prioritario, preparado multi-locale: es-MX, es-AR, es-CO).
**Volumen objetivo 12m:** 500k–5M pageviews/mes.
**Monetización:** Google AdSense (fase 1) → Google Ad Manager + Prebid.js (fase 2, >100k PV/día).

### North Star

Ser el medio de noticias **más rápido del mundo** (LCP < 1.2s, INP < 100ms, CLS < 0.05 móvil 4G p75) **y simultáneamente** maximizar eCPM/CTR de AdSense sin violar políticas ni degradar UX.

### Filosofía de construcción

Construimos la **web primero** con contenido mock realista. Así validamos:

- Performance con anuncios reales
- SEO técnico e indexación
- Flujo de usuario completo
- Cumplimiento AdSense

Cuando la web esté en producción y aprobada por AdSense, abordamos el pipeline editorial (§16).

---

## 2. STACK (bloqueado, no cambiar sin discusión)

| Capa                    | Decisión                                              | Versión mínima |
| ----------------------- | ----------------------------------------------------- | -------------- |
| Framework               | Qwik + Qwik City                                      | última estable |
| Lenguaje                | TypeScript estricto                                   | 5.x            |
| Estilos                 | Tailwind CSS (JIT)                                    | 3.x            |
| Contenido (fase actual) | **Archivos Markdown + frontmatter** en `content/`     | —              |
| Contenido (fase futura) | Sanity u otro headless (decidir en §16)               | —              |
| Imágenes CDN            | Cloudflare Images _o_ Bunny.net                       | —              |
| Hosting                 | Cloudflare Pages + Workers                            | —              |
| Analytics               | Cloudflare Web Analytics (gratis) + GA4 (fase 2)      | —              |
| Scripts terceros        | Partytown (excepto AdSense)                           | última estable |
| Base de datos           | Cloudflare D1 (comentarios, newsletter — fase futura) | —              |
| CI/CD                   | GitHub Actions + Lighthouse CI                        | —              |
| Testing                 | Vitest + Playwright + axe-core                        | —              |
| Linter                  | ESLint + Prettier + typescript-eslint                 | —              |

### Prohibido

- React, Vue, Next.js, Astro, Nuxt, SvelteKit como alternativas.
- Librerías que añadan >10KB al bundle sin justificación medida.
- `localStorage` para estado crítico (causa flashes en SSR).
- Google Analytics Universal (deprecado).
- FID como métrica (deprecado, usar INP).

### ¿Por qué Markdown y no CMS ya?

- Coste: 0€. Encaja en el budget actual.
- Simplicidad: no hay que desplegar Sanity Studio ni gestionar tokens.
- Reversibilidad: cualquier CMS futuro puede consumir los mismos markdown o importarlos.
- Foco: la prioridad ahora es performance y monetización, no workflow editorial.

---

## 3. OBJETIVOS DE PERFORMANCE (no negociables)

Medidos en p75 móvil 4G con ads activos:

| Métrica                       | Ideal   | Aceptable | Bloqueo deploy |
| ----------------------------- | ------- | --------- | -------------- |
| LCP                           | < 1.2s  | < 2.5s    | > 2.5s         |
| INP                           | < 100ms | < 200ms   | > 200ms        |
| CLS                           | < 0.05  | < 0.1     | > 0.1          |
| TTFB                          | < 200ms | < 500ms   | > 500ms        |
| FCP                           | < 1.0s  | < 1.8s    | > 1.8s         |
| Lighthouse Performance mobile | 95+     | 90+       | < 90           |
| Bundle JS inicial             | < 50KB  | < 100KB   | > 100KB        |

---

## 4. ESTRUCTURA DE RUTAS Y CONTENIDO

### 4.1 Rutas

```
src/routes/
├── index.tsx                          → Home
├── [category]/
│   ├── index.tsx                      → Landing de categoría (pillar page)
│   ├── [subcategory]/
│   │   ├── index.tsx                  → Landing de subcategoría
│   │   └── [slug]/
│   │       └── index.tsx              → Artículo (plantilla principal)
├── autor/[author]/index.tsx           → Perfil de autor
├── tag/[tag]/index.tsx                → Tag page
├── buscar/index.tsx                   → Búsqueda (client-side sobre índice estático)
├── sitemap.xml/index.ts               → Sitemap index
├── sitemap-news.xml/index.ts          → News sitemap (últimas 48h)
├── sitemap-[year]-[month].xml/index.ts → Sitemaps segmentados
├── rss.xml/index.ts                   → Feed global
├── rss/[category].xml/index.ts        → Feed por categoría
├── robots.txt/index.ts                → robots.txt dinámico
├── ads.txt/index.ts                   → ads.txt
└── legal/
    ├── sobre-nosotros/
    ├── contacto/
    ├── etica/
    ├── correcciones/
    ├── privacidad/
    ├── cookies/
    └── equipo/
```

### 4.2 Estructura de contenido (Markdown en fase actual)

```
content/
├── articles/
│   └── [category]/
│       └── [subcategory]/
│           └── YYYY-MM-DD-slug.md
├── authors/
│   └── [author-slug].md
├── categories/
│   └── [category-slug].md
└── site/
    ├── about.md
    ├── ethics-policy.md
    ├── corrections-policy.md
    └── masthead.md
```

### 4.3 Frontmatter obligatorio de artículo

```yaml
---
title: "Titular del artículo (≤110 chars)"
slug: "slug-del-articulo"
description: "Meta description 150-160 chars"
publishedAt: "2026-04-18T10:30:00Z"
updatedAt: "2026-04-18T10:30:00Z"
author: "nombre-autor-slug"
category: "tecnologia"
subcategory: "ia"
tags: ["openai", "gpt", "chatgpt"]
heroImage:
  src: "/images/articles/slug-hero.avif"
  alt: "Descripción de la imagen"
  credit: "Unsplash / @autor"
  width: 1200
  height: 675
readingTime: 5
featured: false
breaking: false
---
Cuerpo del artículo en Markdown...
```

### 4.4 Generador de mock content

Crear script `scripts/seed-content.ts` que genere 50 artículos mock realistas (lorem-ipsum temático) distribuidos entre categorías, con autores, imágenes placeholder (picsum.photos o Unsplash API) y fechas escalonadas. Esto permite desarrollar toda la web sin bloquearse por falta de contenido.

### 4.5 URL rules

- Slug: transliterado, lowercase, separado por `-`, máx 75 chars, sin stopwords.
- Sin fecha en URL (evergreen-ready).
- Categoría y subcategoría en singular.
- Canonical siempre sin UTM.

---

## 5. SEO TÉCNICO

### 5.1 Meta tags obligatorios

Cada plantilla renderiza `<Seo>` con:

- `<title>` ≤ 60 chars
- `<meta name="description">` 150–160 chars
- `<meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
- `<link rel="canonical">`
- `<link rel="alternate" hreflang="...">` para cada locale
- Open Graph (`og:type=article` en artículos)
- Twitter Cards (`summary_large_image`)

### 5.2 JSON-LD obligatorio

Artículo inyecta:

1. `NewsArticle` con todos los campos Google (headline, image array 1:1/4:3/16:9, datePublished, dateModified, author Person, publisher NewsMediaOrganization con logo 600×60, isAccessibleForFree, description, articleBody, articleSection, keywords).
2. `BreadcrumbList`.

Layout global inyecta: 3. `NewsMediaOrganization` con sameAs, ethicsPolicy, correctionsPolicy, diversityPolicy, masthead, foundingDate. 4. `WebSite` con SearchAction (sitelinks searchbox).

Páginas de autor inyectan: 5. `Person` con jobTitle, worksFor, sameAs, knowsAbout.

### 5.3 Sitemaps

- `/sitemap.xml` → index.
- `/sitemap-news.xml` → solo últimas 48h, máx 1000 URLs, regenerado en build + webhook futuro.
- `/sitemap-YYYY-MM.xml` → segmentados por mes.
- Ping automático a Google y Bing en cada build de producción.

### 5.4 E-E-A-T (Google News Publisher Center ready)

Páginas legales obligatorias **antes del primer deploy público**:

- `/legal/sobre-nosotros/`
- `/legal/contacto/`
- `/legal/etica/`
- `/legal/correcciones/`
- `/legal/equipo/` (masthead)
- `/legal/privacidad/` (GDPR + LOPDGDD)
- `/legal/cookies/`

Cada artículo muestra autor con link a perfil. Cada perfil: bio ≥150 palabras, foto, credenciales, links verificables.

> **Nota fase actual**: los autores pueden ser ficticios durante desarrollo, PERO antes del lanzamiento público se reemplazan por personas reales. Nunca publicar con autores falsos + AdSense activo → violación de políticas.

---

## 6. PERFORMANCE

### 6.1 Imágenes

- Formato: AVIF → WebP → JPEG (via `<picture>`).
- Tamaños responsive: 400, 800, 1200, 1600, 2400 px.
- Atributos: `width`, `height`, `loading`, `decoding="async"`, `srcset`, `sizes`.
- LCP image: `loading="eager"`, `fetchpriority="high"`, preload en `<head>`.
- Resto: `loading="lazy"`.
- Placeholder: LQIP base64 16px o BlurHash.
- Fase actual: imágenes en `public/images/` optimizadas en build. Fase producción: Cloudflare Images.

### 6.2 Fonts

- Máximo 2 familias, 4 weights total.
- WOFF2 subsetteado (latin + latin-ext).
- `font-display: swap`.
- Preload de la fuente del H1.
- `size-adjust`, `ascent-override`, `descent-override` para eliminar FOUT/CLS.

### 6.3 CSS

- Critical CSS inline en `<head>` (≤14KB).
- Tailwind JIT con purge agresivo.
- CSS no crítico con `media="print" onload="this.media='all'"`.

### 6.4 JavaScript

- Qwik resumability: cero hidratación por defecto.
- `useVisibleTask$` solo donde estrictamente necesario (lazy ads, IntersectionObserver).
- Scripts terceros vía Partytown **excepto AdSense**.
- Trabajo diferido con `requestIdleCallback`.

### 6.5 Resource hints

```html
<link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```

### 6.6 Cache-Control

- Home: `public, max-age=0, s-maxage=60, stale-while-revalidate=300`
- Artículo reciente (<24h): `public, max-age=0, s-maxage=300, stale-while-revalidate=86400`
- Artículo viejo: `public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800`
- Assets estáticos: `public, max-age=31536000, immutable`

---

## 7. MONETIZACIÓN (AdSense)

### 7.1 Inventario de slots

| Slot ID                         | Desktop          | Móvil      | min-height | Lazy |
| ------------------------------- | ---------------- | ---------- | ---------- | ---- |
| `anchor-bottom`                 | —                | 320×50/100 | 100px      | No   |
| `header-leaderboard`            | 970×250 / 728×90 | —          | 250px      | No   |
| `in-article-1` (tras párrafo 2) | 336×280 / resp   | 300×250    | 280px      | Sí   |
| `in-article-2` (tras párrafo 5) | 336×280          | 300×250    | 280px      | Sí   |
| `in-article-3` (tras párrafo 8) | 336×280          | 300×250    | 280px      | Sí   |
| `sidebar-sticky`                | 300×600          | —          | 600px      | Sí   |
| `multiplex-related`             | responsive       | responsive | 600px      | Sí   |
| `footer`                        | 970×90           | 320×50     | 90px       | Sí   |

### 7.2 Reglas in-article

- Mínimo 250 palabras entre slots.
- Nunca antes del primer párrafo.
- Nunca dentro de `<ul>`, `<ol>`, `<table>`, `<blockquote>`, embeds.
- Máximo 3 in-article por artículo.

### 7.3 Anti-CLS

Cada slot = `<div class="ad-slot">` con `min-height` CSS. AdSense inyecta dentro. Si no llena, transición suave de colapso (300ms).

### 7.4 Lazy loading

`IntersectionObserver` con `rootMargin: "200px 0px"`. Componente `<AdSlot>` usa `useVisibleTask$` (único lugar justificado).

### 7.5 Script AdSense

- `async crossorigin="anonymous"`.
- Inyectado tras LCP confirmado via `requestIdleCallback`.
- **NO va en Partytown** (necesita DOM para viewability).
- Preconnect a `pagead2.googlesyndication.com` y `googleads.g.doubleclick.net`.

### 7.6 Consent Mode v2 (obligatorio UE)

Cookie banner con rechazo granular. Google Consent Mode v2 antes de cargar AdSense. Sin consentimiento → "basic ads".

### 7.7 ads.txt

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

(Sustituir `pub-XXX` por el publisher ID real al recibir aprobación de AdSense.)

### 7.8 Fase AdSense mock

Durante desarrollo, usar placeholders visibles en los slots ("Ad Slot — 336×280") con `min-height` real. Solo activar script de AdSense cuando el dominio esté aprobado.

### 7.9 Trigger de migración

Al superar **100.000 PV/día durante 7 días consecutivos** → migrar a Google Ad Manager + Prebid.js.

---

## 8. TAXONOMÍA

### 8.1 Silos iniciales

```
actualidad/
  ├── politica
  ├── economia
  ├── sociedad
  └── internacional
tecnologia/
  ├── ia
  ├── gadgets
  ├── startups
  └── ciberseguridad
entretenimiento/
  ├── cine
  ├── series
  ├── musica
  └── famosos
virales/
deportes/
  ├── futbol
  ├── baloncesto
  └── motor
```

### 8.2 Related articles (algoritmo)

Prioridad:

1. Misma subcategoría + ≥2 tags compartidos
2. Mismo autor últimos 30 días
3. ≥2 tags compartidos
4. Trending en la categoría últimas 24h

Máx 6 sugerencias. Nunca repetir el artículo actual.

### 8.3 Internal linking

Cada artículo: 3–5 links internos contextuales (cuerpo, no sidebar) a artículos evergreen.

---

## 9. PLAN DE CONSTRUCCIÓN POR FASES

### Fase 0 — Setup (día 1)

- [ ] `npm create qwik@latest` con Tailwind
- [ ] TypeScript estricto
- [ ] ESLint + Prettier + Husky pre-commit
- [ ] Vitest + Playwright
- [ ] Estructura de carpetas (§4.1)
- [ ] GitHub Actions con lint + test + Lighthouse CI
- [ ] README.md con quick start

### Fase 1 — Modelo de contenido + mock data (días 2–3)

- [ ] Loader de Markdown con gray-matter + marked/remark
- [ ] Types TS para Article, Author, Category, Tag
- [ ] Script `scripts/seed-content.ts` genera 50 artículos mock
- [ ] Script genera 8 autores ficticios con bios realistas
- [ ] Script genera imágenes placeholder (picsum.photos o Unsplash API)
- [ ] Indexado estático en build para queries rápidas

### Fase 2 — Plantillas core (días 4–6)

- [ ] Layout global: header, footer, nav responsive
- [ ] Home (destacados + trending mock + grid por categoría)
- [ ] Plantilla artículo con breadcrumbs y related
- [ ] Plantilla categoría y subcategoría
- [ ] Plantilla autor
- [ ] Plantilla tag
- [ ] 404 y error pages
- [ ] Dark mode con cookie (no localStorage)

### Fase 3 — SEO técnico (días 7–8)

- [ ] Componente `<Seo>` reutilizable
- [ ] Componente `<JsonLd>` con tipos por schema
- [ ] Sitemap index + news + segmentados
- [ ] RSS feeds global y por categoría
- [ ] `robots.txt` dinámico
- [ ] Breadcrumbs con microdatos
- [ ] hreflang multi-locale (solo es-ES activa por ahora)
- [ ] Validación en CI con Schema.org validator

### Fase 4 — Performance (días 9–10)

- [ ] Componente `<SmartImage>` (AVIF/WebP/JPEG, srcset, LQIP)
- [ ] Fonts optimizadas con `size-adjust`
- [ ] Critical CSS inline
- [ ] Resource hints
- [ ] Service Worker (precache shell + stale-while-revalidate)
- [ ] Verificar Lighthouse ≥95 mobile SIN ads

### Fase 5 — Monetización (días 11–13)

- [ ] Componente `<AdSlot>` con lazy loading + IntersectionObserver
- [ ] Sistema de inserción in-article automática (parser de párrafos)
- [ ] Reservas anti-CLS CSS
- [ ] Placeholders visibles hasta aprobación de AdSense
- [ ] Partytown para analytics
- [ ] Cookie banner con Consent Mode v2
- [ ] `ads.txt`
- [ ] Verificar Lighthouse ≥95 mobile CON ads simulados

### Fase 6 — E-E-A-T y legales (día 14)

- [ ] Páginas legales (§5.4)
- [ ] Masthead (puede ser placeholder hasta lanzamiento)
- [ ] Sistema de correcciones (bloque en artículos editados)
- [ ] Política editorial pública
- [ ] Preparar materiales para Google News Publisher Center

### Fase 7 — Analytics, RUM (día 15)

- [ ] Cloudflare Web Analytics integrado
- [ ] Dashboard Core Web Vitals
- [ ] Eventos custom (scroll depth, newsletter signup futuro)

### Fase 8 — QA y deploy (días 16–17)

- [ ] axe-core en CI — 0 violations
- [ ] WCAG 2.2 AA manual audit
- [ ] Playwright E2E (home, artículo, búsqueda)
- [ ] Security headers (CSP, HSTS, X-Frame-Options)
- [ ] Deploy a Cloudflare Pages
- [ ] Verificar producción con PageSpeed real

### Fase 9 — Solicitud y aprobación AdSense (días 18–30)

- [ ] Generar 30-50 artículos de contenido real (con Claude y revisión humana al 100%) mientras esperamos la aprobación
- [ ] Solicitar AdSense al dominio
- [ ] Al aprobar: activar script real, sustituir placeholders
- [ ] Verificar Lighthouse con ads REALES ≥95

### ⏸ Fase 10+ — Post-lanzamiento

Se define cuando alcancemos Fase 9. Incluye: iteración por datos, optimización de slots por eCPM, y activación de §16 (pipeline editorial automatizado).

---

## 10. TESTING Y GATES

### 10.1 Comandos antes de cada commit

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

### 10.2 CI bloquea merge si

- Lighthouse Performance mobile < 95
- Lighthouse Accessibility < 100
- Lighthouse SEO < 100
- Lighthouse Best Practices < 95
- Violaciones axe-core
- Bundle inicial > 100KB
- Cobertura tests < 60% (fase 1–5), < 80% (fase 6+)

### 10.3 Tests E2E mínimos

- [ ] Home carga y muestra artículos
- [ ] Artículo renderiza con JSON-LD válido
- [ ] Breadcrumbs funcionan
- [ ] Búsqueda devuelve resultados
- [ ] Cookie banner funciona rechazo/aceptación
- [ ] Ads reservan espacio (no CLS) aunque no carguen

---

## 11. CONVENCIONES DE CÓDIGO

- Componentes PascalCase (`Article.tsx`), utils camelCase (`formatDate.ts`).
- Imports ordenados: builtin → external → internal → relative.
- Props con interfaces explícitas, sin `any`.
- Funciones puras en `src/lib/`, componentes en `src/components/`, rutas en `src/routes/`.
- Tests junto al archivo (`Article.test.tsx`).
- Commits en inglés, Conventional Commits.
- PRs describen fase avanzada + checklist cumplida.

---

## 12. VARIABLES DE ENTORNO

`.env.example`:

```
# Site
SITE_URL=https://crush.news
SITE_NAME=crush.news
DEFAULT_LOCALE=es-ES

# AdSense (rellenar al aprobar)
ADSENSE_CLIENT_ID=

# Analytics (rellenar al desplegar)
CLOUDFLARE_ANALYTICS_TOKEN=

# Imágenes placeholder (fase dev)
UNSPLASH_ACCESS_KEY=

# --- Fase 16 (placeholder, vacías por ahora) ---
OPENROUTER_API_KEY=
WEBSHARE_PROXY_USER=
WEBSHARE_PROXY_PASS=
REPLICATE_API_TOKEN=
```

Nunca commitear `.env`. Cloudflare Pages lee vars del dashboard.

---

## 13. BOT POLICY

`robots.txt`:

- ✅ Permitido: Googlebot, Googlebot-News, Googlebot-Image, Bingbot, DuckDuckBot.
- ❌ Bloqueado: GPTBot, ClaudeBot, CCBot, anthropic-ai, Google-Extended, PerplexityBot, Amazonbot.

Revisar trimestralmente.

---

## 14. ACCESIBILIDAD Y UX

- WCAG 2.2 AA obligatorio, `axe-core` en CI.
- Contraste ≥4.5:1 texto, ≥3:1 UI.
- Navegación por teclado completa, skip links, `aria-*` correctos.
- Dark mode via `prefers-color-scheme` + toggle persistente (cookie).
- Reading time visible, barra de progreso sutil.
- Botones de compartir nativos (`navigator.share`) con fallback a enlaces.

---

## 15. SEGURIDAD Y CUMPLIMIENTO

- **CSP** compatible con AdSense (directivas exactas para `script-src`, `frame-src`, `img-src` con dominios Google).
- HTTPS obligatorio, HSTS con preload, TLS 1.3.
- Cookie banner GDPR/LOPDGDD con rechazo granular, Consent Mode v2.
- Protección básica anti-scraping (rate limiting en edge).

---

## 16. CONTENT PIPELINE (⏸ PLACEHOLDER — NO IMPLEMENTAR TODAVÍA)

> Esta sección queda deliberadamente vacía.
>
> El pipeline editorial automatizado (descubrimiento con RSS/Reddit/HN/Currents/GNews + redacción con OpenRouter + imágenes con Unsplash/Wikimedia/IA generativa + proxies Webshare) se abordará en una iteración posterior con el owner.
>
> **Reglas provisionales:**
>
> - Durante Fase 0–8: usar contenido mock generado por `scripts/seed-content.ts`.
> - Durante Fase 9 (espera de AdSense): generar 30–50 artículos iniciales manualmente o con asistencia de IA con revisión humana al 100%.
> - No activar ningún pipeline automatizado hasta que esta sección esté definida con reglas concretas de discovery, redacción, citación y manejo de imágenes.
>
> **Presupuesto aproximado cuando se active: ~20€/mes.**
>
> **Si Claude Code recibe petición de construir pipeline editorial mientras esta sección siga en placeholder → DETENERSE y avisar al owner.**

---

## 17. CONTACTO DEL OWNER

Antes de tomar decisiones fuera de este documento, preguntar al owner. Decisiones ambiguas se resuelven por chat, no por commit.

---

## 18. ROADMAP POST-LANZAMIENTO (informativo)

- **Mes 2**: Activar §16 (pipeline editorial).
- **Mes 3**: Newsletter (Resend + D1).
- **Mes 4**: Sistema de comentarios.
- **Mes 6**: PWA con push notifications.
- **Mes 9**: Migración a CMS si volumen >1000 artículos.
- **Mes 12**: Evaluar GAM + Prebid.js (si >100k PV/día).
