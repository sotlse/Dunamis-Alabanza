/*--VARIABLES--*/
//const home = "https://dunamis-alabanza.glitch.me/";
const home = "https://" + location.hostname;
const applicationServerPublicKey = 'BCDkfgdZcsNUNSxXOBX8ttMcS9rpvV8WEoCmCrLV3cc4C9fFiyP3xsSzcjL3ngDLKMBH8B7vOmPl3QLxm2h1DME';
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");
//Botones avanzar y regresar
let botonRegresar = document.querySelector(".arrowRegresar");
let botonAvanzar = document.querySelector(".arrowAvanzar");
let botonRegresar2 = document.querySelector(".arrowRegresar2");
let botonAvanzar2 = document.querySelector(".arrowAvanzar2");
//
let cantoBody = document.querySelector(".canto_body");
let letraBody = document.querySelector(".letra_body")
let tituloTexto = document.querySelector('title').textContent;
let contenidoCanto = document.querySelector(".contenido");
let tituloCanto = document.querySelector(".tituloDelCanto");
let slur = document.querySelector(".slur");
let cancionesDomingo = [];
let cancionesMiercoles = [];
let link;
let tipo;
let totalCantos=300;
//Para paginas info
let ulSubtemasInfo = document.querySelector("#opcionesDeCanto");
//Botones para configuracion de cantos
let botonAudio = document.querySelector(".botonAudio");
//ar = document.querySelector(".botonTransportar");
let botonTextoChico = document.querySelector(".botonTextoChico");
let botonTextoGrande = document.querySelector(".botonTextoGrande");
let botonMostrarAcordes = document.querySelector(".botonMostrarAcorde");
let botonCasa = document.querySelector(".botonCasa");
//Rotacion de pantalla
var current_mode = screen.orientation;
//Tamano de letra
let tamano;
//Push notifications & Service Worker
let pushButton;
let isSubscribed = false;
let swRegistration = null;
//Pagina configuracion
const slideButton = document.querySelector("#botonSlide");
const slideLabel = document.querySelector(".labelNotificaciones");

/*-------------------------------MOSTRAR ERROR EN ALERT----------------------------------*/
window.onerror = function(msg, url, linenumber) {
  alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;
}


/*-------------------------------REGISTRO DE SERVICE WORKER----------------------------------*/
/*if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/js/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}*/
if(tituloTexto === "Configuracion"){
  pushButton = document.querySelector("#pushNotificationBtn");
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');
  //alert('Service Worker and Push is supported');

  //window.addEventListener('load', function() {
    send().catch(err => console.error(err));  

    /*navigator.serviceWorker.register('/sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      initializeUI();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
      alert('Service Worker Error');
    });*/
  //});
} 
else {
  console.warn('Push messaging is not supported');
  if(tituloTexto === "Configuracion"){
    alert('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }
}

//Registrar SW, Registrar Push y Enviar Push
async function send(){
  //Registrar Service Worker
  console.log('Registrando Service Worker...');
  const swRegistration = await navigator.serviceWorker.register('/sw.js');
  console.log('Service Worker registrado', swRegistration);
  if(tituloTexto === "Configuracion"){

    // Set the initial subscription value
    let subscription = await swRegistration.pushManager.getSubscription()
    console.log("La subscripcion es: " + JSON.stringify(subscription));
    isSubscribed = !(subscription === null);
    console.log(isSubscribed);
    if (isSubscribed) {
      console.log('Usuario SUSCRITO.');
    } 
    else {
      console.log('Usuario NO suscrito.');
    }
    updateBtn();

    //Si se presiona el boton
    //pushButton.addEventListener('click', async function() {
    slideButton.addEventListener('click', async function() {
      //pushButton.disabled = true;
      slideButton.disabled = false;
      console.log(isSubscribed);
      if (isSubscribed) {
        //Desinscribir usuario
        let subscription = await swRegistration.pushManager.getSubscription()
        console.log('Desinscribiendo al usuario: ',JSON.stringify(subscription))
        const label = await subscription.unsubscribe();
        console.log(label);
        const response = await fetch('/delete-subscription',{
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json'
          }
        });
        let commits = await response.json(); 
        isSubscribed = false;
        console.log('Usuario NO suscrito....')
        updateBtn();
      } 
      else {
        //Registrar Push
        console.log('Registrando Usuario...');
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
        });
        console.log('Usuario registrado y suscrito');

        //Enviar Push
        console.log('Enviando Suscripcion...');
        const response = await fetch('/save-subscription',{
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json'
          }
        });
        let commits = await response.json(); 
        isSubscribed = true;
        console.log('Suscripcion guardada :)')
        updateBtn();
      }
    });
  }
} 

/*
function initializeUI() {
  if(tituloTexto === "Configuracion"){
    pushButton.addEventListener('click', function() {
      pushButton.disabled = true;
      if (isSubscribed) {
        unsubscribeUser();
      } else {
        subscribeUser();
      }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
        subscribeUser();
      }

      updateBtn();
    });
  }
}
*/
function updateBtn() {
  console.log(Notification.permission);
  if (Notification.permission === 'denied') {
    //pushButton.textContent = 'Push Messaging Bloqueado';
    //pushButton.disabled = true;
    //updateSubscriptionOnServer(null);
    slideLabel.innerHTML = 'Notificaciones Bloqueadas';
    slideButton.disabled = true;
    return;
  }

  if (isSubscribed) {
    //pushButton.textContent = 'Deshabilitar Push Messaging';
    slideLabel.innerHTML = 'Notificaciones Habilitadas';
    slideButton.checked = true;
  } else {
    //pushButton.textContent = 'Habilitar Push Messaging';
    slideLabel.innerHTML = 'Notificaciones Deshabilitadas';
    slideButton.checked = false;
  }

  //pushButton.disabled = false;
}
/*
slideButton.onclick = function (){
  console.log(slideButton.checked);
}*/

/*navigator.serviceWorker.register('/js/sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initializeUI();
})*/
/*
//Suscribir usuario
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:',subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}*/

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
/*
function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      // TODO: Tell application server to delete subscription
      fetch('/delete-subscription',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Bad status code from server.');
        }
        return response.json();
      })
      .then(function(responseData) {
        if (!(responseData.data && responseData.data.success)) {
          throw new Error('Bad response from server.');
        }
      });
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    //updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server
  console.log(JSON.stringify(subscription));
  
  return fetch('/save-subscription',{
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }
    return response.json();
  })
  .then(function(responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server.');
    }
  });
  
}
*/

