const SHELL_CACHE = "crush-shell-v1";
const IMG_CACHE = "crush-images-v1";
const FONT_CACHE = "crush-fonts-v1";

const SHELL_ASSETS = ["/", "/favicon.svg", "/manifest.json"];

// Cache-first for fonts and immutable assets
self.addEventListener("fetch", (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Only handle same-origin + picsum (images)
  if (request.method !== "GET") return;

  // Fonts — cache-first (long-lived)
  if (url.hostname === self.location.hostname && request.destination === "font") {
    e.respondWith(cacheFirst(FONT_CACHE, request));
    return;
  }

  // Static assets with hash (JS/CSS) — cache-first
  if (
    url.hostname === self.location.hostname &&
    (request.destination === "script" || request.destination === "style") &&
    /\.[a-f0-9]{8,}\.(js|css)$/.test(url.pathname)
  ) {
    e.respondWith(cacheFirst(SHELL_CACHE, request));
    return;
  }

  // Images — stale-while-revalidate
  if (request.destination === "image") {
    e.respondWith(staleWhileRevalidate(IMG_CACHE, request));
    return;
  }

  // HTML navigation — network-first, fall back to cache
  if (request.mode === "navigate") {
    e.respondWith(networkFirst(SHELL_CACHE, request));
    return;
  }
});

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== SHELL_CACHE && k !== IMG_CACHE && k !== FONT_CACHE)
            .map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

async function cacheFirst(cacheName, request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(cacheName, request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  });
  return cached ?? fetchPromise;
}

async function networkFirst(cacheName, request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) ?? Response.error();
  }
}
