const CACHE_NAME = "pwa-cache-v1"; // Name of your cache
const urlsToCache = [
  "/",             // Main page
  "/index.html",   // Your HTML
  "/icon.png",    // Your CSS
  "/qrcode.jpeg",    // Your JavaScript
  "/WuerthBook.tff",     // Your app icon
  "/WuerthBook.woff",
];

// Install the service worker and cache the specified resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resources from the cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request); // Use cache or fallback to network
    })
  );
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.log("Service Worker registration failed:", error);
    });
}
