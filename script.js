const busqueda = document.getElementById('busqueda');
const lista = document.getElementByClass('lista');

//Filter event
busqueda.addEventListener('keyup', filterItems);

//Filter function
function filterItems(e){
  const text = e.target.value.toLowerCase();
  
}

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



