module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{html,js,css,svg,png,jpg,json,woff2,woff,ttf,ico,map}'
  ],
  swSrc: 'src/sw-src.js',
  swDest: 'build/service-worker.js',
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
};
