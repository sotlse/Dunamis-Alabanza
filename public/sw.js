const cacheName = 'cache-v1';
const home = "https://" + location.hostname;
const calendario = home + '/html/Calendario.html';

/*-------------------------LLAMAR ELEMENTO INSTALAR-------------------------*/
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
});

/*-------------------------LLAMAR ELEMENTO ACTIVAR-------------------------*/
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
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
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cahce
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});


/*------------------------- Push notifications -------------------------*/
self.addEventListener('push', function(event) {
  console.log(event);
  let datas;
  if (event.data){
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    datas = event.data.json();
  }
  else {
    console.log('[Service Worker] Push had NO data');
    return false
  }
  
  const options = {
    //body: 'Ve los cantos del proximo Domingo',
    body: datas.body,
    icon: 'https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Ficon-384x384.png?v=1578025595291',
    vibrate: [170, 100, 170],
    badge: 'https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Fdove-solid.png?v=1580572378350',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    //actions: datas.actions
  };

  event.waitUntil(self.registration.showNotification(datas.title, options));
});

/*--------------------------- Click en notificaciones -----------------------------*/
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow(calendario)
  );
});

