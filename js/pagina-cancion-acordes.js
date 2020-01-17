//const title = document.querySelector('title').textContent;
const h2 = document.querySelector('.tituloDelCanto');
const h3 = document.querySelector('.autorDelCanto');
//const AcordeCanto = document.qquerySelector('.AcordeCanto');
const pre = document.querySelector('pre');
const tono = document.querySelector('.tono');

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
            "<span style='font-size:18px;'>&#9833;</span>= XX" +
        '</div>' +
        "<div class='nombre'>" +
            'ACORDES' +
        '</div>' +
        "<div class='tono'>" +
            Tono: <span class = 'AcordeCanto'>E</span> +
        '</div>' +
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
            "<i class='fas fa-text-height'> -</i>" +
        '</button>' +

        "<button class='botonTextoGrande'>" +
            "<i class='fas fa-text-height'> +</i>" +
        '</button>' +

        "<button class='botonCasa'>" +
            "<i class='fa fa-home'></i>" +
        '</button>' +
   
    '</nav>';
