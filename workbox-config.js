/**
 * Workbox injectManifest config for production builds.
 * After `react-scripts build` the `postbuild` script runs:
 *   workbox injectManifest workbox-config.js
 *
 * This injects the precache manifest into src/sw-src.js and writes build/service-worker.js
 */
module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{html,js,css,svg,png,jpg,json,woff2,woff,ttf,ico,map}"],
  swSrc: "src/sw-src.js",
  swDest: "build/service-worker.js",
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  modifyURLPrefix: {
    "": ""
  }
};
