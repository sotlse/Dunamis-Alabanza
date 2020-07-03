const cacheName = 'cache-v1';
const home = "https://" + location.hostname;
const calendario = home + '/html/calendario.html';

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
/*self.addEventListener('fetch', e => {
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
});*/
self.addEventListener('fetch', event => {
  //if (event.request.mode === 'navigate') {
  if (event.request.method === 'GET'){
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    //console.log(event.request.method);
    event.respondWith(async function() {
      console.log('Service Worker: Fetching');
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      console.log(normalizedUrl);

      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open(cacheName);
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
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



/*-------------------------Expiracion de usuario-------------------------------*/
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe({ userVisibleOnly: true })
    .then(function(subscription) {
      console.log('Subscribed after expiration', subscription);
      return fetch('/save-subscription', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(subscription
          /*{
          //endpoint: subscription.endpoint
        }*/)
      });
    })
  );
});



/*------------------POSIBLE REEMPLAZO?----------------------------- */


/*-------------------------LLAMAR ELEMENTO FETCH (para mostrar las paginas en offline)-------------------------*/
/*self.addEventListener('fetch', e => {
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
});*/


