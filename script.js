
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");
var opcionesItems = document.getElementById("opcionesDeCanto")
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
    alert ("Hi");
    prompt("Hola");
    if (confirm("Agragar a Playlist",{labels: {cancel: "Miercoles",o: "Domingo"}})){
    
  }                          
  }
}


//Filter function
function filterItems(e){
  var text = e.target.value.toLowerCase();
  var enlace = listaItems.getElementsByTagName("a");
  Array.from(enlace).forEach(function(enlaces){
    var itemName = enlaces.firstChild.textContent;
      console.log(enlaces);
    if (itemName.toLowerCase().indexOf(text) != -1){
      enlaces.style.display = "block";
    } else {
      enlaces.style.display = "none";
    }
  }); 
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
