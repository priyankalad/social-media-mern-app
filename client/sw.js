const staticCache = "staticCacheV1";
const dynamicCache = "dynamicCacheV1";
const assets = [
  "/login",
  "/css/bootstrap.min.css",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://code.jquery.com/jquery-3.2.1.slim.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js",
  "/manifest.json",
  "/favicon.ico",
  "/static/js/bundle.js",
  "/static/js/0.chunk.js",
  "/static/js/main.chunk.js",
  "/fallback",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size)
        cache.delete(keys[0]).then(limitCacheSize(name, size));
    });
  });
};

//install service worker
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCache).then((cache) => {
      console.log("caching assets");
      cache.addAll(assets);
    })
  );
  // console.log("service worker has been installed")
});

//activate service worker
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//fetch events with dynamic cache
// self.addEventListener("fetch", evt => {
//   evt.respondWith(
//     caches
//       .match(evt.request)
//       .then(cacheRes => {
//         return (
//           cacheRes ||
//           fetch(evt.request).then(fetchRes => {
//             return caches.open(dynamicCache).then(cache => {
//               cache.put(evt.request, fetchRes.clone());
//               limitCacheSize(dynamicCache, 10);
//               return fetchRes;
//             });
//           })
//         );
//       })
//       .catch(() => {
//         console.log("rendering fallback page");
//         caches.match("/fallback");
//       })
//   );
// });

//fetch events without dynamic cache
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return cacheRes || fetch(evt.request);
      })
      .catch(() => {
        console.log("rendering fallback page");
        caches.match("/fallback");
      })
  );
});
