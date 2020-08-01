//const title = document.querySelector('title').textContent;
const h2 = document.querySelector('.tituloDelCanto').textContent;
const h3 = document.querySelector('.autorDelCanto').textContent;
const pre = document.querySelector('.canto_body').innerHTML;
let tono = document.querySelector('.tono').innerHTML;
const tempo = document.querySelector('.tempo').innerHTML;
const head = document.querySelector("head");
const body = document.querySelector("body");
let menor = "";
let botonRotar;


/*-----Separar el acorde si es menor--------*/
if (tono.includes("m")){
    menor = "m";
    tono = tono.substring(0, tono.length-1);
}

/*----------------TAMPLATE-----------------*/
let HeadTemplate  =
    "<title>" + `${h2}` + " | Acordes" + "</title>" +
    "<meta charset='utf-8'>" +
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1'>" +

    "<!-- import the webpage's stylesheet -->" +
    "<link rel='stylesheet' href='/style.css'>" + 
    "<link rel='manifest' href='/manifest.json'>" +
    "<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>" +
    //"<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>" +
    "<link rel='icon' href='https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Ffavicon.ico?v=1580511400868' type='image/x-icon'/ >" +

    "<!-----------------------------JTAB---------------------------------->" +
    "<!-- recommended to avoid security warnings with SVG in IE8 -->" +
    "<meta http-equiv='X-UA-Compatible' content='IE=EmulateIE7' />" +
    "<!-- optional: helpers to preset jtab region heights to avoid rendering jitter -->" +
    "<link type='text/css' rel='stylesheet' href='/css/jtab-helper.css'/>" ;

    //'<!-- mandatory script includes for jtab -->' +
    //"<script src='/js/jtab chords/jquery.js' type='text/javascript'></script>" +
    //"<script src='/js/jtab chords/raphael.js' type='text/javascript'></script>" +
    //"<script src='/js/jtab chords/jtab.js' type='text/javascript'></script>";

let BodyTemplate =
    "<div class='encabezado-lista'>" +
        "<h2 class='tituloDelCanto'>" + `${h2}` + '</h2> '+
        "<h3 class='autorDelCanto'>" + `${h3}` + '</h3> '+
        "<div class ='arrowRegresar'>" + 
            "<i class='fas fa-arrow-left'></i>" +
        '</div>' +
        "<div class ='arrowAvanzar'>" +
            "<i class='fas fa-arrow-right'></i>" +
        '</div>' +
    '</div>' +

    '<hr>'  +

    "<div class='infoCanto'>" +
        "<div class='tempo'>" +
            `<span style='font-size:18px;'>&#9833;</span>= ${tempo}` +
            //`<span style='font-size:18px;'>&#119051;</span>` +
        '</div>' +
        "<div class='nombre'>" +
            'ACORDES' +
        '</div>' +
        "<div class='tono'>" +
            `Tono: <span class = 'AcordeCanto'>${tono}</span>${menor}` +
        '</div>' +
    '</div>' +

"<div class='canto_body'>" + `${pre}` + '</div>' +  

    "<div class = 'flechasRegresarAvanzar'>" +
        "<div class ='arrowRegresar2'>" +
            "<i class='fas fa-arrow-left'></i>" +
        '</div>' +
        "<div class ='arrowAvanzar2'>" +
            "<i class='fas fa-arrow-right'></i>" +
        '</div>' +
    '</div>' +

    "<div class='divAudio'>" +
    '</div>' +

    '<br>' +

    "<div id='mytab'></div>" +

    '<br>' +

    "<nav class = 'navCanto'>" +
        "<button class='botonTransportar'>" +
            'C->D' +
        '</button>' +

        "<button class='botonAudio'>" +
            "<i class='fas fa-music'></i>" +
        '</button>' +

        "<button class='botonTextoChico'>" +
        //<i class="material-icons">format_size</i>
            "<i class='fas fa-text-height'> -</i>" +
        '</button>' +

        "<button class='botonTextoGrande'>" +
            "<i class='fas fa-text-height'> +</i>" +
        '</button>' +

        "<button class='botonMostrarAcorde'>" +
            //"<i class='fas fa-guitar'></i>" +
            "&#119068" +
        '</button>' +

        "<button class='botonCasa'>" +
            "<i class='fa fa-home'></i>" +
        '</button>' +
   
    '</nav>';

head.innerHTML = HeadTemplate;
body.innerHTML = BodyTemplate;

/*---------------Rotacion de la pantalla (pasar de 2 columnas a 1)-----------*/
    function doOnOrientationChange() {
        //Para dispositivos moviles (IOS y Android)
        if (window.orientation != undefined){
          switch(window.orientation) {  
            case -90: case 90:
              cantoBody.style.columnCount= "2";
              break; 
            default:
              cantoBody.style.columnCount= "1";
              break; 
          }
        }
        //Para laptops
        else {
            let nav = document.querySelector(".navCanto");
            botonRotar = document.createElement('button');
            botonRotar.className = "botonRotar";
            let icono = document.createElement('i');
            icono.className = 'fas fa-sync-alt';
                //"<i class='fas fa-sync-alt'></i>";
            botonRotar.appendChild(icono);
            nav.appendChild(botonRotar);
        }
    }
        
    window.addEventListener('orientationchange', doOnOrientationChange);
        
      // Initial execution if needed
    if (window.orientation == undefined)
        doOnOrientationChange();

      //Si presionan el boton rotar para PC o laptops
    if (botonRotar){
        botonRotar.onclick = function(){
            if (document.querySelector(".canto_body").style.columnCount==""){
                document.querySelector(".canto_body").style.columnCount="2";
                console.log(document.querySelector(".canto_body").style.columnCount);
            }
            if (cantoBody.style.columnCount == "2")
                cantoBody.style.columnCount = "1";
            else
                cantoBody.style.columnCount = "2";
        }
    }

//}