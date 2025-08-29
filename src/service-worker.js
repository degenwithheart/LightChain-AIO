// Minimal service worker for caching static assets and a network-first strategy for API requests.
// This is intentionally small and safe — extend with Workbox or more advanced strategies if needed.
const CACHE_NAME = "lightchain-aio-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  // add additional static assets if you have pre-known assets, fonts, images, etc.
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // ignore failures (some hosts block addAll)
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Network-first for API calls (adjust path as needed)
  if (url.pathname.startsWith("/api") || url.pathname.includes("/rpc/")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Optionally cache API responses here (careful with dynamic data)
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || new Response(null, { status: 503 }))
        )
    );
    return;
  }

  // Cache-first for other resources (static)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // cache the new resource
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, copy);
          });
          return res;
        })
        .catch(() => {
          // fallback to index.html for navigation requests (SPA)
          if (req.mode === "navigate") {
            return caches.match("/index.html");
          }
          return new Response(null, { status: 503 });
        });
    })
  );
});service-worker.js