/*-------------------------------NOTIFICACIONES----------------------------------*/
//Preguntar si pueden mostrar notificaciones (no compatible con IOS)
/*Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});*/

/*
displayNotification();

//Mostrar notificacion
function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Ficon-384x384.png?v=1578025595291',
        badge: 'https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Fdove-solid.png?v=1580572378350',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}
*/

/*-------------------------------ROTACION DE PANTALLA---------------------------*/
if (cantoBody)
{
  //alert(current_mode.type);
  //alert(screen.orientation.type);
  //alert(window.orientation);
  //Para dispositivos Android
  /*if (current_mode.type=="portrait-primary" || current_mode.type=="portrait-secondary"){
    //console.log(current_mode);
    cantoBody.style.columnCount= "1";
  }
  
  else if (current_mode.type=="landscape-primary" || current_mode.type=="landscape-secondary"){
    //console.log(current_mode);
    cantoBody.style.columnCount="2";
  }*/

  /*
  function doOnOrientationChange() {
    //Para dispositivos moviles (IOS y Android)
    if (window.orientation != undefined){
      switch(window.orientation) {  
        case -90: case 90:
          cantoBody.style.columnCount= "2";
          break; 
        default:
          cantoBody.style.columnCount= "1";
          break; 
      }
    }
    //Para laptops
    else {
      alert("Es una lap");
      
    }
  }
    
  window.addEventListener('orientationchange', doOnOrientationChange);
    
  // Initial execution if needed
  doOnOrientationChange();*/
  if (window.orientation != undefined)
    doOnOrientationChange();
}

/*
// type
console.log(current_mode.type);

// angle
console.log(current_mode.angle);
*/

/*-----------------------CAMBIAR TAMANO DE TEXTO-----------------------*/

//console.log(window.getComputedStyle(cantoBody).fontSize);
tamano = JSON.parse(localStorage.getItem("letraTamano"));

if (tamano === null)
{
  tamano = 89;
  localStorage.setItem("letraTamano",JSON.stringify(tamano));
}

//Cambiar texto mas chico
if(botonTextoChico){
  botonTextoChico.addEventListener("click",(e) => {
    tamano = JSON.parse(localStorage.getItem("letraTamano"));
    tamano = tamano - 10;
    console.log (tamano);
    if (cantoBody)
      cantoBody.style.fontSize = tamano + "%" ;
    else if (letraBody)
      letraBody.style.fontSize = tamano + "%" ;
    localStorage.setItem("letraTamano",JSON.stringify(tamano));
  });
}

//Cambiar texto mas grande
if(botonTextoGrande){
  botonTextoGrande.addEventListener("click",(e) => {
    tamano = JSON.parse(localStorage.getItem("letraTamano"));
    tamano = tamano + 10;
    console.log (tamano);
    if (cantoBody)
      cantoBody.style.fontSize = tamano + "%" ;
    else if (letraBody)
      letraBody.style.fontSize = tamano + "%" ;
    localStorage.setItem("letraTamano",JSON.stringify(tamano));
  });
}
if (cantoBody)
{
  cantoBody.style.fontSize = tamano + "%" ;
}

if (letraBody)
{
  letraBody.style.fontSize = tamano + "%" ;
}

/*-----------------------BOTON MOSTRAR IMAGEN DE ACORDES-----------------------*/
if(botonMostrarAcordes){
  var ListaAcordesNEW = [];
  botonMostrarAcordes.onclick = function (){
    var ListaAcordes = JSON.parse(localStorage.getItem("acordesCanto"));
    $('#mytab').toggle();
    console.log("-Lista de acordes:" + ListaAcordes);
    jtab.render($('#mytab'),ListaAcordes);
  }
}

/*-----------------------BOTON HOME-----------------------*/
if(botonCasa){
  botonCasa.addEventListener("click",(e) => {
    window.location.assign(home);
  });
}

/*----------------------------BASE DE DATOS----------------------------*/
//Constructor de canto guardado
class cantoGuardado {
  constructor(link,tipo,titulo){
    this.pagina = link;
    this.tipo = tipo;
    this.titulo = titulo;
  }
}

