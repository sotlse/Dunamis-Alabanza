
var busquedaItem = document.getElementById("busqueda");
var listaItems = document.getElementById("lista");
var opcionesItems = document.getElementById("opcionesDeCanto");
var botonRegresar = document.querySelector(".RegresarPagina");
var botonEditar = document.querySelector(".EditarLista");
var botonBorrarListaDomingo = document.querySelector(".borrarListaDomingo");
var botonBorrarListaMiercoles = document.querySelector(".borrarListaMiercoles");
let titulo = document.querySelector('title').textContent;
let cancionesDomingo = [];
let cancionesMiercoles = [];
let link;
let tipo;
let totalCantos=300
let seleccionado;
 
//Constructor de canto guardado
class cantoGuardado {
  constructor(link,tipo,titulo){
    this.pagina = link;
    this.tipo = tipo;
    this.titulo = titulo;
  }
}

//Base de datos de canciones
class UI {
  static desplegarCantos(){
    const baseCanciones = [
    {
      pagina: "A_Cada_Instante.html",
      titulo: "A Cada Instante",
      autor: "Marco Barrientos",
      tono: "Tono:F",
      categoria: ["Adoracion","Servicio"],
    },
  
    {
      pagina: "A_El_Alto_Y_Sublime.html",
      titulo: "A el Alto y Sublime",
      autor: "Jesus Adrian Romero",
      tono: "Tono:Bb",
      categoria: ["Adoracion"],
    },
  
    {
      pagina:"Abre_Los_Cielos.html",
      titulo: "Abre los Cielos",
      autor: "Jesus Adrian Romero",
      tono: "Tono:A#",
      categoria: ["Alabanza"],
    },
    
    {
      pagina:"",
      titulo:"",
      autor:"",
      tono:"",
      categoria:["Adoracion"],
    }
      
    ];
    //const cantos = baseCanciones;
    if(titulo === "Dunamis Adoracion | General"){
      baseCanciones.forEach((canto) => UI.agregarCantosAListaCategoria(canto));
    }
    
    else if(titulo === "Dunamis Adoracion | Adoracion"){
      CategoriaCantos("Adoracion");
    }
    
    else if(titulo === "Dunamis Adoracion | Alabanza"){
      CategoriaCantos("Alabanza");
    }
    
    else if(titulo === "Dunamis Adoracion | Confesion"){
      CategoriaCantos("Confesion");
    }
    
    else if(titulo === "Dunamis Adoracion | Evangelismo"){
      CategoriaCantos("Evangelismo");
    }
    
    else if(titulo === "Dunamis Adoracion | Servicio"){
      CategoriaCantos("Servicio");
    }
    
    else if(titulo === "Dunamis Adoracion | Unidad"){
      CategoriaCantos("Unidad");
    }
    
    else if(titulo === "Dunamis Adoracion | Oracion"){
      CategoriaCantos("Oracion");
    }
    
    else if(titulo === "Dunamis Adoracion | Fortaleza"){
      CategoriaCantos("Fortaleza");
    }
    
    else if(titulo === "Dunamis Adoracion | Perdon"){
      CategoriaCantos("Perdon");
    }
    
    else if(titulo === "Dunamis Adoracion | Accion de Gracias"){
      CategoriaCantos("Accion de Gracias");
    }
    
    else if(titulo === "Dunamis Adoracion | Semana Santa"){
      CategoriaCantos("Semana Santa");
    }
    
    else if(titulo === "Dunamis Adoracion | Navidad"){
      CategoriaCantos("Navidad");
    }
    
    else if(titulo === "Dunamis Adoracion | Himnos"){
      CategoriaCantos("Himnos");
    }
    
    else if(titulo === "Dunamis Adoracion | Servicios Especiales"){
      CategoriaCantos("Servicios Especiales");
    }
    
    function CategoriaCantos(categoria){
      let filtroCategorias = baseCanciones.filter(function(cantos){
        for (let i=0; i<totalCantos;i++){
          if (cantos.categoria [i]== categoria){
            return true;
          }
        }
      });
      filtroCategorias.forEach((canto) => UI.agregarCantosAListaCategoria(canto));
    }
  }

