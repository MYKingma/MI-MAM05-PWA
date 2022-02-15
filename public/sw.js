import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
// import { StaleWhileRevalidate } from "workbox-strategies";
// import { ExpirationPlugin } from "workbox-expiration";
// import { CacheableResponsePlugin } from "workbox-cacheable-response";

precacheAndRoute(self.__WB_MANIFEST);
console.log("Hello from service worker");

// cache image and render from the cache if it exists or go t the network
// registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, console.log("HOI"));
// /.*\.(?:png|jpg|jpeg|svg|gif)/,
// new StaleWhileRevalidate({
//   cacheName: "images",
//   plugins: [
//     new CacheableResponsePlugin({
//       statuses: [0, 200],
//     }),
//     new ExpirationPlugin({
//       maxEntries: 60,
//       maxAgeSeconds: 2 * 24 * 60 * 60, // cache the images for only 2 Days
//     }),
//   ],
// })

registerRoute(
  ({ url }) => url.hostname.includes("firebase"),
  console.log("Binnen")
);
