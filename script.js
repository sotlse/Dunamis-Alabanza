
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");
var opcionesItems = document.getElementById("opcionesDeCanto");
//var add = document.getElementsByClassName("boton-add");

//Boton Add event
if(opcionesItems){
opcionesItems.addEventListener("click", agregarCanto);
}
  
//Filter event
if (busquedaItem){
busquedaItem.addEventListener("keyup",filterItems);
}

//botonAgregar function
function agregarCanto(e){
  if(e.target.classList.contains("boton-add")){
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
      var cancion = document.querySelector('li');
      console.log(cancion); 
      
    }
    function Miercoles(e){
      
    }
  }
}
  
  this.Domingo = function(){
    
  }
  
  this.Miercoles = function(){
    
  }
  

  


//Filter function
function filterItems(e){
/*  var text = e.target.value.toLowerCase();
  var enlace = listaItems.getElementsByTagName("a");
  Array.from(enlace).forEach(function(enlaces){
    var itemName = enlaces.firstChild.textContent;
      console.log(enlaces);
    if (itemName.toLowerCase().indexOf(text) != -1){
      enlaces.style.display = "block";
    } else {
      enlaces.style.display = "none";
    }
  }); */
  let filterValue = document.getElementById('busqueda').value.toUpperCase();
  let ol = document.getElementById("lista")
  console.log(filterValue);
  
}


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