  static agregarCantosAListaCategoria(canto){
    const olLista = document.querySelector("#lista");
    const crearli = document.createElement('li');
    crearli.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:rgb(21, 4, 130)">${canto.autor}</span> </a>- ${canto.tono}`;
    olLista.appendChild(crearli);
  }
}

//Cuando se cargue la pagina, agregar base de datos
document.addEventListener("DOMContentLoaded", UI.desplegarCantos);

//Boton Add event
if(opcionesItems){
opcionesItems.addEventListener("click", agregarCanto);
}
  
//Filter event
if (busquedaItem){
busquedaItem.addEventListener("keyup",filterItems);
}

//Boton regresar event
if(botonRegresar){
  botonRegresar.addEventListener("click", Regresar);
}

//Regresar pagina function
function Regresar(){
  window.history.back();
}

//Playlist
class Playlist{
  static agregarCantos(canciones,lista,cancionesEditar,listaEditar){
    if (canciones != null){
      canciones.forEach(function (canto){
        const li = document.createElement("li");
        /*li.draggable = "true";*/
        li.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:black">${canto.tipo}</span></a> <button class="boton-delete">
            X</button>`; 
        lista.appendChild(li);
      });
      cancionesEditar.forEach(function (canto){
        const li = document.createElement("li");
        li.innerHTML = `<a href="${canto.pagina}"></a>${canto.titulo} - ${canto.tipo}<button class="boton-delete">
            X</button>`; 
        listaEditar.appendChild(li);
      });
      listaEditar.style.display = "none";
    }
  }
  
  static agregarBotones(canciones,lista,listaEditar){
    //Agregar boton OK para inicializar
    let nav = document.querySelector(".nav");  
    let botonBorrar = document.querySelector(".divBorarLista");
    let divOk = document.createElement("div");
    divOk.className = "divOk";
    let botonOK = document.createElement("button");
    botonOK.className = "botonOK";
    botonOK.appendChild(document.createTextNode("OK"));
    divOk.appendChild(botonOK);
    nav.insertBefore (divOk,botonBorrar);
    divOk.style.display = "none";
    
    //Agregar botones mover arriba y abajo para inicializar
    const div = document.createElement ("div");
    div.className = "claseEditar";
    let body = document.querySelector(".bodyPlaylist");
    body.insertBefore (div,nav);
    let botonUp = document.createElement("button");
    botonUp.className = "botonUp";
    let botonDown = document.createElement("button");
    botonDown.className = "botonDown";
    div.appendChild(botonUp);
    botonUp.appendChild(document.createTextNode("Mover arriba"));
    div.appendChild(botonDown);
    botonDown.appendChild(document.createTextNode("Mover abajo"));
    div.style.display = "none";
  }
  
  static agregarMensajeNoCantos(lista,mensaje,listaEditar){
    if (lista.lastElementChild === null){
      const div = document.createElement ('div');
      div.className = "NoHayCantos";
      div.appendChild(document.createTextNode(mensaje));
      const container = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,lista);
      listaEditar.style.display = "none";
    }
    else { //Si no hay canto, no funcionan los botones de Editar y Borrar lista
      botonBorrarListaDomingo.addEventListener("click",BorrarListaDomingo);
    }
  }
  
  static funcionBotonEditar(lista,listaEditar){
    let noseleccionado, array=[], parent;
    let index = null;
    if (lista.lastElementChild != null){
      botonEditar.addEventListener("click",botoneditar);
    }
    function botoneditar(){
      let divOk = document.querySelector(".divOk");
      let divEditar = document.querySelector(".divEditar");
      let div = document.querySelector(".claseEditar");
      
      //Ocultar y mostrar bloques
      div.style.display = "block";
      lista.style.display = "none";
      listaEditar.style.display = "block";
      divEditar.style.display = "none";
      divOk.style.display = "block";
      
      //Seleccionar canto a editar
      let items = document.querySelectorAll("#playlistDomingoEditar li");
      items.forEach(function (item){
         array.push(item.innerHTML);
      });
      items.forEach(function (item){
        item.onclick = function(){
        index = array.indexOf(this.innerHTML);
        if (noseleccionado){
          noseleccionado.className = "noselected";
        } 
        this.className = "selected";
        noseleccionado = this;
        items = document.querySelectorAll("#playlistDomingoEditar li");
        seleccionado = item;
        } 
      });
      
      
      //Mover canto seleccionado hacia arriba o abajo
      let botonUp = document.querySelector(".botonUp");
      let botonDown = document.querySelector(".botonDown");
      
      botonUp.onclick = function (){
        if (index != "undefined" || index != null){
          let items = document.querySelectorAll("#playlistDomingoEditar li");
          parent = items[index].parentElement;
          if (index > 0){
            parent.insertBefore(items[index],items[index-1]);
            index--;
          }
          items = document.querySelectorAll("#playlistDomingoEditar li");
          array = [];
          items.forEach(function (item){
            array.push(item.innerHTML);
          });
        }  
      }
      
      botonDown.onclick = function (){
          if (index != "undefined" || index != null){
          let items = document.querySelectorAll("#playlistDomingoEditar li");
          parent = items[index].parentElement;
          if (index < (array.length-1)){
            parent.insertBefore(items[index],items[index+2]);
            index++;
          }
          items = document.querySelectorAll("#playlistDomingoEditar li");
          array = [];
          items.forEach(function (item){
            array.push(item.innerHTML);
          });
        } 
      }
    }
  }
  
  static funcionBotonOk(lista,listaEditar,canciones,cancionesEditar){
    let botonOK = document.querySelector(".botonOK");
    botonOK.addEventListener("click",botonok);
    function botonok(){
      let divOk = document.querySelector(".divOk");
      let divEditar = document.querySelector(".divEditar");
      let div = document.querySelector(".claseEditar");
      div.style.display = "none";
      divOk.style.display = "none";
      listaEditar.style.display = "none";
      divEditar.style.display= "block";
      lista.style.display = "block"; 
      seleccionado.className = "noselected";
      
      
      console.log(lista);
      console.log(listaEditar);
      console.log(lista);
    } 
  }
  
  static borrarCanto(lista,mensaje,listaEditar,canciones){
    lista.addEventListener("click",(e) =>  {
      let el = e.target;
      //console.log(el);
      if (el.classList.contains("boton-delete")){
        el.parentElement.remove();
        //let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
        canciones.forEach((canto, index)=>{
          if(canto.pagina === el.previousElementSibling.href){
            canciones.splice(index,1);
          }
        });
        localStorage.setItem("cancionesDomingo",JSON.stringify(canciones));
        Playlist.agregarMensajeNoCantos(lista,mensaje,listaEditar);
        /*if (document.querySelector("#playlistDomingo").lastElementChild === null){
          const div = document.createElement ('div');
          div.className = "NoHayCantos";
          div.appendChild(document.createTextNode("Agrega cantos a la Playlist DOMINGO"));
          const container = document.querySelector(".cuerpo-lista");
          const ol = document.querySelector("#playlistDomingo");
          container.insertBefore(div,ol);
        }*/
      }
    });
  }
  
  static borrarLista(lista){
    
  }
}

//Cuando se cargue la pagina Playlist Domingo, agregar cantos
if(titulo === "Playlist Domingo"){
  //document.addEventListener("DOMContentLoaded", PlaylistDomingo);
  let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
  let cancionesEditar = JSON.parse(localStorage.getItem("cancionesDomingo"));
  const lista = document.querySelector("#playlistDomingo");
  let listaEditar = document.querySelector("#playlistDomingoEditar");
  let mensaje = "Agrega cantos a la Playlist DOMINGO";
  Playlist.agregarCantos(canciones,lista,cancionesEditar,listaEditar);
  Playlist.agregarBotones(canciones,lista,listaEditar);
  Playlist.agregarMensajeNoCantos(lista,mensaje,listaEditar);
  Playlist.funcionBotonEditar(lista,listaEditar);
  Playlist.funcionBotonOk(lista,listaEditar,canciones,cancionesEditar);
  //Playlist.funcionBotonUpDown();
  Playlist.borrarCanto(lista,mensaje,listaEditar,canciones);
  Playlist.borrarLista(lista);
}  


  //Agregar cantos a playlist
  function PlaylistDomingo(){
    let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
    if (canciones != null){
      canciones.forEach(function (canto){
      const lista = document.querySelector("#playlistDomingo");
      let listaEditar = document.querySelector("#playlistDomingoEditar");
      listaEditar.style.display = "none";
      const li = document.createElement("li");
      /*li.draggable = "true";*/
      li.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:black">${canto.tipo}</span></a> <button class="boton-delete">
            X</button>`; 
      lista.appendChild(li);
      
        
    });
    }
    
    //Borrar canto seleccionado
    document.querySelector("#playlistDomingo").addEventListener("click",(e) =>  {
      let el = e.target;
      //console.log(el);
      if (el.classList.contains("boton-delete")){
        el.parentElement.remove();
        let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
        canciones.forEach((canto, index)=>{
          if(canto.pagina === el.previousElementSibling.href){
            canciones.splice(index,1);
          }
        });
        localStorage.setItem("cancionesDomingo",JSON.stringify(canciones));
        if (document.querySelector("#playlistDomingo").lastElementChild === null){
          const div = document.createElement ('div');
          div.className = "NoHayCantos";
          div.appendChild(document.createTextNode("Agrega cantos a la Playlist DOMINGO"));
          const container = document.querySelector(".cuerpo-lista");
          const ol = document.querySelector("#playlistDomingo");
          container.insertBefore(div,ol);
        }
      }
    });
    
    if (document.querySelector("#playlistDomingo").lastElementChild === null){
          const div = document.createElement ('div');
          div.className = "NoHayCantos";
          div.appendChild(document.createTextNode("Agrega cantos a la Playlist DOMINGO"));
          const container = document.querySelector(".cuerpo-lista");
          const ol = document.querySelector("#playlistDomingo");
          container.insertBefore(div,ol);
    }
    else //Si no hay canto, no funcionan los botones de Editar y Borrar lista
      {
        botonBorrarListaDomingo.addEventListener("click",BorrarListaDomingo);
        botonEditar.addEventListener("click",Editar);
      }
    
  let nav = document.querySelector(".nav");  
  let botonBorrar = document.querySelector(".divBorarLista");
  let divOk = document.createElement("div");
  divOk.className = "divOk";
  let botonOK = document.createElement("button");
  botonOK.className = "botonOK";
  botonOK.appendChild(document.createTextNode("OK"));
  
  divOk.appendChild(botonOK);
  nav.insertBefore (divOk,botonBorrar);
  divOk.style.display = "none";
  }



//Editar pagina function
function Editar(e){
  let noseleccionado;
  let seleccionado;
  
  let lista = document.querySelector("#playlistDomingo");
  let listaEditar = document.querySelector("#playlistDomingoEditar");
  let cancionesEditar = JSON.parse(localStorage.getItem("cancionesDomingo"));
  //Agregar botones de editar
  botonesEditar(lista,listaEditar,cancionesEditar);
  let botonUp = document.querySelector(".botonUp");
  let botonDown = document.querySelector(".botonDown");
  //Seleccionar elemento de lista domingo y moverlo    
  
  let array=[],index,parent;
  //botonUp.addEventListener("click",moverArriba);
  //botonDown.addEventListener("click",moverAbajo);  
  

    let items = document.querySelectorAll("#playlistDomingoEditar li");
    items.forEach(function (item){
      array.push(item.innerHTML);
    });
    items.forEach(function (item){
      item.onclick = function(){
        index = array.indexOf(this.innerHTML);
        if (noseleccionado){
          noseleccionado.className = "noselected";
        } 
        this.className = "selected";
        noseleccionado = this;
        console.log(this.innerHTML + index);
      items = document.querySelectorAll("#playlistDomingoEditar li");
      } 
      
    });   
    
  
    botonUp.onclick = function (){
      let items = document.querySelectorAll("#playlistDomingoEditar li");
      parent = items[index].parentElement;
      parent.insertBefore(items[index],items[index-1]);
      index--;
      items = document.querySelectorAll("#playlistDomingoEditar li");
      array = [];
      items.forEach(function (item){
        array.push(item.innerHTML);
      });
      console.log(array);
      console.log(items);
    }
    
    
 
    
   
    
    function moverArriba(seleccionado){
      
      //parent = items[index].parentNode;
      console.log(items[index]);
      console.log(items[index-1]);
      listaEditar.insertBefore(items[index],items[index-1]);
      index--;
      console.log(index);
      /*let Editar = document.querySelector("#playlistDomingoEditar");
      let insertarAntes = seleccionado.previousElementSibling;
      //console.log(Editar);
      Editar.insertBefore(seleccionado,seleccionado.previousElementSibling);

      //console.log(insertarAntes);
      /*let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
      canciones.forEach((canto, index)=>{
          console.log(index);
          canciones.splice(index,1);
          if(canto.pagina === seleccionado.previousElementSibling.href){
            canciones.splice(index,1); 
          }
        
                          
    });*/
    

    }
  
    function moverAbajo(){
      console.log("abajo");
    }

//}); 
  

}



//En Playlist, Agregar botones de edicion y "ok" mientras oculta el boton "Editar" y oculta lista de Playlist por la de editar
function botonesEditar(lista,listaEditar,cancionesEditar){
  let divEditar = document.querySelector(".divEditar");
  divEditar.style.display = "none";
  /*let botonBorrar = document.querySelector(".divBorarLista");
  let divOk = document.createElement("div");
  divOk.className = "divOk";
  let botonOK = document.createElement("button");
  botonOK.className = "botonOK";
  botonOK.appendChild(document.createTextNode("OK"));
  botonOK.addEventListener("click",Ok);
  divOk.appendChild(botonOK);
  nav.insertBefore (divOk,botonBorrar);*/
  
  listaEditar.style.display = "block";
  let botonOK = document.querySelector(".botonOK");
  let divOk = document.querySelector(".divOk");
  divOk.style.display = "block";
  //botonOK.addEventListener("click",Ok);
  
  let nav = document.querySelector(".nav");
  const div = document.createElement ("div");
  div.className = "claseEditar";
  let body = document.querySelector(".bodyPlaylist");
  body.insertBefore (div,nav);
  let botonUp = document.createElement("button");
  botonUp.className = "botonUp";
  let botonDown = document.createElement("button");
  botonDown.className = "botonDown";
  div.appendChild(botonUp);
  botonUp.appendChild(document.createTextNode("Mover arriba"));
  div.appendChild(botonDown);
  botonDown.appendChild(document.createTextNode("Mover abajo"));
      //Mover elemento seleccionado
  //botonUp.addEventListener("click",moverArriba); 
  //botonDown.addEventListener("click",moverAbajo);

  botonOK.onclick = function (){ 
    div.style.display = "none";
    divOk.style.display = "none";
    divEditar.style.display= "block";
    lista.style.display = "block";
     
    
    let ol = listaEditar;
    let ultimo = ol.lastElementChild;
    while(ultimo){
      ol.removeChild(ultimo);
      ultimo = ol.lastElementChild;
    }
    listaEditar.style.display = "none";
    while (listaEditar.hasChildNodes()){
      listaEditar.removeChild(listaEditar.firstChild);
    } 
    lista=listaEditar;
  }
  
  //Ocultar lista de Playlist y poner listaEditar
  lista.style.display = "none";
  listaEditar.style.display = "block";
  cancionesEditar.forEach(function (canto){
    const li = document.createElement("li");
    li.innerHTML = `<a href="${canto.pagina}"></a>${canto.titulo} - ${canto.tipo}<button class="boton-delete">
            X</button>`; 
    listaEditar.appendChild(li);
      //listaEditar.style.display = "none";
  });
}


  


//Borrar lista domingo function
function BorrarListaDomingo(e){
  if(confirm("ESTAS SEGURO DE BORRAR TODA LA LISTA?")){
    localStorage.removeItem("cancionesDomingo");
    let ol = document.querySelector("#playlistDomingo");
    let ultimo = ol.lastElementChild;
    while(ultimo){
      console.log(ultimo);
      ol.removeChild(ultimo);
      ultimo = ol.lastElementChild;
    }
    const div = document.createElement ('div');
    div.className = "NoHayCantos";
    div.appendChild(document.createTextNode("Agrega cantos a la Playlist DOMINGO"));
    const container = document.querySelector(".cuerpo-lista");
    container.insertBefore(div,ol);
  }
}

 
//botonAgregar function
function agregarCanto(e){
  if(e.target.classList.contains("boton-add")){
    var cancion = e.target.parentElement;
    var winW = window.innerWidht;
    var winH = window.innerHeight;
    var dialogverlay = document.getElementById('dialogverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogverlay.style.display = "block";
    dialogverlay.style.height = winH/3 + "px";
    dialogbox.style.left = (winH/2) - (500*0.5) + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').innerHTML = "Agregar a playlist";
    //document.getElementById('dialogboxbody').innerHTML = "Elige";
    document.getElementById('dialogboxfoot').innerHTML = '<button id=Domingo>Domingo</button>  <button id=Miercoles>Miercoles</button>  <button id="Cancelar">Cancelar</button>';
  
    var CancelarBoton = document.getElementById ('Cancelar');
    var DomingoBoton = document.getElementById ('Domingo');
    var MiercolesBoton = document.getElementById ('Miercoles');
    CancelarBoton.addEventListener ("click",Cancelar);
    DomingoBoton.addEventListener ("click",Domingo);
    MiercolesBoton.addEventListener ("click",Miercoles);
                                   
    
    function Cancelar(e){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";  
    } 
    
    
    function Domingo(e){
      link = cancion.querySelector('a').href;
      tipo=cancion.querySelector('a').textContent;
      const CantoGuardado = new cantoGuardado(link,tipo,titulo);
      if(localStorage.getItem("cancionesDomingo") === null){
        cancionesDomingo = [];
        cancionesDomingo.push(CantoGuardado);
        localStorage.setItem("cancionesDomingo",JSON.stringify(cancionesDomingo));
      }else{
        cancionesDomingo = JSON.parse(localStorage.getItem("cancionesDomingo"));
        cancionesDomingo.push(CantoGuardado);
        localStorage.setItem("cancionesDomingo",JSON.stringify(cancionesDomingo)); 
      }
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
    
      //Mostrar mensaje de canto agregado
      const div = document.createElement ('div');
      div.className = 'anuncio';
      div.appendChild(document.createTextNode("Canto agregado a DOMINGO"));
      const container = document.querySelector(".contenido");
      const ul = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,ul);
      setTimeout(()=> document.querySelector(".anuncio").remove(),2500);
    }
    
    
    function Miercoles(e){
      link = cancion.querySelector('a').href;
      tipo=cancion.querySelector('a').textContent;
      const CantoGuardado = new cantoGuardado(link,tipo,titulo);
      if(localStorage.getItem("cancionesMiercoles") === null){
        cancionesMiercoles = [];
        cancionesMiercoles.push(CantoGuardado);
        localStorage.setItem("cancionesMiercoles",JSON.stringify(cancionesMiercoles));
      }else{
        cancionesMiercoles = JSON.parse(localStorage.getItem("cancionesMiercoles"));
        cancionesMiercoles.push(CantoGuardado);
        localStorage.setItem("cancionesMiercoles",JSON.stringify(cancionesMiercoles));
      } 
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogverlay').style.display = "none";
      
      //Mostrar mensaje de canto agregado
      const div = document.createElement ('div');
      div.className = 'anuncioM';
      div.appendChild(document.createTextNode("Canto agregado a MIERCOLES"));
      const container = document.querySelector(".contenido");
      const ul = document.querySelector(".cuerpo-lista");
      container.insertBefore(div,ul);
      setTimeout(()=> document.querySelector(".anuncioM").remove(),2500);
    }
  }
}

//Filter function
function filterItems(e){
  let filterValue = document.getElementById('busqueda').value.toUpperCase();
  let ol = document.getElementById("lista");
  console.log(ol);
  let li = ol.querySelectorAll("li");
  for (let i=0;i<li.length;i++){
    let a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}





  




