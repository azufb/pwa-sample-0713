const cacheName = "pwa-sample-0713-v14";

// キャッシュするファイル
const appShellFiles = ["/", "index.html"];

// eslint-disable-next-line no-restricted-globals
const ignored = self.__WEB_MANIFEST;

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

this.self.addEventListener("message", (event) => {
  alert(event.data);
  console.log(event.data);
  this.self.registration.showNotification(event.data);
});
