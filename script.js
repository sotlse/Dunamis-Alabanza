var busqueda = document.getElementById('busqueda');
var listaItems = document.querySelector('lista');

//Filter event
busqueda.addEventListener('keyup',filterItems);

//Filter function
function filterItems(e){
  var text = e.target.value.toLowerCase();
  var lista = listaItems.getElementByTagName('li');
  Array.from(lista).forEach(function(lista){
    var itemName = lista.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1){
      lista.style.display = 'block';
    } else {
      lista.style.display = 'none';
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
