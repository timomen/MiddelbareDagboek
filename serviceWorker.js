const staticPwa = "PWA-APP-SITE"
const assets = [
    "/",
    "/index.html",
    "/images/TypfoutLogo.jpg"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticPwa).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}