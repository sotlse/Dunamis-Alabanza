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

let tituloBarraDeRepeticion = document.querySelector(".tituloBarraDeRepeticion");
let textoBarraDeRepeticion = document.querySelector(".textoBarraDeRepeticion");
let tituloCasillaDeRepeticion = document.querySelector(".tituloCasillaDeRepeticion");
let textoCasillaDeRepeticion = document.querySelector(".textoCasillaDeRepeticion");
let tituloSegno = document.querySelector(".tituloSegno");
let textoSegno = document.querySelector(".textoSegno");
let tituloCoda = document.querySelector(".tituloCoda");
let textoCoda = document.querySelector(".textoCoda");
let tituloDC = document.querySelector(".tituloDC");
let textoDC = document.querySelector(".textoDC");
let tituloDCalCoda = document.querySelector(".tituloDCalCoda");
let textoDCalCoda = document.querySelector(".textoDCalCoda");
let tituloDS = document.querySelector(".tituloDS");
let textoDS = document.querySelector(".textoDS");
let tituloDSalCoda = document.querySelector(".tituloDSalCoda");
let textoDSalCoda = document.querySelector(".textoDSalCoda");

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

let tituloMaj7 = document.querySelector(".tituloMaj7");
let textoMaj7 = document.querySelector(".textoMaj7");
let titulo7 = document.querySelector(".titulo7");
let texto7 = document.querySelector(".texto7");
let titulom7 = document.querySelector(".titulom7");
let textom7 = document.querySelector(".textom7");
let titulom7b5 = document.querySelector(".titulom7b5");
let textom7b5 = document.querySelector(".textom7b5");
let tituloDim7 = document.querySelector(".tituloDim7");
let textoDim7 = document.querySelector(".textoDim7");
let tituloAug7 = document.querySelector(".tituloAug7");
let textoAug7 = document.querySelector(".textoAug7");
let titulo6 = document.querySelector(".titulo6");
let texto6 = document.querySelector(".texto6");
let titulom6 = document.querySelector(".titulom6");
let textom6 = document.querySelector(".textom6");
let tituloAdd9 = document.querySelector(".tituloAdd9");
let textoAdd9 = document.querySelector(".textoAdd9");
let titulo7sus4 = document.querySelector(".titulo7sus4");
let texto7sus4 = document.querySelector(".texto7sus4");
let titulo7sus2 = document.querySelector(".titulo7sus2");
let texto7sus2 = document.querySelector(".texto7sus2");

let titulo9 = document.querySelector(".titulo9");
let texto9 = document.querySelector(".texto9");
let titulom9 = document.querySelector(".titulom9");
let textom9 = document.querySelector(".textom9");
let titulomaj9 = document.querySelector(".titulomaj9");
let textomaj9 = document.querySelector(".textomaj9");
let titulo11 = document.querySelector(".titulo11");
let texto11 = document.querySelector(".texto11");
let titulom11 = document.querySelector(".titulom11");
let textom11 = document.querySelector(".textom11");
let titulo13 = document.querySelector(".titulo13");
let texto13 = document.querySelector(".texto13");




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

tituloBarraDeRepeticion.addEventListener("click",(e) => {
  cambio(textoBarraDeRepeticion);
});

tituloCasillaDeRepeticion.addEventListener("click",(e) => {
  cambio(textoCasillaDeRepeticion);
});

tituloSegno.addEventListener("click",(e) => {
  cambio(textoSegno);
});

tituloCoda.addEventListener("click",(e) => {
  cambio(textoCoda);
});

tituloDC.addEventListener("click",(e) => {
  cambio(textoDC);
});

tituloDCalCoda.addEventListener("click",(e) => {
  cambio(textoDCalCoda);
});

tituloDS.addEventListener("click",(e) => {
  cambio(textoDS);
});

tituloDSalCoda.addEventListener("click",(e) => {
  cambio(textoDSalCoda);
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

tituloMaj7.addEventListener("click",(e) => {
  cambio(textoMaj7);
});

titulo7.addEventListener("click",(e) => {
  cambio(texto7);
});

titulom7.addEventListener("click",(e) => {
  cambio(textom7);
});

titulom7b5.addEventListener("click",(e) => {
  cambio(textom7b5);
});

tituloDim7.addEventListener("click",(e) => {
  cambio(textoDim7);
});

tituloAug7.addEventListener("click",(e) => {
  cambio(textoAug7);
});

titulo6.addEventListener("click",(e) => {
  cambio(texto6);
});

titulom6.addEventListener("click",(e) => {
  cambio(textom6);
});

tituloAdd9.addEventListener("click",(e) => {
  cambio(textoAdd9);
});

titulo7sus4.addEventListener("click",(e) => {
  cambio(texto7sus4);
});

titulo7sus2.addEventListener("click",(e) => {
  cambio(texto7sus2);
});

titulo9.addEventListener("click",(e) => {
  cambio(texto9);
});

titulom9.addEventListener("click",(e) => {
  cambio(textom9);
});

titulomaj9.addEventListener("click",(e) => {
  cambio(textomaj9);
});

titulo11.addEventListener("click",(e) => {
  cambio(texto11);
});

titulom11.addEventListener("click",(e) => {
  cambio(textom11);
});

titulo13.addEventListener("click",(e) => {
  cambio(texto13);
});
