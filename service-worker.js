const CACHE_NAME = "routiq-app-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        "/routiq-app/",
        "/routiq-app/index.html",
        "/routiq-app/style.css",
        "/routiq-app/app.js",
        "/routiq-app/manifest.json",
        "/routiq-app/icon-192.png",
        "/routiq-app/icon-512.png"
      ])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (response) => response || fetch(event.request)
    )
  );
});
