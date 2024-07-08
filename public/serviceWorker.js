const cacheName = "pwa-sample-0713-v19";

// キャッシュするファイル
const appShellFiles = ["/", "index.html"];

this.self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");

  // 以下のコードが実行されるまでインストールされない
  event.waitUntil(
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

this.self.addEventListener("message", (event) => {
  this.self.registration.showNotification(event.data);
});
