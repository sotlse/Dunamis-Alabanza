var CACHE_NAME = 'cache-v1';
var urlsToCache = [
  '/',
  '/style.css',
  '/script.js'
];

/*-------------------------LLAMAR PARA INSTALAR-------------------------*/
self.addEventListener('install',e => {
  console.log('Service Worker: Installed');
  // Perform install steps
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

/*-------------------------LLAMAR PARA ACTIVAR-------------------------*/
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
*/


