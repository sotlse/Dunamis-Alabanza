/*------------VARIABLES ---------------*/
const h2 = document.querySelector('.tituloDelCanto').textContent;
const h3 = document.querySelector('.autorDelCanto').textContent;
const pre = document.querySelector('.letra_body').innerHTML;
const head = document.querySelector("head");
const body = document.querySelector("body");


/*-------------------AGREGAR ETIQUETAS A TITULOS Y CAMBIAR SIMBOLOS MUSICALES----------------------------*/
var lines = pre.split(/\r\n|\n/g);
console.log(lines);
var line;
var output = [];

for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    if (line.startsWith("INTRO"))
        output.push("<p class='tituloCanto'>" + line + "</p>");
    else if (line.startsWith("VERSO"))
        output.push("<p class='tituloVerso'>" + line + "</p>");
    else if (line.startsWith("CORO"))
        output.push("<p class='tituloCoro'>" + line + "</p>");
    else if (line.startsWith("PUENTE"))
        output.push("<p class='tituloPuente'>" + line + "</p>");
    else if (line.startsWith("PRECORO"))
        output.push("<p class='tituloPreCoro'>" + line + "</p>");
    else if(line.startsWith("FINAL") || line=="//FINAL://") 
        output.push("<p class='tituloFinal'>" + line + "</p>");
    else{
        if(line.startsWith("//") || line.startsWith("  //")){
            line = line.replace("//","<span class= 'fontNotas'>||:  </span>");
            if(line.endsWith("//"))
                line = line.replace("//","<span class= 'fontNotas'>  :||</span>");
            else if(line.endsWith("//x3"))
                line = line.replace("//x3","<span class= 'fontNotas'>  :|| x3</span>");
            else if(line.endsWith("//x4"))
                line = line.replace("//x4","<span class= 'fontNotas'>  :|| x4</span>");
            output.push(line);
        }
        else if(line.endsWith("//x3")){
            line = line.replace("//x3","<span class= 'fontNotas'>  :|| x3</span>");
            output.push(line);
        }
        else if(line.endsWith("//x4")){
            line = line.replace("//x4","<span class= 'fontNotas'>  :|| x4</span>");
            output.push(line);
        }
        else if(line.endsWith("//")){
            line = line.replace("//","<span class= 'fontNotas'>  :||</span>");
            output.push(line);
        }
        else
            output.push("<span>" + line + "</span>");
        }
}
console.log(output.join("\n"));
rep = output.join("\n");


/*----------------TAMPLATE-----------------*/
let HeadTemplate  =
    "<title>" + `${h2}` + " | Letra" + "</title>" +
    "<meta charset='utf-8'>" +
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1'>" +

    "<!-- import the webpage's stylesheet -->" +
    "<link rel='stylesheet' href='/style.css'>" + 
    "<link rel='manifest' href='/manifest.json'>" +
    "<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>" +
    "<link rel='icon' href='https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Ffavicon.ico?v=1580511400868' type='image/x-icon'/ >";

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

    "<div class='letra_body'>" + `${rep}` + '</div>' +  

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
   
    '</nav>';

head.innerHTML = HeadTemplate;
body.innerHTML = BodyTemplate;