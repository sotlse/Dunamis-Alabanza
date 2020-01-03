const cacheName = 'cache-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/script.js'
];

/*-------------------------LLAMAR PARA INSTALAR-------------------------*/
self.addEventListener('install',e => {
  console.log('Service Worker: Installed');
  // Perform install steps
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Opened cache');
        cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

/*-------------------------LLAMAR PARA ACTIVAR-------------------------*/
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  //var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
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


