// server.js


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
// http://expressjs.com/en/starter/static-files.html
//app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.json());

/*---------------------VAPID KEYS-------------------------*/
const applicationServerPublicKey = 'BCDkfgdZcsNUNSxXOBX8ttMcS9rpvV8WEoCmCrLV3cc4C9fFiyP3xsSzcjL3ngDLKMBH8B7vOmPl3QLxm2h1DME';
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
  });
};

/*----------------------Agarrar las subscripciones de la base de datos----------------------------*/
//(segundos[0-59] opcional, minutos[0-59], horas[0-23], dia del mes[1-31], mes[1-12], dia de la semana[0-6] donde 0 es domingo)
//Enviar notificacion los lunes y jueves a las 8:00 am ('00 08 * * 1,4')
const NotificacionCantosDomingo = '03,15,25,27,34,30,42,56 7,8,9,11,15,18,19,20,23 * * 3,4,5,6';
//const NotificacionCantosDomingo = new CronTime('10,25,30,52 8,9,11,15 * * 5,6');
var job = new CronJob(NotificacionCantosDomingo, enviarTrigger, null, true, 'America/Monterrey');
job.start();
function enviarTrigger(){
  //Create payload
  const payload = JSON.stringify({ 
    title: 'I.B. Dunamis',
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
}


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
app.post('/delete-subscription', (request, response) => {
    db.remove({endpoint:request.body.endpoint}, (err,docs) => {
      if(err) console.log("There's a problem with the database: ", err);
      else console.log("Subscription Deleted");
    });
});


/*-------------------Escuchar puerto por el que se corre el servidor----------------------*/
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

/*const port = 80;
app.listen(port, () => console.log(`Server started on port ${port}`))*/


/*-------------------------------CUMPLEANOS---------------------------------- */
//Enviar felicitacion a las 8 de la manana
const CumpleHus = '00 8 2 3 *';
var Husseim = new CronJob(CumpleHus, enviarTriggerHCE, null, true, 'America/Monterrey');
Husseim.start();
function enviarTriggerHCE(){
  //Create payload
  const payload = JSON.stringify({ 
    title:'Feliz Cumpleanos',
    body:'La I.B. Dunamis te desea un ano lleno de bendiciones',
  });
  db.find({}, (err,docs) => {
    let subscriptions = docs;
    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];
      console.log(subscription);
      webpush.sendNotification(subscription, payload).catch(err => console.error(err));
    }
  });
}