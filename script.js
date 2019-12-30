/*--VARIABLES--*/
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");
var opcionesItems = document.getElementById("opcionesDeCanto");
let botonRegresar = document.querySelector(".arrowRegresar");
let botonAvanzar = document.querySelector(".arrowAvanzar");
let botonRegresar2 = document.querySelector(".arrowRegresar2");
let botonAvanzar2 = document.querySelector(".arrowAvanzar2");
var botonEditar = document.querySelector(".EditarLista");
var botonBorrarLista = document.querySelector(".borrarLista");
const lista = document.querySelector(".playlistCantos");
let cantoBody = document.querySelector(".canto_body");
let letraBody = document.querySelector(".letra_body")
let titulo = document.querySelector('title').textContent;
let contenidoCanto = document.querySelector(".contenido");
let tituloCanto = document.querySelector(".tituloDelCanto");
let slur = document.querySelector(".slur");
let cancionesDomingo = [];
let cancionesMiercoles = [];
let link;
let tipo;
let totalCantos=300;
let seleccionado;
//Botones para configuracion de cantos
let botonAudio = document.querySelector(".botonAudio");
let botonTransportar = document.querySelector(".botonTransportar");
let botonTextoChico = document.querySelector(".botonTextoChico");
let botonTextoGrande = document.querySelector(".botonTextoGrande");
let botonCasa = document.querySelector(".botonCasa");
//Rotacion de pantalla
var current_mode = screen.orientation;
//Tamano de letra
let tamano;

/*-----------------------ROTACION DE PANTALLA-----------------------*/
if (cantoBody)
{
  //Para dispositivos Android
  if (current_mode.type=="portrait-primary" || current_mode.type=="portrait-secondary")
    cantoBody.style.columnCount= "1";
  
  else if (current_mode.type=="landscape-primary" || current_mode.type=="landscape-secondary")
    cantoBody.style.columnCount="2";

  window.onorientationchange = function() { 
    if(screen.orientation.type === "portrait-primary")
      cantoBody.style.columnCount= "1";
    else if(screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary")
      cantoBody.style.columnCount= "2";
  };

  //Para dispositivos IOS
  function doOnOrientationChange() {
    switch(window.orientation) {  
      case -90: case 90:
        cantoBody.style.columnCount= "2";
        break; 
      default:
        cantoBody.style.columnCount= "1";
        break; 
    }
  }
    
  window.addEventListener('orientationchange', doOnOrientationChange);
    
  // Initial execution if needed
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
    cantoBody.style.fontSize = tamano + "%" ;
    localStorage.setItem("letraTamano",JSON.stringify(tamano));
  });
}

//Cambiar texto mas grande
if(botonTextoGrande){
  botonTextoGrande.addEventListener("click",(e) => {
    tamano = JSON.parse(localStorage.getItem("letraTamano"));
    tamano = tamano + 10;
    console.log (tamano);
    cantoBody.style.fontSize = tamano + "%" ;
    localStorage.setItem("letraTamano",JSON.stringify(tamano));
  });
}
if (cantoBody)
{
  cantoBody.style.fontSize = tamano + "%" ;
}

/*
//desplegar letra de acordes en tamano mas grande si es tablet
var winW = window.innerWidth;
var winH = window.innerHeight;
let bodyPlaylist = document.querySelector(".playlistCantos")
console.log(winW,winH);
if (bodyPlaylist){
  if (winW >850){
    bodyPlaylist.style.fontSize = "150%";
  }
}
if (cantoBody){
  if (winW > 850){
    cantoBody.style.fontSize = "150%";
    if (slur){
      slur.height = "14";
      slur.width = "60";
    }
  }
}
if (letraBody){
  if(winW>850){
    letraBody.style.fontSize = "150%";
  }
}
*/

/*-----------------------BOTON HOME-----------------------*/
if(botonCasa){
  botonCasa.addEventListener("click",(e) => {
    window.location.assign("https://dunamis-alabanza.glitch.me/");
  });
}

/*-----------------------BASE DE DATOS-----------------------*/
//Constructor de canto guardado
class cantoGuardado {
  constructor(link,tipo,titulo){
    this.pagina = link;
    this.tipo = tipo;
    this.titulo = titulo;
  }
}

