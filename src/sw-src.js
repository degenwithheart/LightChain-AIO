/* Production Workbox source service worker.
   Used with workbox-build injectManifest to create build/service-worker.js.
   Precaching is injected into self.__WB_MANIFEST by workbox.
*/
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// Precache manifest will be injected by workbox-build's injectManifest
// eslint-disable-next-line no-undef
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache-first for images and fonts
registerRoute(
  ({ request }) => request.destination === "image" || request.destination === "font",
  new CacheFirst({
    cacheName: "static-media-v1",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 24 * 60 * 60 // 60 days
      })
    ]
  })
);

// Network-first for API/RPC endpoints (short timeout)
registerRoute(
  ({ url }) => url.pathname.startsWith("/api") || url.pathname.includes("/rpc") || url.hostname.includes("api."),
  new NetworkFirst({
    cacheName: "api-cache-v1",
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60 // 5 minutes
      })
    ]
  })
);

// Stale-while-revalidate for JS/CSS to give fast response while updating in background
registerRoute(
  ({ request }) => request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources-v1"
  })
);

// SPA navigation fallback: respond with precached index.html
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("index.html").then((resp) => resp || fetch(event.request).catch(() => caches.match("index.html")))
    );
  }
});

// Listen for SKIP_WAITING messages to activate immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
