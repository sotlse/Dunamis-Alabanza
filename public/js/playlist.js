let titulo = document.querySelector('title').textContent;
var opcionesItems = document.getElementById("opcionesDeCanto");
var botonEditar = document.querySelector(".EditarLista");
var botonBorrarLista = document.querySelector(".borrarLista");
const lista = document.querySelector(".playlistCantos");
let seleccionado;

/*-----------------------MANIPULACION DE PLAYLISTS-----------------------*/
class Playlist{
    static agregarCantos(canciones,lista){
      if (canciones != null){
        canciones.forEach(function (canto){
          const li = document.createElement("li");
          let color = "black";
          if (JSON.parse(localStorage.getItem("modoDiaNoche")) == true)
            color = "white";
          li.innerHTML = `<a href="${canto.pagina}">${canto.titulo} - <span style="color:${color}">${canto.tipo}</span></a>`; 
          lista.appendChild(li);
        });
      }
    }
    
    static agregarBotones(canciones,lista){
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
      botonBorrar.style.display = "none";
      
      //Agregar botones mover arriba y abajo para inicializar
      const div = document.createElement ("div");
      div.className = "claseEditar";
      let body = document.querySelector(".bodyPlaylist");
      body.insertBefore (div,nav);
      let botonUp = document.createElement("button");
      botonUp.className = "botonUp";
      let br = document.createElement ("br");
      let botonDown = document.createElement("button");
      botonDown.className = "botonDown";
      div.appendChild(botonUp);
      botonUp.appendChild(document.createTextNode("Mover arriba"));
      div.appendChild(br);
      div.appendChild(botonDown);
      botonDown.appendChild(document.createTextNode("Mover abajo"));
      div.style.display = "none";
    }
    
    static agregarMensajeNoCantos(lista,mensaje){
      if (lista.lastElementChild === null){
        const div = document.createElement ('div');
        div.className = "NoHayCantos";
        div.appendChild(document.createTextNode(mensaje));
        const container = document.querySelector(".cuerpo-lista");
        container.insertBefore(div,lista);
        let divEditar = document.querySelector(".divEditar");
        divEditar.style.display = "none";
      }
    }
    
