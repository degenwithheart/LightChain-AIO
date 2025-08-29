/**
 * Production-ready service worker registration for Workbox-generated service-worker.js
 * - Registers service-worker.js in production
 * - Dispatches 'swUpdated' event when a new SW is installed (registration provided in event.detail)
 * - Provides applyUpdate(reg) helper to skipWaiting and await controllerchange
 */
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/
    )
);

type RegistrationWithWaiting = ServiceWorkerRegistration & { waiting?: ServiceWorker | null };

export function register() {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    const swUrl = `${process.env.PUBLIC_URL || ""}/service-worker.js`;

    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register(swUrl);
        // Listen for updatefound to detect new SW installation
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New content is available; emit event with registration
                window.dispatchEvent(new CustomEvent("swUpdated", { detail: { registration } }));
              } else {
                // Content cached for offline use
                window.dispatchEvent(new Event("swCached"));
              }
            }
          });
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Service worker registration failed:", err);
      }
    });
  }
}

/**
 * Send SKIP_WAITING to the waiting service worker and wait for controllerchange.
 * Resolve once the new service worker controls the page.
 */
export async function applyUpdate(registration: RegistrationWithWaiting | null) {
  if (!registration || !registration.waiting) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const waiting = registration.waiting;
    if (!waiting) {
      resolve();
      return;
    }

    function onControllerChange() {
      window.removeEventListener("controllerchange", onControllerChange);
      resolve();
    }

    window.addEventListener("controllerchange", onControllerChange);

    // Ask the waiting SW to skip waiting
    waiting.postMessage({ type: "SKIP_WAITING" });

    // Fallback: timeout if controllerchange doesn't fire within 10s
    setTimeout(() => {
      window.removeEventListener("controllerchange", onControllerChange);
      resolve();
    }, 10000);
  });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    });
  }
}
