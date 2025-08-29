import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as serviceWorkerRegistration from "./serviceworkerRegistration";
import "./i18n";

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// Register service worker (registration helper registers only in production)
serviceWorkerRegistration.register();