    static funcionBotonEditar(lista,canciones,playlist){
      let noseleccionado, array=[], parent;
      let index = null;
      if (lista.lastElementChild != null){
        botonEditar.addEventListener("click",botoneditar);
      }
      function botoneditar(){
        let divOk = document.querySelector(".divOk");
        let divEditar = document.querySelector(".divEditar");
        let div = document.querySelector(".claseEditar");
        let botonBorrar = document.querySelector(".divBorarLista");
        botonBorrar.style.display = "block";
        while (lista.hasChildNodes()) {   
          lista.removeChild(lista.firstChild);
        }
        canciones.forEach(function (canto){
          const li = document.createElement("li");
          li.innerHTML = `<a href="${canto.pagina}"></a>${canto.titulo} - ${canto.tipo} <button class="boton-delete">
              X</button>`; 
          lista.appendChild(li);
        });
        
        //Ocultar y mostrar bloques
        //div.style.display = "block";
        divEditar.style.display = "none";
        divOk.style.display = "block";
        
        //Seleccionar canto a editar
        let items = document.querySelectorAll(".playlistCantos li");
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
            items = document.querySelectorAll(".playlistCantos li");
            seleccionado = item;   
            div.style.display = "block";
          } 
        });
        
        //Mover canto seleccionado hacia arriba o abajo
        let botonUp = document.querySelector(".botonUp");
        let botonDown = document.querySelector(".botonDown");
        
        botonUp.onclick = function (){
          if (index != "undefined" || index != null){
            let items = document.querySelectorAll(".playlistCantos li");
            parent = items[index].parentElement;
            if (index > 0){
              parent.insertBefore(items[index],items[index-1]);
              index--;
            }
            items = document.querySelectorAll(".playlistCantos li");
            array = [];
            items.forEach(function (item){
              array.push(item.innerHTML);
            });
            
            canciones.forEach((canto, index)=>{
              if(canto.pagina === seleccionado.firstChild.href){
                if (index>0){
                  canciones.splice(index-1,0,canto);
                  canciones.splice(index+1,1);
                }
              }
            });
            localStorage.setItem(playlist,JSON.stringify(canciones));
          }
        }
        
        botonDown.onclick = function (){
            if (index != "undefined" || index != null){
            let items = document.querySelectorAll(".playlistCantos li");
            parent = items[index].parentElement;
            if (index < (array.length-1)){
              parent.insertBefore(items[index],items[index+2]);
              index++;
            }
            items = document.querySelectorAll(".playlistCantos li");
            array = [];
            items.forEach(function (item){
              array.push(item.innerHTML);
            });
              let i = 0;
              console.log(canciones.length);
              canciones.forEach((canto, index)=>{
              if(canto.pagina === seleccionado.firstChild.href && i===0){
                if (index < (canciones.length - 1)){
                  canciones.splice(index,1);
                  canciones.splice(index+1,0,canto);
                  i++;
                }
              } 
            });
            localStorage.setItem(playlist,JSON.stringify(canciones));
          } 
        }
      }
    }
    
    static funcionBotonOk(lista,canciones){
      let botonOK = document.querySelector(".botonOK");
      botonOK.addEventListener("click",botonok);
      function botonok(){
        let divOk = document.querySelector(".divOk");
        let divEditar = document.querySelector(".divEditar");
        let div = document.querySelector(".claseEditar");
        let botonBorrar = document.querySelector(".divBorarLista");
        botonBorrar.style.display = "none";
        div.style.display = "none";
        divOk.style.display = "none";
        divEditar.style.display= "block";
        if (seleccionado){
          seleccionado.className = "noselected";
        }
        while (lista.hasChildNodes()) {   
          lista.removeChild(lista.firstChild);
        }
        Playlist.agregarCantos(canciones,lista);
      } 
    }
    
    static borrarCanto(lista,mensaje,canciones,playlist){
      lista.addEventListener("click",(e) =>  {
        let el = e.target;
        if (el.classList.contains("boton-delete")){
          el.parentElement.remove();
          canciones.forEach((canto, index)=>{
            if(canto.pagina === el.previousElementSibling.href){
              canciones.splice(index,1);
            }
          });
          localStorage.setItem(playlist,JSON.stringify(canciones));
          Playlist.agregarMensajeNoCantos(lista,mensaje);
        }
      });
    }
    
    static borrarLista(lista,mensaje,playlist,canciones,borrarLista){
      if (lista.lastElementChild != null){
        borrarLista.addEventListener("click",BorrarLista);
      }
      function BorrarLista(e){    
        if(confirm("ESTAS SEGURO DE BORRAR TODA LA LISTA?")){
          localStorage.removeItem(playlist);
          let ultimo = lista.lastElementChild;
          while(ultimo){
            lista.removeChild(ultimo);
            ultimo = lista.lastElementChild;
          }
        }
        Playlist.agregarMensajeNoCantos(lista,mensaje);
        let divOk = document.querySelector(".divOk");
        let divEditar = document.querySelector(".divEditar");
        let div = document.querySelector(".claseEditar");
        let botonBorrar = document.querySelector(".divBorarLista");
        botonBorrar.style.display = "none";
        div.style.display = "none";
        divOk.style.display = "none";
      }
    }
  }
  
  //Cuando se cargue la pagina Playlist Domingo, agregar cantos
  if(titulo === "Playlist Domingo"){
    let canciones = JSON.parse(localStorage.getItem("cancionesDomingo"));
    let mensaje = "Agrega cantos a la Playlist DOMINGO";
    let playlist = "cancionesDomingo";
    Playlist.agregarCantos(canciones,lista);
    Playlist.agregarBotones(canciones,lista);
    Playlist.agregarMensajeNoCantos(lista,mensaje);
    Playlist.funcionBotonEditar(lista,canciones,playlist);
    Playlist.funcionBotonOk(lista,canciones);
    Playlist.borrarCanto(lista,mensaje,canciones,playlist);
    Playlist.borrarLista(lista,mensaje,playlist,canciones,botonBorrarLista);
    localStorage.setItem("playlistFlag",1);
  }  
  
  //Cuando se cargue la pagina Playlist Miercoles, agregar cantos
  if(titulo === "Playlist Miercoles"){
    let canciones = JSON.parse(localStorage.getItem("cancionesMiercoles"));
    let mensaje = "Agrega cantos a la Playlist MIERCOLES"; 
    let playlist = "cancionesMiercoles";
    Playlist.agregarCantos(canciones,lista);
    Playlist.agregarBotones(canciones,lista);
    Playlist.agregarMensajeNoCantos(lista,mensaje);
    Playlist.funcionBotonEditar(lista,canciones,playlist);
    Playlist.funcionBotonOk(lista,canciones);
    Playlist.borrarCanto(lista,mensaje,canciones,playlist);
    Playlist.borrarLista(lista,mensaje,playlist,canciones,botonBorrarLista);
    localStorage.setItem("playlistFlag",2);
  }  
  
  /*-----------------------BOTON AGREGAR CANTO A UNA PLAYLIST-----------------------*/
  
  //Boton Add event
  if(opcionesItems){
    opcionesItems.addEventListener("click", agregarCanto);
    }
  
  function agregarCanto(e){
    if(e.target.classList.contains("boton-add")){
      let botonAdd = document.querySelector(".cuerpo-lista");
      botonAdd.style.opacity = "0.4";
      var cancion = e.target.parentElement;
      var winW = window.innerWidth;
      var winH = window.innerHeight;
      var dialogverlay = document.getElementById('dialogverlay');
      var dialogbox = document.getElementById('dialogbox');
      dialogverlay.style.display = "block";
      dialogverlay.style.height = (winH) + "px";
      dialogbox.style.right = /*(winW/2) - (500*0.5) + */"12%";
      dialogbox.style.top = "100px";
      dialogbox.style.display = "block";
      
      document.getElementById('dialogboxhead').innerHTML = "Agregar a playlist";
      //document.getElementById('dialogboxbody').innerHTML = "Elige";
      document.getElementById('dialogboxfoot').innerHTML = '<button id=Domingo>Domingo</button>  <button id=Miercoles>Miercoles</button>  <button id="Cancelar"> X </button>';
    
      var CancelarBoton = document.getElementById ('Cancelar');
      var DomingoBoton = document.getElementById ('Domingo');
      var MiercolesBoton = document.getElementById ('Miercoles');
      CancelarBoton.addEventListener ("click",Cancelar);
      DomingoBoton.onclick = function () {Playlist('cancionesDomingo','DOMINGO','rgb(153, 247, 166)');}
      MiercolesBoton.onclick = function () {Playlist('cancionesMiercoles','MIERCOLES','rgb(247, 225, 153)');}
                                     
      
      function Cancelar(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogverlay').style.display = "none";
        botonAdd.style.opacity = "1";
      } 
      
      function Playlist(playlist,dia,color){
        link = cancion.querySelector('a').href;
        tipo = cancion.querySelector('a').textContent;
        const CantoGuardado = new cantoGuardado(link,tipo,titulo);
  
        //Si no existe ningun canto, entonces agregar canto
        if(localStorage.getItem(playlist) === null){
          canciones = [];
          canciones.push(CantoGuardado);
          localStorage.setItem(playlist,JSON.stringify(canciones));
          mostrarMensajeAgregado (`Canto agregado a ${dia}`,color);
        }
        
        //Si existe entonces buscar si ya esta agregado, en caso de que si: Mostrar mensaje de ya agregado, en caso de que no: agregar canto a la lista
        else{
          canciones = JSON.parse(localStorage.getItem(playlist));
          
          let LosCantos = canciones.filter(function(cancion){
            return  cancion.pagina === CantoGuardado.pagina; 
          });
          
          switch (LosCantos.length){
            case 0:
              console.log("No repetido");
              canciones.push(CantoGuardado);
              localStorage.setItem(playlist,JSON.stringify(canciones)); 
              mostrarMensajeAgregado (`Canto agregado a ${dia}`,color);
              break;
  
            case 1:
              console.log("Repetido");
              mostrarMensajeAgregado (`Canto REPETIDO en ${dia}`,'tomato');
              break;
          }
        }
      }
  
      function mostrarMensajeAgregado(mensaje,color){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogverlay').style.display = "none";
        const div = document.createElement ('div');
        div.className = 'anuncio';
        div.style.backgroundColor = color;
        div.appendChild(document.createTextNode(`${mensaje}`));
        const container = document.querySelector(".contenidoLista");
        const ul = document.querySelector(".cuerpo-lista");
        container.insertBefore(div,ul);
        setTimeout(()=> document.querySelector(".anuncio").remove(),2500);
        botonAdd.style.opacity = "1";
      }
    }
  }