const slideButtonNoche = document.querySelector("#botonSlideNoche");
const slideNoche = document.querySelector(".labelNoche");
const body = document.querySelector("body");
const modo = JSON.parse(localStorage.getItem("modoDiaNoche"));
const h = document.querySelector("h2");

if (modo === null)
{
    localStorage.setItem("modoDiaNoche",JSON.stringify(false));
    modo = JSON.parse(localStorage.getItem("modoDiaNoche"));
}

slideButtonNoche.checked = modo;
slide();

slideButtonNoche.addEventListener('click', function() {
    slideButtonNoche.disabled = false;
    slide();
});

function slide() {
    if (slideButtonNoche.checked == true){
        slideNoche.innerHTML = 'Modo Noche';
        localStorage.setItem("modoDiaNoche",JSON.stringify(true));
        slideButtonNoche.checked = true;
        body.style.backgroundColor = "rgb(51, 51, 51)";
        body.style.color = "white";
        h.style.color = "rgb(102, 102, 255)";
    }
    else {
        slideNoche.innerHTML = 'Modo Dia';
        localStorage.setItem("modoDiaNoche",JSON.stringify(false));
        slideButtonNoche.checked = false;
        body.style.backgroundColor = "transparent";
        body.style.color = "black";
        h.style.color = "lightblue";
    }
}


  