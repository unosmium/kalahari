self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('kalahri-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.svg',
        '/global.css',
        '/kalahari.webmanifest',
        '/build/bundle.css',
        '/build/bundle.js',
        '/build/sciolyff-web.wasm'
      ]);
    })
  )
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
