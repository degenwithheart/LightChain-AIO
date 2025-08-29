/* Workbox source service worker - injectManifest will add precache manifest */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// eslint-disable-next-line no-undef
precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.destination === 'image' || request.destination === 'font',
  new CacheFirst({ cacheName: 'static-media-v1', plugins: [ new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 24 * 60 * 60 }) ] })
);

registerRoute(
  ({ url }) => url.pathname.startsWith('/api') || url.pathname.includes('/rpc') || url.hostname.includes('api.'),
  new NetworkFirst({ cacheName: 'api-cache-v1', networkTimeoutSeconds: 3, plugins: [ new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 5 * 60 }) ] })
);

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({ cacheName: 'static-resources-v1' })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
