//importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
//importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
//importScripts('/js/firebase-app.js');
//importScripts('/js/firebase-messaging.js');

importScripts('/__/firebase/8.2.1/firebase-app.js');
importScripts('/__/firebase/8.2.1/firebase-messaging.js');
importScripts('/__/firebase/init.js');

/*var firebaseConfig = {
  apiKey: "AIzaSyAwILbPRKHcMyf_bxJKm1BDpFutlhU-P10",
  authDomain: "dunamis-6affc.firebaseapp.com",
  projectId: "dunamis-6affc",
  storageBucket: "dunamis-6affc.appspot.com",
  messagingSenderId: "545249031636",
  appId: "1:545249031636:web:a0e35ca1bdc6aaad4f9241",
  measurementId: "G-0WXQ8DMC8H"
};*/

//firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload.data);
  console.log(payload.data.title);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: 'https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Ficon-384x384.png?v=1578025595291',
    vibrate: [170, 100, 170],
    badge: 'https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Fdove-solid.png?v=1580572378350'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});