
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");
var opcionesItems = document.getElementById("opcionesDeCanto");
var botonRegresar = document.querySelector(".RegresarPagina");
var botonBorrarListaDomingo = document.querySelector(".borrarListaDomingo");
var botonBorrarListaMiercoles = document.querySelector(".borrarListaMiercoles");
let titulo = document.querySelector('title').textContent;
let cancionesDomingo = [];
let cancionesMiercoles = [];
let link;
let tipo;
 
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
      pagina: "A_Cada_Instante.html",
      titulo: "A Cada Instante",
      autor: "Marco Barrientos",
      tono: "Tono:F",
      categoria: ["Adoracion","Servicio"],
    },
  
    {
      pagina: "A_El_Alto_Y_Sublime.html",
      titulo: "A el Alto y Sublime",
      autor: "Jesus Adrian Romero",
      tono: "Tono:Bb",
      categoria: ["Adoracion"],
    },
  
    {
      pagina:"Abre_Los_Cielos.html",
      titulo: "Abre los Cielos",
      autor: "Jesus Adrian Romero",
      tono: "Tono:A#",
      categoria: ["Alabanza"],
    },
    
    {
      pagina:"",
      titulo:"",
      autor:"",
      tono:"",
      categoria:["Adoracion"],
    }
      
    ];
    
    //const cantos = baseCanciones;
    if(titulo === "Dunamis Adoracion | General"){
      baseCanciones.forEach((canto) => UI.agregarCantosAListaCategoria(canto));
    }
    
    else if(titulo === "Dunamis Adoracion | Adoracion"){
      let filtroCategorias = baseCanciones.filter(function(cantosAdoracion){
        for (let i=0; i<3;i++){
          if (cantosAdoracion.categoria [i]== "Adoracion"){
            return true;
          }
        }
      });
      filtroCategorias.forEach((canto) => UI.agregarCantosAListaAdoracion(canto));
    }
    
    else if(titulo === "Dunamis Adoracion | Alabanza"){
      let filtroCategorias = baseCanciones.filter(function(cantosAdoracion){
        for (let i=0; i<3;i++){
          if (cantosAdoracion.categoria [i]== "Adoracion"){
            return true;
          }
        }
      });
      filtroCategorias.forEach((canto) => UI.agregarCantosAListaAdoracion(canto));
    }
    
  }

  static agregarCantosAListaCategoria(canto){
    const olLista = document.querySelector("#lista");
    const crearli = document.createElement('li');
    crearli.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:rgb(21, 4, 130)">${canto.autor}</span> </a>- ${canto.tono}`;
    olLista.appendChild(crearli);
  }
  
  static agregarCantosAListaAdoracion(canto){
    const olLista = document.querySelector("#lista");
    const crearli = document.createElement('li');
    crearli.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:rgb(21, 4, 130)">${canto.autor}</span> </a>- ${canto.tono}`;
    olLista.appendChild(crearli);
  }
}


//Cuando se cargue la pagina, agregar base de datos
document.addEventListener("DOMContentLoaded", UI.desplegarCantos);