//Base de datos de canciones, el titulo debe coincidir con el titulo del canto y el tono con el original
const startPath = 'cantos/info/';
class UI {
  static desplegarCantos(){
    const baseCanciones = [
      {
        pagina: startPath + "a_cada_instante.html",
        titulo: "A Cada Instante",
        autor: "Marco Barrientos",
        tono: "F",
        categoria: ["Adoracion","Servicio"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "a_el_alto_y_sublime.html",
        titulo: "A el Alto y Sublime",
        autor: "Roberto Torres",
        tono: "A",
        categoria: ["Adoracion"],
        audio:"https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2FJESUS%20ADRIAN%20ROMERO%20AL%20ALTO%20Y%20SUBLIME.mp3?v=1563671665519",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "a_ti.html",
        titulo: "A ti",
        autor: "Marcos Witt",
        tono: "F",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "abre_los_cielos.html",
        titulo: "Abre los cielos",
        autor: "Vino Nuevo",
        tono: "G",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },
        
      {
        pagina: startPath + "al_mundo_paz_ibi.html",
        titulo: "Al mundo paz - Hay libertad",
        autor: "IBI",
        tono: "D",
        categoria: ["Navidad"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "al_que_es_digno.html",
        titulo: "Al que es digno",
        autor: "Coalo Zamorano",
        tono: "D",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },
        
      {
        pagina: startPath + "al_que_me_cine.html",
        titulo: "Al que me cine",
        autor: "Jesús Adrián Romero",
        tono: "F",
        categoria: ["Alabanza","Fortaleza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "alabanzas_al_rey.html",
        titulo: "Alabanzas al Rey",
        autor: "Marcela Gandara",
        tono: "Cm",
        categoria: ["Navidad"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },
      
      {
        pagina: startPath + "aqui_estoy_jm.html",
        titulo: "Aqui Estoy",
        autor: "Jaime Murrel",
        tono: "A",
        categoria: ["Adoracion","Servicio"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 
      
      {
        pagina: startPath + "bueno_es_alabar.html",
        titulo: "Bueno es alabar",
        autor: "Danilo Montero",
        tono: "G",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "bueno_es_dios.html",
        titulo: "Bueno es Dios",
        autor: "Don Moen",
        tono: "D",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },  

      {
        pagina: startPath + "cantare_de_tu_amor_dm.html",
        titulo: "Cantare de tu amor",
        autor: "Danilo Montero",
        tono: "C",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "cordero_santo.html",
        titulo: "Cordero Santo",
        autor: "Roberto Torres",
        tono: "F",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "cuan_grande_es_dios.html",
        titulo: "Cuan grande es Dios",
        autor: "En Espirity y en Verdad",
        tono: "C",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "cuando_veo_tu_amor.html",
        titulo: "Cuando veo tu amor",
        autor: "Marco Barrientos",
        tono: "D",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes","Piano"],
      }, 

      {
        pagina: startPath + "cubiertos_por_tu_sangre.html",
        titulo: "Cuberitos por tu sangre",
        autor: "En Espirity y en Verdad",
        tono: "F",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "digno_es_el_senor.html",
        titulo: "Digno es el Senor",
        autor: "Marcela Gandara",
        tono: "A",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "dios_de_amor.html",
        titulo: "Dios de amor",
        autor: "Danilo Montero",
        tono: "D",
        categoria: ["Fortaleza","Evangelismo","Semana Santa"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "dios_de_pactos.html",
        titulo: "Dios de pactos",
        autor: "Marcos Witt",
        tono: "A",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "dios_el_mas_grande.html",
        titulo: "Dios el mas grande",
        autor: "Juan Carlos Alvarado",
        tono: "Bb",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "dios_esta_aqui.html",
        titulo: "Dios esta aqui",
        autor: "Darlene Zschech",
        tono: "D",
        categoria: ["Navidad","Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "dios_ha_sido_fiel.html",
        titulo: "Dios ha sido fiel",
        autor: "Marcos Witt",
        tono: "A",
        categoria: ["Adoracion","Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "dios_imparable.html",
        titulo: "Dios imparable",
        autor: "Marcos Witt",
        tono: "A",
        categoria: ["Adoracion","Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "dios_me_ama.html",
        titulo: "Dios me ama",
        autor: "Danilo Montero",
        tono: "A",
        categoria: ["Fortaleza","Evangelismo","Semana Santa"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "dios_poderoso.html",
        titulo: "Dios poderoso",
        autor: "IBI",
        tono: "Bb",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },
        
      {
        pagina: startPath + "el_amor_de_cristo.html",
        titulo: "El amor de Cristo",
        autor: "Sovereign Grace",
        tono: "E",
        categoria: ["Evangelismo"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "el_dios_que_adoramos.html",
        titulo: "El Dios que adoramos",
        autor: "Sovereign Grace",
        tono: "F#",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes","Guitarra Electrica"],
      },

      {
        pagina: startPath + "el_senor_es_mi_pastor.html",
        titulo: "El Senor es mi pastor",
        autor: "Juan Carlos Alvarado",
        tono: "A",
        categoria: ["Fortaleza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "enciende_una_luz.html",
        titulo: "Enciende una luz",
        autor: "Marcos Witt",
        tono: "G",
        categoria: ["Evangelismo","Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "eres_bendito.html",
        titulo: "Eres bendito",
        autor: "Jaime Murrel",
        tono: "G",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "eres_digno_de_gloria.html",
        titulo: "Eres digno de gloria",
        autor: "Coalo Zamorano",
        tono: "C",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "eres_fiel.html",
        titulo: "Eres Fiel",
        autor: "Coalo Zamorano",
        tono: "C",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "eres_mi_amigo_fiel.html",
        titulo: "Eres mi amigo fiel",
        autor: "Coalo Zamorano",
        tono: "E",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 
      
      {
        pagina: startPath + "gracia_sublime_es.html",
        titulo: "Gracia sublime es",
        autor: "En espiritu y verdad",
        tono: "B",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 
      
      {
        pagina: startPath + "gracias_dios.html",
        titulo: "Gracias Dios",
        autor: "Don Moen",
        tono: "F",
        categoria: ["Accion de Gracias"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "hay_libertad.html",
        titulo: "Hay libertad",
        autor: "IBI",
        tono: "D",
        categoria: ["Alabanza","Evangelismo"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "inmerecedor.html",
        titulo: "Inmerecedor",
        autor: "Abel Zavala",
        tono: "C",
        categoria: ["Accion de Gracias","Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "jesus_eres_mi_buen_pastor.html",
        titulo: "Jesus eres mi buen pastor",
        autor: "Marcos Witt",
        tono: "A",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "jesus_es_el_senor.html",
        titulo: "Jesus es el Senor",
        autor: "Jesus Adrian Romero",
        tono: "G",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "la_nube_de_tu_presencia.html",
        titulo: "La nube de tu presencia",
        autor: "Conquistando Fronteras",
        tono: "B",
        categoria: ["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes","Guitarra Electrica"],
      },

      {
        pagina: startPath + "mas_el_dios_de_toda_gracia.html",
        titulo:"Mas el Dios de toda gracia",
        autor:"Marcos Witt",
        tono:"A",
        categoria:["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes","Piano"],
      },

      {
        pagina: startPath + "nada_es_imposible_mb.html",
        titulo: "Nada es imposible",
        autor: "Marco Barrientos",
        tono: "Bb",
        categoria: ["Fortaleza","Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }, 

      {
        pagina: startPath + "navidad_ya_va_llegando.html",
        titulo: "Navidad ya va llegando",
        autor: "Epic kids",
        tono: "D",
        categoria: ["Navidad"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "noble_sosten.html",
        titulo: "Noble sosten",
        autor: "Popular",
        tono: "D",
        categoria: ["Fortaleza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "noche_de_paz.html",
        titulo: "Noche de paz",
        autor: "Himno 58",
        tono: "Bb",
        categoria: ["Navidad","Himnos"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "nuestro_salvador.html",
        titulo: "Nuestro salvador",
        autor: "Job Gonzalez",
        tono: "Am",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "oh_ven_bendito_emanuel.html",
        titulo: "Oh ven bendito Emanuel",
        autor: "Marcos Witt",
        tono: "Bm",
        categoria: ["Navidad"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "por_siempre.html",
        titulo: "Por Siempre",
        autor: "Vino Nuevo",
        tono: "Bb",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "quiero_entender.html",
        titulo: "Quiero entender",
        autor: "Jesus Adrian Romero",
        tono: "G",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "rey_de_gloria.html",
        titulo: "Rey de gloria",
        autor: "Marco Barrientos",
        tono: "E",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "sana_nuestra_tierra.html",
        titulo:"Sana nuestra tierra",
        autor:"Marcos Witt",
        tono:"G",
        categoria:["Oracion","Perdon"],
        audio:"",
        subpaginas: ["Letra","Acordes","Piano","Guitarra Electrica"],
      },
        
      {
        pagina: startPath + "santo.html",
        titulo:"Santo",
        autor:"Coalo Zamorano",
        tono:"D",
        categoria:["Alabanza"],
        audio:"https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2FSANTO-COALO%20ZAMORANO%20(LETRA).mp3?v=1563233873479",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "santo_santo_santo.html",
        titulo:"Santo Santo Santo",
        autor:"Marcos Witt",
        tono:"Bb",
        categoria:["Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes","Piano"],
      },

      {
        pagina: startPath + "sendas_dios_hara.html",
        titulo:"Sendas Dios hara",
        autor:"Don Moen",
        tono:"G",
        categoria:["Adoracion","Fortaleza"],
        audio:"",
        subpaginas: ["Letra","Acordes",],
      },

      {
        pagina: startPath + "sobrenatural.html",
        titulo: "Sobrenatural",
        autor: "Marcos Witt",
        tono: "G",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "sobretodo.html",
        titulo: "Sobretodo",
        autor: "Vino Nuevo",
        tono: "A",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "somos_el_pueblo_de_dios.html",
        titulo: "Somos el pueblo de Dios",
        autor: "Marcos Witt",
        tono: "G",
        categoria: ["Evangelismo","Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },
        
      {
        pagina: startPath + "te_alabare_mi_buen_jesus.html",
        titulo: "Te alabare mi buen Jesus",
        autor: "Danilo Montero",
        tono: "E",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "te_doy_gloria.html",
        titulo: "Te doy gloria",
        autor: "En Espiritu y verdad",
        tono: "C",
        categoria: ["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes","Guitarra Electrica"],
      },

      {
        pagina: startPath + "temprano_yo_te_buscare.html",
        titulo: "Temprano yo te buscare",
        autor: "Marcos Witt",
        tono: "G",
        categoria: ["Alabanza","Fortaleza"],
        audio:"",
        subpaginas: ["Letra","Acordes","Piano"],
      },

      {
        pagina: startPath + "tu_amor_por_mi.html",
        titulo:"Tu amor por mi",
        autor:"Marcos Witt",
        tono:"D",
        categoria:["Adoracion","Servicio"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "tu_eres_dios_eeyv.html",
        titulo:"Tu eres Dios",
        autor:"En Espiritu y Verdad",
        tono:"C",
        categoria:["Alabanza","Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes","Piano"],
      },

      {
        pagina: startPath + "tu_eres_dios_mv.html",
        titulo:"Tu eres Dios",
        autor:"Marcos Vidal",
        tono:"E",
        categoria:["Alabanza","Adoracion"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "tu_eres_santo.html",
        titulo:"Tu eres Santo",
        autor:"Michael W. Smith",
        tono:"G",
        categoria:["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Letra Mujeres","Acordes","Guitarra Electrica"],
      },

      {
        pagina: startPath + "tu_fidelidad.html",
        titulo:"Tu fidelidad",
        autor:"Marcos Witt",
        tono:"D",
        categoria:["Fortaleza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "tu_mereces_gloria.html",
        titulo:"Tu mereces gloria",
        autor:"Juan Carlos Alvarado",
        tono:"A",
        categoria:["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "tu_nombre_oh_dios.html",
        titulo:"Tu nombre oh Dios",
        autor:"Marcos Witt",
        tono:"A",
        categoria:["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "tu_palabra.html",
        titulo:"Tu palabra",
        autor:"Juan Carlos Alvarado",
        tono:"A",
        categoria:["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "un_siervo_para_tu_gloria.html",
        titulo:"Un siervo para tu gloria",
        autor:"IBI",
        tono:"B",
        categoria:["Servicio"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      },

      {
        pagina: startPath + "vamos_a_cantar.html",
        titulo:"Vamos a cantar",
        autor:"En espiritu y verdad",
        tono:"B",
        categoria:["Alabanza"],
        audio:"",
        subpaginas: ["Letra","Acordes"],
      }
      
    ];
    if(tituloTexto === "Dunamis Adoracion | General"){
      baseCanciones.forEach((canto) => UI.agregarCantosAListaCategoria(canto));
      localStorage.setItem("playlistFlag",0);
    }
    else if(tituloTexto === "Dunamis Adoracion | Adoracion"){
      CategoriaCantos("Adoracion");
    }
    else if(tituloTexto === "Dunamis Adoracion | Alabanza"){
      CategoriaCantos("Alabanza");
    }
    else if(tituloTexto === "Dunamis Adoracion | Confesion"){
      CategoriaCantos("Confesion");
    }
    else if(tituloTexto === "Dunamis Adoracion | Evangelismo"){
      CategoriaCantos("Evangelismo");
    }
    else if(tituloTexto === "Dunamis Adoracion | Servicio"){
      CategoriaCantos("Servicio");
    }
    else if(tituloTexto === "Dunamis Adoracion | Unidad"){
      CategoriaCantos("Unidad");
    }
    else if(tituloTexto === "Dunamis Adoracion | Oracion"){
      CategoriaCantos("Oracion");
    }
    else if(tituloTexto === "Dunamis Adoracion | Fortaleza"){
      CategoriaCantos("Fortaleza");
    }
    else if(tituloTexto === "Dunamis Adoracion | Perdon"){
      CategoriaCantos("Perdon");
    }
    else if(tituloTexto === "Dunamis Adoracion | Accion de Gracias"){
      CategoriaCantos("Accion de Gracias");
    }
    else if(tituloTexto === "Dunamis Adoracion | Semana Santa"){
      CategoriaCantos("Semana Santa");
    }
    else if(tituloTexto === "Dunamis Adoracion | Navidad"){
      CategoriaCantos("Navidad");
    }
    else if(tituloTexto === "Dunamis Adoracion | Himnos"){
      CategoriaCantos("Himnos");
    }
    else if(tituloTexto === "Dunamis Adoracion | Servicios Especiales"){
      CategoriaCantos("Servicios Especiales");
    }
    
    function CategoriaCantos(categoria){
      let filtroCategorias = baseCanciones.filter(function(cantos){
        //for (let i=0; i<baseCanciones.length;i++){
        for (let i=0; i<totalCantos;i++){
          if (cantos.categoria [i]== categoria){
            return true;
          }
        }
      });
      filtroCategorias.forEach((canto) => UI.agregarCantosAListaCategoria(canto));
      localStorage.setItem("playlistFlag",0); 
    }
    
    //Para agregar un audio
    if (contenidoCanto){
      let autorcanto = document.querySelector("h3").textContent;
      let Canto = baseCanciones.filter(function(canto){
        return  canto.titulo.toLowerCase() === tituloCanto.innerHTML.toLowerCase(); 
      });
      //Si hay 2 o mas cantos con el mismo titulo, buscar el autor
      if (Canto.length>1) {
        Canto = Canto.filter(function(canto){
            return  canto.autor.toLowerCase() === autorcanto.toLowerCase(); 
        });
      }
      UI.agregarAudio(Canto);
    }

    //Para agregar lista de opciones a las paginas Info
    if(ulSubtemasInfo){
      //let autorcanto = document.querySelector("h3").textContent;
      /*let Canto = baseCanciones.filter(function(canto){
        return  canto.titulo.toLowerCase() === tituloTexto.toLowerCase(); 
      });
      //Si hay 2 o mas cantos con el mismo titulo, buscar el autor
      if (Canto.length>1) {
        Canto = Canto.filter(function(canto){
            return  canto.autor.toLowerCase() === autorcanto.toLowerCase(); 
        });
      }
      UI.agregarSubtemasACanto(Canto);*/
      let Canto = baseCanciones.filter(function(canto){
        console.log(canto.pagina.toLowerCase());
        console.log(location.pathname.toLowerCase());
        return  canto.pagina.replace(".html","").toLowerCase() === location.pathname.replace("/html/","").replace(".html","").toLowerCase(); 
      });
      UI.agregarSubtemasACanto(Canto);
    }

    //Guardar todos los tonos de los cantos en localStorage para despues manipularlos
    let tonos,flag;
    tonos = JSON.parse(localStorage.getItem("TonosActuales"));
    if ((tonos == null) || (tonos.length != baseCanciones.length)){
      tonos = baseCanciones.map(cantos => ({titulo: cantos.titulo, autor: cantos.autor, tono:cantos.tono, pagina:cantos.pagina}));
      localStorage.setItem("TonosActuales", JSON.stringify(tonos));
      alert("Se actualizo la lista de cantos");
    }
    
    
  }

  static agregarCantosAListaCategoria(canto){
    const olLista = document.querySelector("#lista");
    const crearli = document.createElement('li');
    crearli.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:rgb(21, 4, 130)">${canto.autor}</span> </a>- Tono:${canto.tono}`;
    olLista.appendChild(crearli);
    
    olLista.addEventListener("click",(e) => {
      let el = e.target;
      console.log(e);
      console.log(el);
      /*if (el.contains(a)){
        console.log("hola");
        const bodySubtema = document.createElement("li");
        ul.innerHTML = `<a> Hola </a>`;
        olLista.insertBefore(bodySubtema,crearli);
      }*/
    });
  }
  
  static agregarSubtemasACanto(cantoSubtemas){
    //localStorage.setItem("cantoSeleccionado",JSON.stringify(cantoSubtemas));
    cantoSubtemas[0].subpaginas.forEach((subtema) => {
      //subtema = subtema.replace(" ","_");
      let pagina = cantoSubtemas[0].pagina.replace("info",subtema.toLowerCase().replace(" ","")).replace(".html","");      
      const lista = document.createElement("li");
      lista.className = "lista";
      lista.innerHTML = `<a href="/html/${pagina}_${subtema.toLowerCase().replace(" ","_")}.html">${subtema}</a> <button class="boton-add">
        +</button></li>`;
      ulSubtemasInfo.appendChild(lista);
    });
  }
  
  static agregarAudio(audiocanto){
    botonAudio.onclick = function (){
      console.log(audiocanto[0].audio);
      const divAudio = document.querySelector(".divAudio");
      const audio = document.createElement("audio");
      audio.setAttribute("controls", "controls");
      audio.setAttribute("src",audiocanto[0].audio);
      divAudio.appendChild(audio);
      const x=document.createElement("button");
      x.className = "botonBorrarAudio";
      x.appendChild(document.createTextNode("X"));
      divAudio.appendChild(x);
      botonAudio.style.display="none";
      x.onclick = function (){
        botonAudio.style.display="inline-block";
        while (divAudio.hasChildNodes()) {   
            divAudio.removeChild(divAudio.firstChild);
        }
      }
    } 
  }
}

//Cuando se cargue la pagina, agregar base de datos
document.addEventListener("DOMContentLoaded", UI.desplegarCantos);

/*-----------------------BOTON AUDIO DE CANTO-----------------------*/
if(botonAudio){
  document.addEventListener("DOMContentLoaded", UI.desplegarCantos);
}

/*-----------------------BUSQUEDA FILTRO-----------------------*/
if (busquedaItem){
busquedaItem.addEventListener("keyup",filterItems);
}
function filterItems(e){
  let filterValue = document.getElementById('busqueda').value.toUpperCase();
  let ol = document.getElementById("lista");
  console.log(ol);
  let li = ol.querySelectorAll("li");
  for (let i=0;i<li.length;i++){
    let a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

/*-----------------------BOTON REGRESAR PAGINA-----------------------*/
if(botonRegresar){
  botonRegresar.addEventListener("click",(e) =>  {
    window.history.back();
  });
}
if(botonRegresar2){
  botonRegresar2.addEventListener("click",(e) =>  {
    window.history.back();
  });
}

/*-----------------------BOTON AVANZAR PAGINA-----------------------*/
//Solo cuando se encuentre en una playlist, se muestra el boton de avanzar a siguiente canto
if(tituloTexto === "Calendario"){
  localStorage.setItem("playlistFlag",0);
}
let playlistFlag = localStorage.getItem("playlistFlag");
if(playlistFlag > 0 && (botonAvanzar || botonAvanzar2)){
  botonAvanzar.style.display = "block";
  botonAvanzar2.style.display = "block";
  //botonRegresar2.style.display = "block";
  botonAvanzar.addEventListener("click",avanzar);
  botonAvanzar2.addEventListener("click",avanzar);
  function avanzar() {
  //botonAvanzar.addEventListener("click",(e) => {
    let cancionesPlaylist;
    let proxCanto;
    if(playlistFlag == 1){
      cancionesPlaylist = JSON.parse(localStorage.getItem("cancionesDomingo"));
    }
    else if(playlistFlag == 2){
      cancionesPlaylist = JSON.parse(localStorage.getItem("cancionesMiercoles"));
    }
    const pagActual = location.href;
    console.log (pagActual);
    console.log (proxCanto);
    cancionesPlaylist.forEach(function (canto, index){
      if (canto.pagina === pagActual){
        proxCanto = index + 1; 
      }
      if (proxCanto == index){ 
        window.location.assign(canto.pagina);
      }  
      if (proxCanto == cancionesPlaylist.length){

          window.location.assign(home);
      }
    });
  }
  //});
}

//Playlist variables
/*var opcionesItems = document.getElementById("opcionesDeCanto");
var botonEditar = document.querySelector(".EditarLista");
var botonBorrarLista = document.querySelector(".borrarLista");
const lista = document.querySelector(".playlistCantos");
let titulo = document.querySelector('title').textContent;*/

/*-----------------------MANIPULACION DE PLAYLISTS-----------------------*//*
class Playlist{
  static agregarCantos(canciones,lista){
    if (canciones != null){
      canciones.forEach(function (canto){
        const li = document.createElement("li");
        li.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:black">${canto.tipo}</span></a>`; 
        lista.appendChild(li);
      });
    }
  }
  
  static agregarBotones(canciones,lista){
    //Agregar boton OK para inicializar
    let nav = document.querySelector(".nav");  
    let botonBorrar = document.querySelector(".divBorarLista");
    let divOk = document.createElement("div");
    divOk.className = "divOk";
    let botonOK = document.createElement("button");
    botonOK.className = "botonOK";
    botonOK.appendChild(document.createTextNode("OK"));
    divOk.appendChild(botonOK);
    nav.insertBefore (divOk,botonBorrar);
    divOk.style.display = "none";
    botonBorrar.style.display = "none";
    
    //Agregar botones mover arriba y abajo para inicializar
    const div = document.createElement ("div");
    div.className = "claseEditar";
    let body = document.querySelector(".bodyPlaylist");
    body.insertBefore (div,nav);
    let botonUp = document.createElement("button");
    botonUp.className = "botonUp";
    let br = document.createElement ("br");
    let botonDown = document.createElement("button");
    botonDown.className = "botonDown";
    div.appendChild(botonUp);
    botonUp.appendChild(document.createTextNode("Mover arriba"));
    div.appendChild(br);
    div.appendChild(botonDown);
    botonDown.appendChild(document.createTextNode("Mover abajo"));
    div.style.display = "none";
  }
  
  static agregarMensajeNoCantos(lista,mensaje){
    if (lista.lastElementChild === null){
      const div = document.createElement ('div');
      div.className = "NoHayCantos";
      div.appendChild(document.createTextNode(mensaje));
      const container = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,lista);
      let divEditar = document.querySelector(".divEditar");
      divEditar.style.display = "none";
    }
  }
  
  static funcionBotonEditar(lista,canciones,playlist){
    let noseleccionado, array=[], parent;
    let index = null;
    if (lista.lastElementChild != null){
      botonEditar.addEventListener("click",botoneditar);
    }
    function botoneditar(){
      let divOk = document.querySelector(".divOk");
      let divEditar = document.querySelector(".divEditar");
      let div = document.querySelector(".claseEditar");
      let botonBorrar = document.querySelector(".divBorarLista");
      botonBorrar.style.display = "block";
      while (lista.hasChildNodes()) {   
        lista.removeChild(lista.firstChild);
      }
      canciones.forEach(function (canto){
        const li = document.createElement("li");
        li.innerHTML = `<a href="${canto.pagina}"></a>${canto.titulo} - ${canto.tipo} <button class="boton-delete">
            X</button>`; 
        lista.appendChild(li);
      });
      
      //Ocultar y mostrar bloques
      div.style.display = "block";
      divEditar.style.display = "none";
      divOk.style.display = "block";
      
      //Seleccionar canto a editar
      let items = document.querySelectorAll(".playlistCantos li");
      items.forEach(function (item){
         array.push(item.innerHTML);
      });
      items.forEach(function (item){
        item.onclick = function(){
          index = array.indexOf(this.innerHTML);
          if (noseleccionado){
            noseleccionado.className = "noselected";
          } 
          this.className = "selected";
          noseleccionado = this;
          items = document.querySelectorAll(".playlistCantos li");
          seleccionado = item;         
        } 
      });
      
      //Mover canto seleccionado hacia arriba o abajo
      let botonUp = document.querySelector(".botonUp");
      let botonDown = document.querySelector(".botonDown");
      
      botonUp.onclick = function (){
        if (index != "undefined" || index != null){
          let items = document.querySelectorAll(".playlistCantos li");
          parent = items[index].parentElement;
          if (index > 0){
            parent.insertBefore(items[index],items[index-1]);
            index--;
          }
          items = document.querySelectorAll(".playlistCantos li");
          array = [];
          items.forEach(function (item){
            array.push(item.innerHTML);
          });
          
          canciones.forEach((canto, index)=>{
            if(canto.pagina === seleccionado.firstChild.href){
              if (index>0){
                canciones.splice(index-1,0,canto);
                canciones.splice(index+1,1);
              }
            }
          });
          localStorage.setItem(playlist,JSON.stringify(canciones));
        }
      }
      
      botonDown.onclick = function (){
          if (index != "undefined" || index != null){
          let items = document.querySelectorAll(".playlistCantos li");
          parent = items[index].parentElement;
          if (index < (array.length-1)){
            parent.insertBefore(items[index],items[index+2]);
            index++;
          }
          items = document.querySelectorAll(".playlistCantos li");
          array = [];
          items.forEach(function (item){
            array.push(item.innerHTML);
          });
            let i = 0;
            console.log(canciones.length);
            canciones.forEach((canto, index)=>{
            if(canto.pagina === seleccionado.firstChild.href && i===0){
              if (index < (canciones.length - 1)){
                canciones.splice(index,1);
                canciones.splice(index+1,0,canto);
                i++;
              }
            } 
          });
          localStorage.setItem(playlist,JSON.stringify(canciones));
        } 
      }
    }
  }
  
  static funcionBotonOk(lista,canciones){
    let botonOK = document.querySelector(".botonOK");
    botonOK.addEventListener("click",botonok);
    function botonok(){
      let divOk = document.querySelector(".divOk");
      let divEditar = document.querySelector(".divEditar");
      let div = document.querySelector(".claseEditar");
      let botonBorrar = document.querySelector(".divBorarLista");
      botonBorrar.style.display = "none";
      div.style.display = "none";
      divOk.style.display = "none";
      divEditar.style.display= "block";
      if (seleccionado){
        seleccionado.className = "noselected";
      }
      while (lista.hasChildNodes()) {   
        lista.removeChild(lista.firstChild);
      }
      Playlist.agregarCantos(canciones,lista);
    } 
  }
  
  static borrarCanto(lista,mensaje,canciones,playlist){
    lista.addEventListener("click",(e) =>  {
      let el = e.target;
      if (el.classList.contains("boton-delete")){
        el.parentElement.remove();
        canciones.forEach((canto, index)=>{
          if(canto.pagina === el.previousElementSibling.href){
            canciones.splice(index,1);
          }
        });
        localStorage.setItem(playlist,JSON.stringify(canciones));
        Playlist.agregarMensajeNoCantos(lista,mensaje);
      }
    });
  }
  
  static borrarLista(lista,mensaje,playlist,canciones,borrarLista){
    if (lista.lastElementChild != null){
      borrarLista.addEventListener("click",BorrarLista);
    }
    function BorrarLista(e){    
      if(confirm("ESTAS SEGURO DE BORRAR TODA LA LISTA?")){
        localStorage.removeItem(playlist);
        let ultimo = lista.lastElementChild;
        while(ultimo){
          lista.removeChild(ultimo);
          ultimo = lista.lastElementChild;
        }
      }
      Playlist.agregarMensajeNoCantos(lista,mensaje);
      let divOk = document.querySelector(".divOk");
      let divEditar = document.querySelector(".divEditar");
      let div = document.querySelector(".claseEditar");
      let botonBorrar = document.querySelector(".divBorarLista");
      botonBorrar.style.display = "none";
      div.style.display = "none";
      divOk.style.display = "none";
    }
  }
}

//Cuando se cargue la pagina Playlist Domingo, agregar cantos
if(titulo === "Playlist Domingo"){
  let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
  let mensaje = "Agrega cantos a la Playlist DOMINGO";
  let playlist = "cancionesDomingo";
  Playlist.agregarCantos(canciones,lista);
  Playlist.agregarBotones(canciones,lista);
  Playlist.agregarMensajeNoCantos(lista,mensaje);
  Playlist.funcionBotonEditar(lista,canciones,playlist);
  Playlist.funcionBotonOk(lista,canciones);
  Playlist.borrarCanto(lista,mensaje,canciones,playlist);
  Playlist.borrarLista(lista,mensaje,playlist,canciones,botonBorrarLista);
  localStorage.setItem("playlistFlag",1);
}  

//Cuando se cargue la pagina Playlist Miercoles, agregar cantos
if(titulo === "Playlist Miercoles"){
  let canciones = JSON.parse(localStorage.getItem("cancionesMiercoles"));
  let mensaje = "Agrega cantos a la Playlist MIERCOLES"; 
  let playlist = "cancionesMiercoles";
  Playlist.agregarCantos(canciones,lista);
  Playlist.agregarBotones(canciones,lista);
  Playlist.agregarMensajeNoCantos(lista,mensaje);
  Playlist.funcionBotonEditar(lista,canciones,playlist);
  Playlist.funcionBotonOk(lista,canciones);
  Playlist.borrarCanto(lista,mensaje,canciones,playlist);
  Playlist.borrarLista(lista,mensaje,playlist,canciones,botonBorrarLista);
  localStorage.setItem("playlistFlag",2);
}  

//Solo cuando se encuentre en una playlist, se muestra el boton de avanzar a siguiente canto
let playlistFlag = localStorage.getItem("playlistFlag");
if(playlistFlag > 0 && (botonAvanzar || botonAvanzar2)){
  botonAvanzar.style.display = "block";
  botonAvanzar2.style.display = "block";
  botonRegresar2.style.display = "block";
  botonAvanzar.addEventListener("click",avanzar);
  botonAvanzar2.addEventListener("click",avanzar);
  function avanzar() {
  //botonAvanzar.addEventListener("click",(e) => {
    let cancionesPlaylist;
    let proxCanto;
    if(playlistFlag == 1){
      cancionesPlaylist = JSON.parse(localStorage.getItem("cancionesDomingo"));
    }
    else if(playlistFlag == 2){
      cancionesPlaylist = JSON.parse(localStorage.getItem("cancionesMiercoles"));
    }
    const pagActual = location.href;
    console.log (pagActual);
    console.log (proxCanto);
    cancionesPlaylist.forEach(function (canto, index){
      if (canto.pagina === pagActual){
        proxCanto = index + 1; 
      }
      if (proxCanto == index){ 
        window.location.assign(canto.pagina);
      }  
      if (proxCanto == cancionesPlaylist.length){

          window.location.assign("https://dunamis-alabanza.glitch.me/");
      }
    });
  }
  //});
}


/*-----------------------BOTON AGREGAR CANTO A UNA PLAYLIST-----------------------*//*

//Boton Add event
if(opcionesItems){
  opcionesItems.addEventListener("click", agregarCanto);
  }

function agregarCanto(e){
  if(e.target.classList.contains("boton-add")){
    let botonAdd = document.querySelector(".cuerpo-lista");
    botonAdd.style.opacity = "0.4";
    var cancion = e.target.parentElement;
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogverlay = document.getElementById('dialogverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogverlay.style.display = "block";
    dialogverlay.style.height = (winH) + "px";
    dialogbox.style.right = /*(winW/2) - (500*0.5) + */"12%";/*
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').innerHTML = "Agregar a playlist";
    //document.getElementById('dialogboxbody').innerHTML = "Elige";
    document.getElementById('dialogboxfoot').innerHTML = '<button id=Domingo>Domingo</button>  <button id=Miercoles>Miercoles</button>  <button id="Cancelar"> X </button>';
  
    var CancelarBoton = document.getElementById ('Cancelar');
    var DomingoBoton = document.getElementById ('Domingo');
    var MiercolesBoton = document.getElementById ('Miercoles');
    CancelarBoton.addEventListener ("click",Cancelar);
    //DomingoBoton.addEventListener ("click",Domingo);
    DomingoBoton.onclick = function () {Playlist('cancionesDomingo','DOMINGO','rgb(153, 247, 166)');}
    //MiercolesBoton.addEventListener ("click",Miercoles);
    MiercolesBoton.onclick = function () {Playlist('cancionesMiercoles','MIERCOLES','rgb(247, 225, 153)');}
                                   
    
    function Cancelar(){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
      botonAdd.style.opacity = "1";
    } 
    
    /*
    function Domingo(e){
      link = cancion.querySelector('a').href;
      tipo = cancion.querySelector('a').textContent;
      const CantoGuardado = new cantoGuardado(link,tipo,titulo);

      //Si no existe ningun canto, entonces agregar canto
      if(localStorage.getItem("cancionesDomingo") === null){
        cancionesDomingo = [];
        cancionesDomingo.push(CantoGuardado);
        localStorage.setItem("cancionesDomingo",JSON.stringify(cancionesDomingo));
        mostrarMensajeAgregado ('Canto agregado a DOMINGO','rgb(153, 247, 166)');
      }
      //Si existe entonces buscar si ya esta agregado, en caso de que si: Mostrar mensaje de ya agregado, en caso de que no: agregar canto a la lista
      else{
        cancionesDomingo = JSON.parse(localStorage.getItem("cancionesDomingo"));
        
        let LosCantos = cancionesDomingo.filter(function(cancion){
          return  cancion.pagina === CantoGuardado.pagina; 
        });
        
        switch (LosCantos.length){
          case 0:
            console.log("No repetido");
            cancionesDomingo.push(CantoGuardado);
            localStorage.setItem("cancionesDomingo",JSON.stringify(cancionesDomingo)); 
            mostrarMensajeAgregado ('Canto agregado a DOMINGO','rgb(153, 247, 166)');
            break;

          case 1:
            console.log("Repetido");
            mostrarMensajeAgregado ('Canto REPETIDO en Domingo','tomato');
            break;
        }
      }
    }
    
    function Miercoles(e){
      link = cancion.querySelector('a').href;
      tipo = cancion.querySelector('a').textContent;
      const CantoGuardado = new cantoGuardado(link,tipo,titulo);
      if(localStorage.getItem("cancionesMiercoles") === null){
        cancionesMiercoles = [];
        cancionesMiercoles.push(CantoGuardado);
        localStorage.setItem("cancionesMiercoles",JSON.stringify(cancionesMiercoles));
      }else{
        cancionesMiercoles = JSON.parse(localStorage.getItem("cancionesMiercoles"));
        cancionesMiercoles.push(CantoGuardado);
        localStorage.setItem("cancionesMiercoles",JSON.stringify(cancionesMiercoles));
      } 
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
      
      //Mostrar mensaje de canto agregado
      const div = document.createElement ('div');
      div.className = 'anuncioM';
      div.appendChild(document.createTextNode("Canto agregado a MIERCOLES"));
      const container = document.querySelector(".contenidoLista");
      const ul = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,ul);
      setTimeout(()=> document.querySelector(".anuncioM").remove(),2500);
      botonAdd.style.opacity = "1";
    }
    */
    
    /*
    function Playlist(playlist,dia,color){
      link = cancion.querySelector('a').href;
      tipo = cancion.querySelector('a').textContent;
      const CantoGuardado = new cantoGuardado(link,tipo,titulo);

      //Si no existe ningun canto, entonces agregar canto
      if(localStorage.getItem(playlist) === null){
        canciones = [];
        canciones.push(CantoGuardado);
        localStorage.setItem(playlist,JSON.stringify(canciones));
        mostrarMensajeAgregado (`Canto agregado a ${dia}`,color);
      }
      
      //Si existe entonces buscar si ya esta agregado, en caso de que si: Mostrar mensaje de ya agregado, en caso de que no: agregar canto a la lista
      else{
        canciones = JSON.parse(localStorage.getItem(playlist));
        
        let LosCantos = canciones.filter(function(cancion){
          return  cancion.pagina === CantoGuardado.pagina; 
        });
        
        switch (LosCantos.length){
          case 0:
            console.log("No repetido");
            canciones.push(CantoGuardado);
            localStorage.setItem(playlist,JSON.stringify(canciones)); 
            mostrarMensajeAgregado (`Canto agregado a ${dia}`,color);
            break;

          case 1:
            console.log("Repetido");
            mostrarMensajeAgregado (`Canto REPETIDO en ${dia}`,'tomato');
            break;
        }
      }
    }

    function mostrarMensajeAgregado(mensaje,color){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
      const div = document.createElement ('div');
      div.className = 'anuncio';
      div.style.backgroundColor = color;
      div.appendChild(document.createTextNode(`${mensaje}`));
      const container = document.querySelector(".contenidoLista");
      const ul = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,ul);
      setTimeout(()=> document.querySelector(".anuncio").remove(),2500);
      botonAdd.style.opacity = "1";
    }
  }
}*/