const staticPwa = "PWA-APP-SITE";
const assets = [
  "/",
  "/index.html",
  "/icon.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPwa).then(cache => {
      console.log("Caching assets:", assets);  // Add logging to see if caching is successful
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("Service worker registered"))
      .catch(err => console.error("Service worker not registered:", err));
  });
}
