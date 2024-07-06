const cacheName = "pwa-sample-0713-v10";

// キャッシュするファイル
const appShellFiles = [
  "index.html",
  "index.tsx",
  "App.tsx",
  "index.css",
  "**.png",
];

this.self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");

  // 以下のコードが実行されるまでインストールされない
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(appShellFiles);
    })
  );
});

this.self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response ? response : fetch(event.request);
    })
  );
});

// this.self.addEventListener("push", (event) => {
//   console.log(event.data);
//   const payload = event.data ? event.data.text() : "no payload";

//   event.waitUntil(
//     this.self.registration.showNotification("push notification", {
//       body: payload,
//     })
//   );
// });
