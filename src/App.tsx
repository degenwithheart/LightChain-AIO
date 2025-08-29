import React, { useEffect, useState } from "react";
import { register, applyUpdate } from "./serviceworkerRegistration";

/**
 * Root App with production-ready SW update banner.
 */

export default function App(): JSX.Element {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    register();

    const onSwUpdated = (e: Event) => {
      try {
        const custom = e as CustomEvent<{ registration: ServiceWorkerRegistration }>;
        const registration = custom?.detail?.registration;
        if (registration) {
          setSwRegistration(registration);
          setUpdateAvailable(true);
        }
      } catch (err) {
        // non-critical
        // eslint-disable-next-line no-console
        console.warn("swUpdated event could not be processed", err);
      }
    };

    window.addEventListener("swUpdated", onSwUpdated as EventListener);
    return () => {
      window.removeEventListener("swUpdated", onSwUpdated as EventListener);
    };
  }, []);

  const handleApplyUpdate = async () => {
    if (!swRegistration) return;
    setIsApplying(true);
    try {
      await applyUpdate(swRegistration as any);
      window.location.reload();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to apply service worker update:", err);
      setIsApplying(false);
    }
  };

  const handleDismiss = () => {
    setUpdateAvailable(false);
    setSwRegistration(null);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <main style={{ flex: 1 }}>
        <h1 style={{ padding: "1.5rem" }}>Lightchain AIO</h1>
        {/* Your app content */}
      </main>

      {updateAvailable && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            left: 16,
            right: 16,
            bottom: 16,
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "linear-gradient(90deg,#111827,#0f172a)",
            color: "white",
            borderRadius: 8,
            boxShadow: "0 6px 18px rgba(2,6,23,0.4)",
            zIndex: 9999
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden>
              <path d="M12 5v7l5 3" />
              <path d="M12 3a9 9 0 100 18 9 9 0 000-18z" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div>
              <div style={{ fontWeight: 600 }}>New version available</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>Refresh to update to the latest version.</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleDismiss}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
                padding: "8px 12px",
                borderRadius: 6,
                cursor: "pointer"
              }}
              aria-label="Dismiss update notification"
            >
              Dismiss
            </button>

            <button
              onClick={handleApplyUpdate}
              disabled={isApplying}
              style={{
                background: "#06b6d4",
                border: "none",
                color: "#07203a",
                padding: "8px 12px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 700
              }}
              aria-label="Apply update and reload"
            >
              {isApplying ? "Updating…" : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
