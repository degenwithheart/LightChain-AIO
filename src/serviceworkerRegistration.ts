/**
 * Production-ready SW registration (works with Workbox injectManifest output).
 * Dispatches "swUpdated" event with { registration } when a new SW is installed and waiting.
 */
type RegistrationWithWaiting = ServiceWorkerRegistration & { waiting?: ServiceWorker | null };

export function register() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    const swUrl = `${process.env.PUBLIC_URL || ''}/service-worker.js`;
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register(swUrl);
        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                window.dispatchEvent(new CustomEvent('swUpdated', { detail: { registration } }));
              } else {
                window.dispatchEvent(new Event('swCached'));
              }
            }
          });
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Service worker registration failed:', err);
      }
    });
  }
}

export async function applyUpdate(registration: RegistrationWithWaiting | null) {
  if (!registration || !registration.waiting) return;
  return new Promise<void>((resolve) => {
    const waiting = registration.waiting;
    const onControllerChange = () => {
      window.removeEventListener('controllerchange', onControllerChange);
      resolve();
    };
    window.addEventListener('controllerchange', onControllerChange);
    waiting.postMessage({ type: 'SKIP_WAITING' });
    setTimeout(() => {
      window.removeEventListener('controllerchange', onControllerChange);
      resolve();
    }, 10000);
  });
}
