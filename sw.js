const cacheName = 'cache-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/script.js'
];

/*-------------------------LLAMAR ELEMENTO INSTALAR-------------------------*/
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

/*-------------------------LLAMAR ELEMENTO ACTIVAR-------------------------*/
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  //Eliminar caches no deseados 
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

/*-------------------------LLAMAR ELEMENTO FETCH (para mostrar las paginas en offline)-------------------------*/
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.reques))
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



