# Lightchain AIO

Production-ready starter for a blockchain explorer + AI assistant + token launchpad.

Install:
  npm ci
  npm start   # development
  npm run build  # production build (postbuild will run workbox injectManifest if available)

Environment:
  Copy `.env.example` -> `.env.local` and fill REACT_APP_RPC_URL and REACT_APP_AI_ENDPOINT.

Service Worker:
  postbuild runs `workbox injectManifest workbox-config.js` to generate a production service-worker.js in `build/`.

License: MIT

If this platform is useful to you or your team, consider supporting the builder:
SOL: **4U3kLekCh53rXxxQE3hSbqoKKLzZpLYYZRTc26R8mnGe**
Tips help keep LightChain-AIO open and evolving!
