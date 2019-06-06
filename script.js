
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");
var opcionesItems = document.getElementById("opcionesDeCanto");
var playListDomingo = document.getElementById("playlistDomingo");

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
      var link = cancion.querySelector('a').href;
      let canciones = [];
      canciones.push(link);
      localStorage.setItem("canciones",JSON.stringify(canciones));
      console.log(canciones); 
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
      //Mostrar mensaje de canto agregado
      const div = document.createElement ('div');
      div.appendChild(document.createTextNode("Canto agregado a playlist DOMINGO"));
      const container = document.querySelector();
    }
    function Miercoles(e){
      console.log(cancion); 
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
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

