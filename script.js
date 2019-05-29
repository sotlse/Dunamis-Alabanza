
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
    document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Confirm.Domingo()">Domigo</button> <button onclick="Confirm.Miercoles()">Miercoles</button>';
  
                           
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

function CustomConfirm(){
  this.render = function (dialog,op,id){
    var winW = window.innerWidht;
    var winH = window.innerHeight;
    var dialogverlay = document.getElementById("dialogverlay");
    var dialogbox = document.getElementById("dialogbox");
    dialogverlay.style.display = "block";
    dialogverlay.style.height = winH + "px";
    dialogbox.style.left = (winH/2) - (500*0.5) + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    
    document.getElementById("dialogboxhead").innerHTML = "Agregar a playlist";
    document.getElementById("dialogboxbody").innerHTML = dialog;
    document.getElementById("dialogboxfoot").innerHTML = '<button onclick="Confirm.Domingo(\''+op+'\,\''+id+'\')">Domigo</button> <button onclick="Confirm.Miercoles()">Miercoles</button>';
  }
  this.Miercoles = function (){
    
  }
  
  this.Domingo = function (op,id){
    
  }
}

const confirm = new CustomConfirm();