//Cuando se cargue la pagina Playlist Domingo, agregar cantos
if(titulo === "Playlist Domingo"){
  document.addEventListener("DOMContentLoaded", PlaylistDomingo)   
  function PlaylistDomingo(){
    let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
    if (canciones === null){
      /*const div = document.createElement ('div');
      div.className = "NoHayCantos";
      div.appendChild(document.createTextNode("Agrega cantos a la Playlist DOMINGO"));
      const container = document.querySelector(".cuerpo-lista");
      const ol = document.querySelector("#playlistDomingo");
      container.insertBefore(div,ol);*/
    }
    else{
    canciones.forEach(function (canto){
      const lista = document.querySelector("#playlistDomingo");
      const li = document.createElement("li");
      /*li.draggable = "true";*/
      li.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:black">${canto.tipo}</span></a> <button class="boton-delete">
            X</button>`; 
      lista.appendChild(li);
      console.log(li);
    });
    }
    
  //Borrar canto seleccionado
    document.querySelector("#playlistDomingo").addEventListener("click",(e) =>  {
      let el = e.target;
      if (el.classList.contains("boton-delete")){
        el.parentElement.remove();
        let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
        canciones.forEach((canto, index)=>{
          if(canto.pagina === el.previousElementSibling.href){
            canciones.splice(index,1);
          }
        });
        localStorage.setItem("cancionesDomingo",JSON.stringify(canciones));
        if (document.querySelector("#playlistDomingo").lastElementChild === null){
          const div = document.createElement ('div');
          div.className = "NoHayCantos";
          div.appendChild(document.createTextNode("Agrega cantos a la Playlist DOMINGO"));
          const container = document.querySelector(".cuerpo-lista");
          const ol = document.querySelector("#playlistDomingo");
          container.insertBefore(div,ol);
        }
      }
    });
    if (document.querySelector("#playlistDomingo").lastElementChild === null){
          const div = document.createElement ('div');
          div.className = "NoHayCantos";
          div.appendChild(document.createTextNode("Agrega cantos a la Playlist DOMINGO"));
          const container = document.querySelector(".cuerpo-lista");
          const ol = document.querySelector("#playlistDomingo");
          container.insertBefore(div,ol);
    }
    else
      {
        botonBorrarListaDomingo.addEventListener("click",BorrarListaDomingo);
      }
  
  }
  
}

//Boton Add event
if(opcionesItems){
opcionesItems.addEventListener("click", agregarCanto);
}
  
//Filter event
if (busquedaItem){
busquedaItem.addEventListener("keyup",filterItems);
}

//Boton regresar event
if(botonRegresar){
  botonRegresar.addEventListener("click", Regresar);
}

//Regresar pagina function
function Regresar(){
  window.history.back();
}

//Borrar lista domingo function
function BorrarListaDomingo(e){
  if(confirm("ESTAS SEGURO DE BORRAR TODA LA LISTA?")){
    localStorage.removeItem("cancionesDomingo");
    let ol = document.querySelector("#playlistDomingo");
    let ultimo = ol.lastElementChild;
    while(ultimo){
      console.log(ultimo);
      ol.removeChild(ultimo);
      ultimo = ol.lastElementChild;
    }
    const div = document.createElement ('div');
    div.className = "NoHayCantos";
    div.appendChild(document.createTextNode("Agrega cantos a la Playlist DOMINGO"));
    const container = document.querySelector(".cuerpo-lista");
    container.insertBefore(div,ol);
  }
}

 
//botonAgregar function
function agregarCanto(e){
  if(e.target.classList.contains("boton-add")){
    var cancion = e.target.parentElement;
    var winW = window.innerWidht;
    var winH = window.innerHeight;
    var dialogverlay = document.getElementById('dialogverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogverlay.style.display = "block";
    dialogverlay.style.height = winH/3 + "px";
    dialogbox.style.left = (winH/2) - (500*0.5) + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').innerHTML = "Agregar a playlist";
    //document.getElementById('dialogboxbody').innerHTML = "Elige";
    document.getElementById('dialogboxfoot').innerHTML = '<button id=Domingo>Domingo</button>  <button id=Miercoles>Miercoles</button>  <button id="Cancelar">Cancelar</button>';
  
    var CancelarBoton = document.getElementById ('Cancelar');
    var DomingoBoton = document.getElementById ('Domingo');
    var MiercolesBoton = document.getElementById ('Miercoles');
    CancelarBoton.addEventListener ("click",Cancelar);
    DomingoBoton.addEventListener ("click",Domingo);
    MiercolesBoton.addEventListener ("click",Miercoles);
                                   
    
    function Cancelar(e){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";  
    } 
    
    
    function Domingo(e){
      link = cancion.querySelector('a').href;
      tipo=cancion.querySelector('a').textContent;
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
      const container = document.querySelector(".contenido");
      const ul = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,ul);
      setTimeout(()=> document.querySelector(".anuncio").remove(),2500);
    }
    
    
    function Miercoles(e){
      link = cancion.querySelector('a').href;
      tipo=cancion.querySelector('a').textContent;
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
      const container = document.querySelector(".contenido");
      const ul = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,ul);
      setTimeout(()=> document.querySelector(".anuncioM").remove(),2500);
    }
  }
}
  
  

  


//Filter function
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





  




