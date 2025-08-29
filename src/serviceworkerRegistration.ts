// Lightweight service worker registration helper with improved lifecycle logging and update detection.
// This file replaces the default serviceworkerRegistration implementation if you want the minimal custom SW above.
// It registers /service-worker.js placed in public root or built output.

export function register() {
  if ("serviceWorker" in navigator) {
    const swUrl = `${process.env.PUBLIC_URL || ""}/service-worker.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.info("ServiceWorker registered:", registration.scope);

        registration.onupdatefound = () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.onstatechange = () => {
            if (installing.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New content is available; you can show a toast to the user to refresh.
                console.info("New content is available; please refresh.");
              } else {
                // Content cached for offline use.
                console.info("Content cached for offline use.");
              }
            }
          };
        };
      })
      .catch((error) => {
        console.warn("ServiceWorker registration failed:", error);
      });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
  }
}
