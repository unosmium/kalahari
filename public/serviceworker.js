const version = '0.1.1';
const cacheKey = `kalahari-v${version}`;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    let cache = await caches.open(cacheKey);
    cache.addAll([
      '/',
      '/index.html',
      '/favicon.svg',
      '/global.css',
      '/kalahari.webmanifest',
      '/build/bundle.css',
      '/build/bundle.js',
      '/build/sciolyff-web.wasm'
    ]);
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (let key of await caches.keys()) {
      if (key !== cacheKey) {
        caches.delete(key);
      }
    }
  })());
});

self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    return await caches.match(e.request) || fetch(e.request);
  })());
});
