
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");

//Filter event
if (busquedaItem){
busquedaItem.addEventListener("keyup",filterItems);
}

//Filter function
function filterItems(e){
  var text = e.target.value.toLowerCase();
  var lista = listaItems.getElementsByTagName("li");
  Array.from(lista).forEach(function(listas){
    var itemName = listas.firstChild.textContent;
      console.log(itemName);
    if (itemName.toLowerCase().indexOf(text) != -1){
      listas.style.display = "block";
    } else {
      listas.style.display = "none";
    }
  }); 
}


/*
const canciones = [
  {
    pagina: <a href="A_Cada_Instante.html">A cada instante</a>,
    titulo: "A Cada Instante",
    autor: "B",
    tono: "B"
//    categoria = {"Adoracion"}
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
