
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");
var opcionesItems = document.getElementById("opcionesDeCanto");
var playListDomingo = document.getElementById("playlistDomingo");
var botonRegresar = document.querySelector(".RegresarPagina");
var botonBorrarListaDomingo = document.querySelector(".borrarListaDomingo");
let cancionesDomingo = [];
let cancionesMiercoles = [];
var link;
  
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

//Boton borrar lista domingo event
if(botonBorrarListaDomingo){
  botonBorrarListaDomingo.addEventListener("click",BorrarListaDomingo);
}


//Regresar pagina function
function Regresar(){
  window.history.back();
}

//Borrar lista domingo function
function BorrarListaDomingo(e){
  console.log("1");
  if(confirm("ESTAS SEGURO DE BORRAR TODA LA LISTA?")){
    localStorage.removeItem("cancionesDomingo");
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
      
      if(localStorage.getItem("cancionesDomingo") === null){
        cancionesDomingo = [];
        cancionesDomingo.push(link); 
        localStorage.setItem("cancionesDomingo",JSON.stringify(cancionesDomingo));
      }else{
        cancionesDomingo = JSON.parse(localStorage.getItem("cancionesDomingo"));
        cancionesDomingo.push(link);
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
      if(localStorage.getItem("cancionesMiercoles") === null){
        cancionesMiercoles = [];
        cancionesMiercoles.push(link);
        localStorage.setItem("cancionesMiercoles",JSON.stringify(cancionesMiercoles));
      }else{
        cancionesMiercoles = JSON.parse(localStorage.getItem("cancionesMiercoles"));
        cancionesMiercoles.push(link);
        localStorage.setItem("cancionesMiercoles",JSON.stringify(cancionesMiercoles));
        console.log(cancionesMiercoles); 
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

/*class Store{
  static agarrarCancion(){
    let cancionesDomingo;
    if(localStorage.getItem() === null){
      cancionesDomingo = [];
    }else{
      cancionesDomingo = localStorage.getItem("canciones");
    }
    
  }
}*/




/*
const canciones = [
  {
    pagina: <a href="A_Cada_Instante.html">A cada instante</a>,
    titulo: "A Cada Instante",
    autor: "B",
    tono: "B",
//    categoria: ["Adoracion"]
  },
  
  {
    pagina: "A_El_Alto_Y_Sublime.html",
    titulo: "A el Alto y Sublime",
    autor: "Jesus Adrian Romero",
    tono: "Bb"
  },
  
  {
    pagina:"Abre_los_Cielos.html",
    titulo: "Abre los Cielos",
    autor: "ds",
    tono: "D"
  }
  
  
];


*/

