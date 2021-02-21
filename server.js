// where your node app starts
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');
require('moment/locale/es-do');
const Datastore = require('nedb'),
db = new Datastore({ filename: '.data/datafile', autoload: true });
var CronJob = require('cron').CronJob;
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
var firebase = require("firebase/app");
// Add the Firebase products that you want to use
//require("firebase/auth");
require("firebase/messaging");
require("firebase/firestore");


module.exports = firebase;

const app = express();
//Contar cuantas subscripciones hay
db.count({}, function (err, count) {
  console.log(count);
});

//Quitar todos las subscripciones
//db.remove({}, { multi: true }, function (err, numRemoved) {});

console.log(moment().format('ddd LT'));

//Set static path
app.use(express.static(path.join(__dirname,'public')))
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.json());

/*---------------------VAPID KEYS-------------------------*/
//const applicationServerPublicKey = 'BCDkfgdZcsNUNSxXOBX8ttMcS9rpvV8WEoCmCrLV3cc4C9fFiyP3xsSzcjL3ngDLKMBH8B7vOmPl3QLxm2h1DME';
const applicationServerPublicKey = process.env.VAPID_KEY;
const applicationServerPrivateKey = '6gCSEeYVDAwtRTKHOs0hCYLzDvoUHykjQ0_X_V6oQ7c';

webpush.setVapidDetails('mailto:test@test.com',applicationServerPublicKey,applicationServerPrivateKey);

/*-----------------------Guardar subscripcion-------------------------*/
app.post('/save-subscription', (req, res) => {

  const isValidSaveRequest = (req, res) => {
  // Check the request body has at least an endpoint.
    if (!req.body || !req.body.endpoint) {
      // Not a valid subscription.
      res.status(400);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: {
          id: 'no-endpoint',
          message: 'Subscription must have an endpoint.'
        }
      }));
      return false;
    }
    return true;
  };

  return saveSubscriptionToDatabase(req.body)
  .then(function(subscriptionId) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ data: { success: true } }));
  })
  .catch(function(err) {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      error: {
        id: 'unable-to-save-subscription',
        message: 'The subscription was received but we were unable to save it to our database.'
      }
    }));
  });
});

/*------------------------Enviar a la base de datos NeDB la subscripcion-----------------------------*/
function saveSubscriptionToDatabase(subscription) {
  return new Promise(function(resolve, reject) {
    db.insert(subscription, (err, newDoc) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(newDoc._id);
    });
    //Saber cuantos usuarios estan suscritos
    console.log("Subscription Saved");
    db.count({}, function (err, count) {
      console.log(count);
    });
  });
};

/*----------------------Agarrar las subscripciones de la base de datos----------------------------*/
//(segundos[0-59] opcional, minutos[0-59], horas[0-23], dia del mes[1-31], mes[1-12], dia de la semana[0-6] donde 0 es domingo)
//Enviar notificacion los lunes y jueves a las 8:00 am ('00 08 * * 1,4')
//const NotificacionCantosDomingo = '03,15,25,27,35,40,42,56 7,8,9,11,15,18,19,20,21,22,23 * * 0,1,2,3,4,5,6';
const NotificacionCantosDomingo = '00 08 * * 1,4';
var job = new CronJob(NotificacionCantosDomingo, enviarTrigger, null, true, 'America/Monterrey');
job.start();
/*function enviarTrigger(){
  //Create payload
  const payload = JSON.stringify({ 
    title: 'I.B. Dunamis Adoracion',
    body:'Ve los cantos para el proximo Domingo',
  });
  db.find({}, (err,docs) => {
    let subscriptions = docs;
    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];
      console.log(subscription);
      webpush.sendNotification(subscription, payload).catch(err => console.error(err));
    }
  });
}*/

  /*return getSubscriptionsFromDatabase()


  .then(function(subscriptions) {
    let promiseChain = Promise.resolve();

    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];
      promiseChain = promiseChain.then(() => {
        return triggerPushMsg(subscription, dataToSend);
      });
    }

    return promiseChain;
  })

  

  const triggerPushMsg = function(subscription, payload) {
  return webpush.sendNotification(subscription, payload)
  .catch((err) => {
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log('Subscription has expired or is no longer valid: ', err);
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      throw err;
    }
  });
};
  */



