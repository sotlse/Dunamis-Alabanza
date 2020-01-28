const cacheName = 'cache-v1';
const home = "https://dunamis-alabanza.glitch.me/";
/*const urlsToCache = [
  '/',
  '/style.css',
  '/script.js'
];*/

/*-------------------------LLAMAR ELEMENTO INSTALAR-------------------------*/
self.addEventListener('install',e => {
  console.log('Service Worker: Installed');
  // Perform install steps
  /*e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Opened cache');
        cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );*/
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
    fetch(e.request)
    .then(res => {
      //Make copy/clone of response
      const respClone = res.clone();
      //Open cache
      caches.open(cacheName)
        .then(cache => {
          //Add response to cache
          cache.put(e.request, respClone);
        });
      return res;
    }).catch(err => caches.match(e.request).then(res => res))
  );
  //e.respondWith(fetch(e.request).catch(() => caches.match(e.request))
      /*.then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })*/
});


/*------------------------- Push notifications -------------------------*/
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Dunamis Alabanza';
  const options = {
    body: 'Cantos del proximo Domingo',
    icon: 'https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Ficon-384x384.png?v=1578025595291',
    vibrate: [100, 50, 100],
    badge: 'https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Fdove-solid.svg?v=1580176051238'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/*--------------------------- Click en notificaciones -----------------------------*/
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow(home)
  );
});