//Base de datos de canciones
class UI {
  static desplegarCantos(){
    const baseCanciones = [
    {
      pagina: "Cantos/Info/A_Cada_Instante.html",
      titulo: "A Cada Instante",
      autor: "Marco Barrientos",
      tono: "F",
      categoria: ["Adoracion","Servicio"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },
  
    {
      pagina: "Cantos/Info/A_El_Alto_Y_Sublime.html",
      titulo: "A el Alto y Sublime",
      autor: "Roberto Torres",
      tono: "A",
      categoria: ["Adoracion"],
      audio:"https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2FJESUS%20ADRIAN%20ROMERO%20AL%20ALTO%20Y%20SUBLIME.mp3?v=1563671665519",
      subpaginas: ["Letra","Acordes"],
    },

    {
      pagina:"Cantos/Info/Al_Mundo_Paz_IBI.html",
      titulo: "Al mundo paz - Hay libertad",
      autor: "IBI",
      tono: "D",
      categoria: ["Navidad"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },
  
    {
      pagina:"Cantos/Info/Abre_Los_Cielos.html",
      titulo: "Abre los Cielos",
      autor: "Jesus Adrian Romero",
      tono: "A#",
      categoria: ["Alabanza"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },

    {
      pagina:"Cantos/Info/Alabanzas_Al_Rey.html",
      titulo: "Alabanzas al Rey",
      autor: "Marcela Gandara",
      tono: "Cm",
      categoria: ["Navidad"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },
    
    {
      pagina:"Cantos/Info/Aqui_Estoy.html",
      titulo: "Aqui Estoy",
      autor: "Jaime Murrel",
      tono: "A",
      categoria: ["Adoracion","Servicio"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },  

    {
      pagina:"Cantos/Info/Cordero_Santo.html",
      titulo: "Cordero Santo",
      autor: "Roberto Torres",
      tono: "F",
      categoria: ["Adoracion"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    }, 

    {
      pagina:"Cantos/Info/Digno_Es_El_Senor.html",
      titulo: "Digno es el Senor",
      autor: "Marcela Gandara",
      tono: "D",
      categoria: ["Adoracion"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    }, 

    {
      pagina:"Cantos/Info/Dios_Esta_Aqui.html",
      titulo: "Dios esta aqui",
      autor: "Darlene Zschech",
      tono: "D",
      categoria: ["Navidad","Alabanza"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    }, 

    {
      pagina:"Cantos/Info/Dios_De_Pactos.html",
      titulo: "Dios de Pactos",
      autor: "Marcos Witt",
      tono: "A",
      categoria: ["Adoracion"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    }, 

    {
      pagina:"Cantos/Info/Eres_Digno_De_Gloria.html",
      titulo: "Eres digno de gloria",
      autor: "Coalo Zamorano",
      tono: "C",
      categoria: ["Alabanza"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    }, 

    {
      pagina:"Cantos/Info/Eres_Fiel.html",
      titulo: "Eres Fiel",
      autor: "Coalo Zamorano",
      tono: "C",
      categoria: ["Alabanza"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },   
    
    {
      pagina:"Cantos/Info/Gracias_Dios.html",
      titulo: "Gracias Dios",
      autor: "Don Moen",
      tono: "F",
      categoria: ["Adoracion"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    }, 

    {
      pagina:"Cantos/Info/Navidad_Ya_Va_Llegando.html",
      titulo: "Navidad ya va llegando",
      autor: "Epic kids",
      tono: "D",
      categoria: ["Navidad"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },

    {
      pagina:"Cantos/Info/Noche_De_Paz.html",
      titulo: "Noche de paz",
      autor: "Himno 58",
      tono: "Bb",
      categoria: ["Navidad","Himnos"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },

    {
      pagina:"Cantos/Info/Oh_Ven_Bendito_Emanuel.html",
      titulo: "Oh ven bendito Emanuel",
      autor: "Marcos Witt",
      tono: "Bm",
      categoria: ["Navidad"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },

    {
      pagina:"Cantos/Info/Por_Siempre.html",
      titulo: "Por Siempre",
      autor: "Vino Nuevo",
      tono: "Bb",
      categoria: ["Alabanza"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },
      
    {
      pagina:"Cantos/Info/Santo.html",
      titulo:"Santo",
      autor:"Coalo Zamorano",
      tono:"D",
      categoria:["Alabanza"],
      audio:"https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2FSANTO-COALO%20ZAMORANO%20(LETRA).mp3?v=1563233873479",
      subpaginas: ["Letra","Acordes"],
    },

    {
      pagina:"Cantos/Info/Sobrenatural.html",
      titulo: "Sobrenatural",
      autor: "Marcos Witt",
      tono: "A",
      categoria: ["Alabanza"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    },

    {
      pagina:"Cantos/Info/Tu_Eres_Dios_MV.html",
      titulo:"Tu Eres Dios",
      autor:"Marcos Vidal",
      tono:"E",
      categoria:["Alabanza","Adoracion"],
      audio:"",
      subpaginas: ["Letra","Acordes"],
    }
      
    ];
    if(titulo === "Dunamis Adoracion | General"){
      baseCanciones.forEach((canto) => UI.agregarCantosAListaCategoria(canto));
      localStorage.setItem("playlistFlag",0);
    }
    
    else if(titulo === "Dunamis Adoracion | Adoracion"){
      CategoriaCantos("Adoracion");
    }
    
    else if(titulo === "Dunamis Adoracion | Alabanza"){
      CategoriaCantos("Alabanza");
    }
    
    else if(titulo === "Dunamis Adoracion | Confesion"){
      CategoriaCantos("Confesion");
    }
    
    else if(titulo === "Dunamis Adoracion | Evangelismo"){
      CategoriaCantos("Evangelismo");
    }
    
    else if(titulo === "Dunamis Adoracion | Servicio"){
      CategoriaCantos("Servicio");
    }
    
    else if(titulo === "Dunamis Adoracion | Unidad"){
      CategoriaCantos("Unidad");
    }
    
    else if(titulo === "Dunamis Adoracion | Oracion"){
      CategoriaCantos("Oracion");
    }
    
    else if(titulo === "Dunamis Adoracion | Fortaleza"){
      CategoriaCantos("Fortaleza");
    }
    
    else if(titulo === "Dunamis Adoracion | Perdon"){
      CategoriaCantos("Perdon");
    }
    
    else if(titulo === "Dunamis Adoracion | Accion de Gracias"){
      CategoriaCantos("Accion de Gracias");
    }
    
    else if(titulo === "Dunamis Adoracion | Semana Santa"){
      CategoriaCantos("Semana Santa");
    }
    
    else if(titulo === "Dunamis Adoracion | Navidad"){
      CategoriaCantos("Navidad");
    }
    
    else if(titulo === "Dunamis Adoracion | Himnos"){
      CategoriaCantos("Himnos");
    }
    
    else if(titulo === "Dunamis Adoracion | Servicios Especiales"){
      CategoriaCantos("Servicios Especiales");
    }
    
    function CategoriaCantos(categoria){
      let filtroCategorias = baseCanciones.filter(function(cantos){
        for (let i=0; i<totalCantos;i++){
          if (cantos.categoria [i]== categoria){
            return true;
          }
        }
      });
      filtroCategorias.forEach((canto) => UI.agregarCantosAListaCategoria(canto));
      localStorage.setItem("playlistFlag",0); 
    }
    
    if (contenidoCanto){
      let Canto = baseCanciones.filter(function(canto){
        return  canto.titulo === tituloCanto.innerHTML; 
      });
    UI.agregarAudio(Canto);
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
  
  static agregarSubtemasACanto (canto){
    const bodySubtema = document.createElement("ul");
    const olLista = document.querySelector("#lista");
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

/*-----------------------BOTON AUDIO DE CANTO-----------------------*/
if(botonAudio){
  document.addEventListener("DOMContentLoaded", UI.desplegarCantos);
}


/*-----------------------MANIPULACION DE PLAYLISTS-----------------------*/
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


/*-----------------------BOTON AGREGAR CANTO A UNA PLAYLIST-----------------------*/

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
    console.log(winW,winH)
    var dialogverlay = document.getElementById('dialogverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogverlay.style.display = "block";
    dialogverlay.style.height = (winH) + "px";
    dialogbox.style.right = /*(winW/2) - (500*0.5) + */"12%";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').innerHTML = "Agregar a playlist";
    //document.getElementById('dialogboxbody').innerHTML = "Elige";
    document.getElementById('dialogboxfoot').innerHTML = '<button id=Domingo>Domingo</button>  <button id=Miercoles>Miercoles</button>  <button id="Cancelar"> X </button>';
  
    var CancelarBoton = document.getElementById ('Cancelar');
    var DomingoBoton = document.getElementById ('Domingo');
    var MiercolesBoton = document.getElementById ('Miercoles');
    CancelarBoton.addEventListener ("click",Cancelar);
    DomingoBoton.addEventListener ("click",Domingo);
    MiercolesBoton.addEventListener ("click",Miercoles);
                                   
    
    function Cancelar(e){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
      botonAdd.style.opacity = "1";
    } 
    
    
    function Domingo(e){
      link = cancion.querySelector('a').href;
      tipo = cancion.querySelector('a').textContent;
      const CantoGuardado = new cantoGuardado(link,tipo,titulo);
      if(localStorage.getItem("cancionesDomingo") === null){
        cancionesDomingo = [];
        cancionesDomingo.push(CantoGuardado);
        localStorage.setItem("cancionesDomingo",JSON.stringify(cancionesDomingo));
      }else{
        cancionesDomingo = JSON.parse(localStorage.getItem("cancionesDomingo"));
        cancionesDomingo.push(CantoGuardado);
        localStorage.setItem("cancionesDomingo",JSON.stringify(cancionesDomingo)); 
      }
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
    
      //Mostrar mensaje de canto agregado
      const div = document.createElement ('div');
      div.className = 'anuncio';
      div.appendChild(document.createTextNode("Canto agregado a DOMINGO"));
      const container = document.querySelector(".contenidoLista");
      const ul = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,ul);
      setTimeout(()=> document.querySelector(".anuncio").remove(),2500);
      botonAdd.style.opacity = "1";
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
  }
}