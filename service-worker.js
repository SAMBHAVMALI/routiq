const CACHE_NAME = "Routiq-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        "/Routiq/",
        "/Routiq/index.html",
        "/Routiq/style.css",
        "/Routiq/app.js",
        "/Routiq/manifest.json",
        "/Routiq/icon-192.png",
        "/Routiq/icon-512.png"
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
