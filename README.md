Welcome to Glitch
=================

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).


Your Project
------------

### ← README.md

That's this file, where you can tell people what your cool website does and how you built it.

### ← Agregar un canto nuevo

### ← script.js
    Aqui se agregan los cantos con la siguiente infromacion
    {
      pagina: startPath + "gracias_dios.html",      //se agrega la pagina con minusculas seguido por .html
      titulo: "Gracias Dios",                       //Titulo del canto
      autor: "Don Moen",                            //Autor del canto
      tono: "F",                                    //Tono ORIGINAL del canto
      categoria: ["Accion de Gracias"],             //Se agrega a una o varias categorias
      audio:"",                                     //Se agrega el audio del canto
      subpaginas: ["Letra","Acordes"],              //Se crean las paginas del canto, ej:Letra, Acordes, Piano, etc.
    },

### ← nuevo .html
    Se agrega un archivo nuevo con el nombre puesto en script.js  ej: gracias_dios.html , en la seccion /public/html/cantos/info. Se agrega en la pag la sig info:
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Gracias Dios</title>                 //Aqui se pone el Titulo del canto de acuerdo a script.js
    </head>  
    <body class="contenidoLista">   

        <h3>Don Moen</h3>                           //Aqui se pone el Autor del canto de acuerdo a script.js
        
        <!-- import the webpage's javascript file -->
        <script src='/js/template-info.js'></script>
        <script src="/script.js" defer></script>
        <script src='/js/playlist.js'></script>
        
    </body>
    </html>

### ← demo.js
Aqui se agregan los cantos en las fechas del calendario
    {
        endDate: '2020-03-22', startDate: '2020-03-22',             //El dia que seran los cantos
        title: 'Programa Dominical 12 - 22 de Marzo',               //Titulo del dia
        cantos: 'Nada es imposible,Marco Barrientos_La nube de tu presencia,Conquistando Fronteras_Inmerecedor,Abel Zavala_Dios me ama,Danilo Montero_Eres todopoderoso,Danilo Montero'    //Los cantos separados por _ y dentro
                                                                del canto separados por , entre el canto y el autor
    },

### Guitarra Electrica
<!--keyword	values
                notation	true/false
                tablature	true/false
                clef	    treble, alto, tenor, bass, percussion
                key	        C, Am, F, Dm, Bb, Gm, Eb, Cm, Ab, Fm, Db, Bbm, Gb, Ebm, Cb, Abm, G, Em, D, Bm, A, F#m, E,   C#m, B, G#m, F#, D#m, C#, A#m
                time	    C, C|, #/#
                tuning	    standard, dropd, eb, E/5,B/4,G/4,D/4,A/3,E/3

            Silencios
                ##

            Duraciones
                :w (redonda)
                :h (blanca)
                :q (negra)
                :8 (corchea)
                :16 (semicorchea)
                :32 (fusa)
                Se agrega una 'd' para indicar el punto. Ej :qd

            Ligaduras
                t - tie
                s - slide
                h - hammer
                p - pull-of

            
            Repeticiones
                =||   Double Bar
                =|:  Repeat Begin
                =:|  Repeat End
                =::  Double Repeat
                =|=  End Bar-->

### ← assets
Drag in `assets`, like images or music, to add them to your project

Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
