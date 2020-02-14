const title = document.querySelector('title').textContent;
const h3 = document.querySelector('h3').textContent;
const head = document.querySelector("head");
const body = document.querySelector("body");
//let canto = JSON.parse(localStorage.getItem("cantoSeleccionado"));

let HeadTemplate =
    `<title>${title}</title>` +
    //`<title>${canto[0].titulo}</title>` +
    '<meta charset="utf-8">' +
    '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    
    "<!-- import the webpage's stylesheet -->" +
    '<link rel="stylesheet" href="/style.css">' +
    '<link rel="manifest" href="/manifest.json">' +
    '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">' +
    "<link rel='icon' href='https://cdn.glitch.com/4c1a86ab-31d9-449a-9f16-4378baabdc2c%2Ffavicon.ico?v=1580511400868' type='image/x-icon'/ >";

let BodyTemplate = 
    '<header class="header">' +
      '<div class="encabezado-lista">' +
        `<h2>${title}</h2>` +
        //`<h2>${canto[0].titulo}</h2>` +
        `<h3>${h3}</h3>` +
        //`<h3>${canto[0].autor}</h3>` +
        '<div class ="arrowRegresar">' +
          '<i class="fas fa-arrow-left"></i>' +
        '</div>' +
      '</div>' +
    '</header>' +
    
    '<hr>' +
        
    '<div class="cuerpo-lista">' +
      '<ul id="opcionesDeCanto">' +
      '</ul>' +
    '</div>' +
      
    '<div id="dialogverlay"></div>' +
    '<div id="dialogbox">' +
      '<div>' +
        '<div id="dialogboxhead"></div>' +
        '<div id="dialogboxbody"></div>' +
        '<div id="dialogboxfoot"></div>' +
      '</div>' +
    '</div>';

//console.log(HeadTemplate);
//console.log(BodyTemplate);
head.innerHTML = HeadTemplate;
body.innerHTML = BodyTemplate;