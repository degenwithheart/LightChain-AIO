import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as serviceWorkerRegistration from "./serviceworkerRegistration";
import "./i18n"; // Import i18n configuration

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Register the service worker for PWA functionality
serviceWorkerRegistration.register();