function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  /*-------Declaracion de variables------*/

//Variables en categoria Basico
let tituloTempo = document.querySelector(".tituloTempo");
let textoTempo = document.querySelector(".textoTempo");
let tituloFM = document.querySelector(".tituloFM");
let textoFM = document.querySelector(".textoFM");
let tituloCompas = document.querySelector(".tituloCompas");
let textoCompas = document.querySelector(".textoCompas");
let tituloRepeticiones = document.querySelector(".tituloRepeticiones");
let textoRepeticiones = document.querySelector(".textoRepeticiones");

//Variables en categoria Escalas

//Variable en categoria Acordes
let tituloIntervalo = document.querySelector(".tituloIntervalo");
let textoIntervalo = document.querySelector(".textoIntervalo");
let tituloTriadas = document.querySelector(".tituloTriadas");
let textoTriadas = document.querySelector(".textoTriadas");
let tituloCuatriadas = document.querySelector(".tituloCuatriadas");
let textoCuatriadas = document.querySelector(".textoCuatriadas");
let tituloMas = document.querySelector(".tituloMas");
let textoMas = document.querySelector(".textoMas");
//acordes
let tituloMayor = document.querySelector(".tituloMayor");
let textoMayor = document.querySelector(".textoMayor");
let tituloMenor = document.querySelector(".tituloMenor");
let textoMenor = document.querySelector(".textoMenor");
let tituloAug = document.querySelector(".tituloAug");
let textoAug = document.querySelector(".textoAug");
let tituloDim = document.querySelector(".tituloDim");
let textoDim = document.querySelector(".textoDim");
let tituloSus2 = document.querySelector(".tituloSus2");
let textoSus2 = document.querySelector(".textoSus2");
let tituloSus4 = document.querySelector(".tituloSus4");
let textoSus4 = document.querySelector(".textoSus4");




/*-------Cambiar display cuando presionan un titulo------*/
function cambio(texto){
  if (texto.style.display == "none" || texto.style.display == "")
    texto.style.display = "block";
  else
    texto.style.display = "none";
}
//Basico
tituloTempo.addEventListener("click",(e) => {
    cambio(textoTempo);
});

tituloFM.addEventListener("click",(e) => {
    cambio(textoFM);
});

tituloCompas.addEventListener("click",(e) => {
  cambio(textoCompas);
});

tituloRepeticiones.addEventListener("click",(e) => {
  cambio(textoRepeticiones);
});
//Escalas
//Acordes
tituloIntervalo.addEventListener("click",(e) => {
  cambio(textoIntervalo);
});

tituloTriadas.addEventListener("click",(e) => {
  cambio(textoTriadas);
});

tituloCuatriadas.addEventListener("click",(e) => {
  cambio(textoCuatriadas);
});

tituloMas.addEventListener("click",(e) => {
  cambio(textoMas);
});

tituloMayor.addEventListener("click",(e) => {
  cambio(textoMayor);
});

tituloMenor.addEventListener("click",(e) => {
  cambio(textoMenor);
});

tituloAug.addEventListener("click",(e) => {
  cambio(textoAug);
});

tituloDim.addEventListener("click",(e) => {
  cambio(textoDim);
});

tituloSus2.addEventListener("click",(e) => {
  cambio(textoSus2);
});

tituloSus4.addEventListener("click",(e) => {
  cambio(textoSus4);
});



