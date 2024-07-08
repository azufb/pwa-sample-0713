const cacheName = "pwa-sample-0713-v18";

// キャッシュするファイル
const appShellFiles = ["/", "index.html"];

this.window.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");

  // 以下のコードが実行されるまでインストールされない
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(appShellFiles);
    })
  );
});

this.window.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response ? response : fetch(event.request);
    })
  );
});

this.window.addEventListener("message", (event) => {
  this.window.registration.showNotification(event.data);
});