/*--------------------------Enviar Trigger para la notificacion----------------------------------*/



/*
//Subscribe Route
add.post('/subscribe',(req,res) => {
  //Get pushSubscrition object
  const subscription = req.body;

  //Create payload
  const payload = JSON.stringify({ title: 'Prueba'});

  //Send 201 -Resourced created
  res.status(201).json({});

  //Pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});*/

/*----------------------Eliminar subcripcion de la base de tados-----------------------*/
/*app.post('/delete-subscription', (request, response) => {
    db.remove({endpoint:request.body.endpoint}, (err,docs) => {
      if(err) console.log("There's a problem with the database: ", err);
      else console.log("Subscription Deleted");
    });

    //Send 201 -Resourced created
    response.status(201).json({});
    //Saber cuantos usuarios estan suscritos
    db.count({}, function (err, count) {
      console.log(count);
    });
});*/


/*-------------------Escuchar puerto por el que se corre el servidor----------------------*/
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});


/*-------------------------------CUMPLEANOS---------------------------------- */
//Enviar felicitacion a las 8 de la manana
// HUSSEIM
const CumpleHus = '00 8 2 3 *';
var Husseim = new CronJob(CumpleHus, enviarTriggerCumple, null, true, 'America/Monterrey');
Husseim.start();

  // This registration token comes from the client FCM SDKs.
var registrationTokenHCE = 'fHrW7rlndWmRi3Ur-b1cDT:APA91bGUE4gYbIowUsEBS-_D0i0oSd2g0efWROY-GtIkK8EXNnaZVMnO8N0xjZELx-6stvOyBvhSzG8LXKFgb-MtRkUdxxojecJqxYHsugk8JHnC8bluNsbR7c3ufvVPcty24S5EQdXL';

var cumple = {
  data: {
    title:'Feliz Cumpleanos',
    body:'La I.B. Dunamis te desea un ano lleno de bendiciones'
  },
  token: registrationTokenHCE
};

function enviarTriggerCumple(){
  admin.messaging().send(cumple)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });  
}

/*--------------------------------FIREBASE----------------------------------------*/
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dunamis-6affc-default-rtdb.firebaseio.com"
});

var firebaseConfig = {
  //apiKey: "AIzaSyAwILbPRKHcMyf_bxJKm1BDpFutlhU-P10",
  apiKey: process.env.API_KEY,
  authDomain: "dunamis-6affc.firebaseapp.com",
  projectId: "dunamis-6affc",
  storageBucket: "dunamis-6affc.appspot.com",
  messagingSenderId: "545249031636",
  appId: "1:545249031636:web:a0e35ca1bdc6aaad4f9241",
  measurementId: "G-0WXQ8DMC8H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var dbf = firebase.firestore();
//firebase.analytics();
      
      
//--------------Cloud Messaging

// These registration tokens come from the client FCM SDKs.
const registrationTokens = [
  'fHrW7rlndWmRi3Ur-b1cDT:APA91bGUE4gYbIowUsEBS-_D0i0oSd2g0efWROY-GtIkK8EXNnaZVMnO8N0xjZELx-6stvOyBvhSzG8LXKFgb-MtRkUdxxojecJqxYHsugk8JHnC8bluNsbR7c3ufvVPcty24S5EQdXL',
  'dSPdHLTjkDDbpr8kdctU_O:APA91bHVzAJddkNqnuKcC5Kx_b2xM7zotIexCe3p3WbVSmmTdHXE3TTEZ9G0-N0USlwkXDHQ2cs6ZnX94bDy3E2JjJ3e2rAu87NfPb-WMOZjLolyS5CKb2WkYGXEpV2aon_dgPcmYquC',
  // …
  //'YOUR_REGISTRATION_TOKEN_N',
];

const message = {
  data: {
    title: 'I.B. Dunamis Adoracion',
    body:'Ve los cantos para el proximo Domingo'
  },
  tokens: registrationTokens,
}

console.log(message);

function enviarTrigger(){
admin.messaging().sendMulticast(message)
  .then((response) => {
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(registrationTokens[idx]);
        }
      });
      console.log('List of tokens that caused failures: ' + failedTokens);
    }
  });
}

// [START initialize_persistence]
      firebase.firestore().enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
      // Subsequent queries will use persistence, if it was enabled successfully
      // [END initialize_persistence]