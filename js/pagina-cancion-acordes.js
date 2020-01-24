/*-------------NO FUNCIONO-------------*/

//document.addEventListener("DOMContentLoaded", desplegar);
  
//function desplegar(){
const title = document.querySelector('title').textContent;
const h2 = document.querySelector('.tituloDelCanto').textContent;
const h3 = document.querySelector('.autorDelCanto').textContent;
//const AcordeCanto = document.qquerySelector('.AcordeCanto');
const pre = document.querySelector('.canto_body').innerHTML;
const tono = document.querySelector('.tono').innerHTML;
const tempo = document.querySelector('.tempo').innerHTML;
const head = document.querySelector("head");
const body = document.querySelector("body");

console.log(head);

let HeadTemaplate  =
    "<title>" + `${title}` + "</title>" +
    "<meta charset='utf-8'>" +
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1'>" +

    "<!-- import the webpage's stylesheet -->" +
    "<link rel='stylesheet' href='/style.css'>" + 
    "<link rel='manifest' href='/manifest.json'>" +
    "<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>" +
    "<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>";

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
            `${tempo}` +
            //"<span style='font-size:18px;'>&#9833;</span>= XX" +
        '</div>' +
        "<div class='nombre'>" +
            'ACORDES' +
        '</div>' +
        "<div class='tono'>" +
            `${tono}` +
            //Tono: <span class = 'AcordeCanto'>E</span> +
        '</div>' +
    '</div>' +

    "<div class='canto_body'>" + 
        `${pre}` +
    '</div>' +  

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

        "<button class='botonCasa'>" +
            "<i class='fa fa-home'></i>" +
        '</button>' +
   
    '</nav>' +

    "<script src='/script.js' defer></script>" +
    "<script type='text/javascript' src='//ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js'></script>" +
    "<script type='text/javascript' src='/jquery.transposer.js'></script>" +
    "<script type='text/javascript'>" +
      $(function() { 
        $("pre").transpose(); 
      }); 
    '</script>';

    head.innerHTML = HeadTemaplate;
    console.log(head);
    body.innerHTML = BodyTemplate;
    console.log(body);


//}