/*!
 * jQuery Chord Transposer plugin v1.0
 * http://codegavin.com/projects/transposer
 *
 * Copyright 2010, Jesse Gavin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://codegavin.com/license
 *
 * Date: Sat Jun 26 21:27:00 2010 -0600
 */
(function($) {

    $.fn.transpose = function(options) {
        var opts = $.extend({}, $.fn.transpose.defaults, options);
        
        var currentKey = null;
        
        var keys = [
            { name: 'Ab',  value: 0,   type: 'F', botonera: 0 },
            { name: 'A',   value: 1,   type: 'N', botonera: 1 },
            { name: 'A#',  value: 2,   type: 'S', botonera: 2 },
            { name: 'Bb',  value: 2,   type: 'F', botonera: 3 },
            //{ name: 'Bb',  value: 2,   type: 'F', botonera: 4 },
            { name: 'B',   value: 3,   type: 'N', botonera: 4 },
            { name: 'C',   value: 4,   type: 'N', botonera: 5 },
            { name: 'C#',  value: 5,   type: 'S', botonera: 6 },
            { name: 'Db',  value: 5,   type: 'F', botonera: 7 },
            { name: 'D',   value: 6,   type: 'N', botonera: 8 },
            { name: 'D#',  value: 7,   type: 'S', botonera: 9 },
            { name: 'Eb',  value: 7,   type: 'F', botonera: 10 },
            { name: 'E',   value: 8,   type: 'N', botonera: 11 },
            { name: 'F',   value: 9,   type: 'N', botonera: 12 },
            { name: 'F#',  value: 10,  type: 'S', botonera: 13 },
            { name: 'Gb',  value: 10,  type: 'F', botonera: 14 },
            { name: 'G',   value: 11,  type: 'N', botonera: 15 },
            { name: 'G#',  value: 0,   type: 'S', botonera: 16 }
        ];
        
        var getKeyByName = function (name) {
            if (name.charAt(name.length-1) == "m") {
                name = name.substring(0, name.length-1);
            }
            //console.log(name);
            for (var i = 0; i < keys.length; i++) {
                //console.log(keys[i]);
                if (name == keys[i].name) {
                    return keys[i];
                }
            }
        };
    
        var getChordRoot = function (input) {
            if (input.length > 1 && (input.charAt(1) == "b" || input.charAt(1) == "#"))
                return input.substr(0, 2);
            else
                return input.substr(0, 1);
        };
    
        var getNewKey = function (oldKey, delta, targetKey) {
            
            var keyValue = getKeyByName(oldKey).value + delta;
    
            if (keyValue > 11) {
                keyValue -= 12;
            } else if (keyValue < 0) {
                keyValue += 12;
            }
            
            var i=0;
            console.log(keys);
            if (keyValue == 0 || keyValue == 2 || keyValue == 5 || keyValue == 7 || keyValue == 10) {
                // Return the Flat or Sharp Key
                switch(targetKey.name) {
                    case "A":
                    case "A#":
                    case "B":
                    case "C":
                    case "C#":
                    case "D":
                    case "D#":
                    case "E":
                    case "F#":
                    case "G":
                    case "G#":
                        for (;i<keys.length;i++) {
                        if (keys[i].value == keyValue && keys[i].type == "S") {
                            return keys[i];
                        }
                        }
                    default:
                        for (;i<keys.length;i++) {
                        if (keys[i].value == keyValue && keys[i].type == "F") {
                            return keys[i];
                        }
                        }
                }
            }
            else {
                // Return the Natural Key
                for (;i<keys.length;i++) {
                    if (keys[i].value == keyValue) {
                    return keys[i];
                    }
                }
            }
        };
    
        var getChordType = function (key) {
            switch (key.charAt(key.length - 1)) {
                case "b":
                    return "F";
                case "#":
                    return "S";
                default:
                    return "N";
            }
        };
    
        var getDelta = function (oldIndex, newIndex) {
            if (oldIndex > newIndex)
                return 0 - (oldIndex - newIndex);
            else if (oldIndex < newIndex)
                return 0 + (newIndex - oldIndex);
            else
                return 0;
        };
        
        var transposeSong = function (target, key) {
            var newKey = getKeyByName(key);
            //console.log(target);
            //console.log(newKey.name); 
            //console.log(currentKey.name); 
            if (currentKey.name == newKey.name) {
                //localStorage.setItem("DeltaTono",JSON.stringify(0));
                return;
            }
    
            var delta = getDelta(currentKey.value, newKey.value);
            //localStorage.setItem("DeltaTono",JSON.stringify(delta));
            $("span.c", target).each(function (i, el) {
                transposeChord(el, delta, newKey);
                //console.log($("span.c", target));
            });
            
            currentKey = newKey;

            /*---------------Guardar en cual acorde se quedo transportado---------------*/
            //Leer toda la lista de cantos con su tono y encontrar cual es el canto y su tono y cambiar tono
            var TonoCanciones = JSON.parse(localStorage.getItem("TonosActuales"));
            let Tonos = TonoCanciones.filter(function(canto){
                return  canto.titulo.toLowerCase() === $(".tituloDelCanto").text().toLowerCase(); 
            });
            //console.log(Tonos);
            //Si hay 2 o mas cantos con el mismo titulo, buscar el autor
            if (Tonos.length>1) {
                Tonos = Tonos.filter(function(canto){
                    return  canto.autor.toLowerCase() === $(".autorDelCanto").text().toLowerCase(); 
                });
                //console.log(Tonos);
            }

            Tonos[0].tono = currentKey.name
            localStorage.setItem("TonosActuales",JSON.stringify(TonoCanciones));
            //localStorage.setItem("TonoActual",JSON.stringify(currentKey.name));

            /*------------Cambiar Tono de class = Tono en la cabecera del canto------------*/
            var tono = $(".AcordeCanto").text()
            //Si tiene un bemol o sostenido, entonces removerlo
            if (tono.length>1)
                tono = tono.substr(0,1);
            var raiz = tono.replace(/[A-Z]/g,currentKey.name);
            $(".AcordeCanto").html(raiz);
        };
    
        var transposeChord = function (selector, delta, targetKey) {
            var el = $(selector);
            //console.log(el);
            var oldChord = el.text();
            //console.log(oldChord);
            var oldChordRoot = getChordRoot(oldChord);
            //console.log(oldChordRoot);
            var newChordRoot = getNewKey(oldChordRoot, delta, targetKey);
            //console.log(newChordRoot);
            var newChord = newChordRoot.name + oldChord.substr(oldChordRoot.length);
            //console.log(newChord);
            el.text(newChord);
            //console.log(el);
    
            var sib = el[0].nextSibling;
            //console.log(sib);
            if (sib && sib.nodeType == 3 && sib.nodeValue.length > 0 && sib.nodeValue.charAt(0) != "/") {
                var wsLength = getNewWhiteSpaceLength(oldChord.length, newChord.length, sib.nodeValue.length);
                sib.nodeValue = makeString(" ", wsLength);
            }
        };
    
        var getNewWhiteSpaceLength = function (a, b, c) {
            if (a > b)
                return (c + (a - b));
            else if (a < b)
                return (c - (b - a));
            else
                return c;
        };
        
        //Funcion para saber cuantos espacios son entre cada acorde
        var makeString = function (s, repeat) {
            var o = [];
            for (var i = 0; i < repeat; i++) o.push(s);
            return o.join("");
        }
        
        /*-----------------Revisar en cada linea si es una linea de acordes o de letra-----------------*/
        var isChordLine = function (input) {
            //var tokens = input.replace(/\s+/, " ").split(" ");
            var tokens = input.replace(/\s+/, " ").split(" ");
            //console.log(tokens);
            //var tokens = input.replace(/\s+/, " ").replace(/-|[|]|[/]/g, " ").split(" ");
            // Try to find tokens that aren't chords, if we find one we know that this line is not a 'chord' line.
            for (var i = 0; i < tokens.length; i++) {
                //console.log(tokens[i]);
                if (tokens[i].startsWith("|") ||          //Compas
                    tokens[i].includes("-") || 
                    tokens[i].startsWith("1") || 
                    tokens[i].startsWith("2") || 
                    tokens[i].startsWith("3") || 
                    tokens[i].includes("%") ||              //SEGNO
                    tokens[i].includes("@") ||              //Simbolo Coda
                    tokens[i].includes("fine") ||            //Final
                    tokens[i].includes("d.c. al coda") ||    //Da capo al coda
                    tokens[i].includes("coda") ||           //Coda
                    tokens[i].includes("d.s.") ||            //Dal Segno
                    tokens[i].includes("d.c.") ||            //Da Capo
                    tokens[i].includes("d.s. al fine") ||    //Dal Segno al Fine
                    tokens[i].includes("d.s. al coda"))      //Dal Segno al Coda
                    return true
                //console.log(!$.trim(tokens[i]).length);
                //console.log(!tokens[i].match(opts.chordRegex));
                if (!$.trim(tokens[i]).length == 0 && !tokens[i].match(opts.chordRegex))
                    return false;
            }
            return true;
        };
        
        //Colocar class='c' a todos los acordes y class='o' a los simbolos "|" y "-" que se encuentran en la linea de acordes
        var wrapChords = function (input) {
            //console.log(input);
            //console.log(input.replace("|","<span class='o'>|</span>"));
            //console.log(input.replace(opts.chordReplaceRegex, "<span class='c'>$1</span>").replace(/[|]/g,"<span class='o'>|</span>").replace(/[-]/g,"<span class='o'>-</span>"));
            return input
            .replace(opts.chordReplaceRegex, "<span class='c'>$1</span>")
            .replace("||:","<span class='fontNotas'>||:</span>")
            .replace(":||","<span class='fontNotas'>:||</span>")
            .replace(/[|]/g,"<span class='o'>|</span>")
            .replace(/[-]/g,"<span class='o'>-</span>")
            .replace("1,2.","<span class='fontNotas'>1,2.</span>")
            .replace("2,3.","<span class='fontNotas'>2,3.</span>")
            .replace("1.","<span class='fontNotas'>1.</span>")
            .replace("2.","<span class='fontNotas'>2.</span>")
            .replace("3.","<span class='fontNotas'>3.</span>")
            .replace(/[%]/g,"<span class='fontNotas'>&#119051;</span>")
            .replace(/[@]/g,"<span class='fontNotas'>@</span>")
            .replace("d.s. al coda","<span class='fontNotas'>D.S. al Coda</span>")
            .replace("d.c. al coda","<span class='fontNotas'>D.C. al Coda</span>")
            .replace("d.s. al fine","<span class='fontNotas'>D.S. al Fine</span>")
            .replace("coda","<span class='fontNotas'>Coda</span>")
            .replace("fine","<span class='fontNotas'>Fine</span>")
            .replace("d.s.","<span class='fontNotas'>D.S.</span>")
            .replace("d.c.","<span class='fontNotas'>D.C.</span>");
        };

        /*-----------------------VEXTAB cambiar tablatura cuando cambia tono------------------------*/
        var isVexTabLine = function (input){
            var tokens = input.replace(/\s+/, " ").split(" ");
            for (var i = 0; i < tokens.length; i++) {
                if (tokens[i].includes("text") ||       //Acordes encima de la partitura
                    tokens[i].includes("key"))          //Key
                    return true
                if (!$.trim(tokens[i]).length == 0 && !tokens[i].match(opts.chordRegex))
                    return false;
            }
            return true;
        };

        var wrapVextab = function(input){
            return input
            .replace(opts.chordReplaceRegex, "<span class='c'>$1</span>")
            .replace(/[,]/g,"<span>,</span>")
            .replace(/[|]/g,"<span>|</span>")
        }

        var VextabNotes = function (input) {
            var delta = JSON.parse(localStorage.getItem("VEXTABdeltaTono"));
            var tokens = input.replace(/\s+/, " ").split(" ");
            var linea = [];
            for (var i = 0; i < tokens.length; i++){
                if (tokens[i].match(/^\d/)){
                    var numeros = tokens[i].slice(0,tokens[i].search("/"));
                    var busqueda2 = numeros.split("");
                    var flag = 0;
                    var transportados;
                    for (var k = 0; k < busqueda2.length; k++) {
                        if (busqueda2[k].match(/^\d/)) {
                            flag++;
                            if (flag === 2){
                                tokens[i] = tokens[i].replace(transportados,busqueda2[k-1]);
                                busqueda2[k] =(parseInt(busqueda2[k-1]) * 10) + parseInt(busqueda2[k]);
                                transportados = busqueda2[k] + parseInt(delta);
                                tokens[i] = tokens[i].replace(busqueda2[k],transportados);
                            }
                            else {
                                transportados = parseInt(busqueda2[k]) + parseInt(delta);
                                tokens[i] = tokens[i].replace(busqueda2[k],transportados);
                            }
                        }
                        else {
                            flag = 0;
                        }
                    }
                }
                linea.push(tokens[i]);
            }
            console.log(linea);
            return linea.join(" ")
        }

        /*-----------------------------------------------------------------------------------------------*/
        return $(this).each(function() {
        
            
            var startKey = $(this).attr("data-key");
            if (!startKey || $.trim(startKey) == "") {
            startKey = opts.key;
            }
    
            if (!startKey || $.trim(startKey) == "") {
            throw("Starting key not defined.");
            return this;
            }
            
            currentKey = getKeyByName(startKey);
            if (startKey.charAt(1)==="m")
                startKey = startKey.substr(0,1);
    
            /*----------------------Construir la botonera para transportar----------------------*/
            var keyLinks = [];
            $(keys).each(function(i, key) {
                if (key.name == startKey)
                    keyLinks.push("<a href='#' class='original'>" + key.name + "</a>");
                else if (currentKey.name == key.name)
                    keyLinks.push("<a href='#' class='selected'>" + key.name + "</a>");
                else
                    keyLinks.push("<a href='#'>" + key.name + "</a>");
            });

            
            
            /*---------------Si presionan boton de acorde, ejecutar----------------*/
            var $this = $(this); //<pre> del canto
            //console.log($this);
            var keysHtml = $("<div class='transpose-keys'></div>");
            keysHtml.html(keyLinks.join(""));
            $("a", keysHtml).click(function(e) {
                e.preventDefault();
                //var botonSeleccionado = $(this);
                transposeSong($this, $(this).text()); //Envia <pre> y texto del boton a transportar (el acorde a transportar)
                $(".transpose-keys a").removeClass("selected");
                $(this).addClass("selected");
                //console.log(botonSeleccionado);
                return false;
            });
            //$(this).before(keysHtml);
            

            /*----------------------Mostrar botonera de transportar ----------------------*/
            //Mostrar antes de la seccion NavCanto
            $( ".navCanto" ).before(keysHtml);

            //Cuando se presione el boton de transportar, ensenar botonera
            $(".botonTransportar").click(function() {
                keysHtml.toggle();
            });

            /*----------------------Guardar canto con tono seleccionado----------------------*/
            var TonoCanciones = JSON.parse(localStorage.getItem("TonosActuales"));
            let Tonos = TonoCanciones.filter(function(canto){
                return  canto.titulo.toLowerCase() === $(".tituloDelCanto").text().toLowerCase(); 
            });
            //console.log(Tonos);
            
            //Si hay 2 o mas cantos con el mismo titulo, buscar el autor
            if (Tonos.length>1) {
                Tonos = Tonos.filter(function(canto){
                    return  canto.autor.toLowerCase() === $(".autorDelCanto").text().toLowerCase(); 
                });
                //console.log(Tonos);
            }

            /*---------------------Si es menor, elimiar la m para buscar en botonera-------------------*/
            Tonos[0].tono = Tonos[0].tono.replace("m","");

            /*--------------Mostrar en la botonera que tono esta el canto-----------------*/
            let valorTono = keys.filter(function(boton){
                return boton.name === Tonos[0].tono;
            });
            console.log(Tonos);

            let boton = $("a", keysHtml).filter(function(botones){
                return  botones === valorTono[0].botonera; 
            });
            boton.addClass("selected");

            /*-----------------------VEXTAB diferencia de tonos--------------------------------------*/
            console.log(startKey + "," + Tonos[0].tono);
            let delta1 = keys.filter(function(boton){
                return boton.name === Tonos[0].tono;
            });

            let delta2 = keys.filter(function(boton){
                return boton.name === startKey;
            });
            var delta = delta1[0].value - delta2[0].value;
            console.log(delta);
            localStorage.setItem("DeltaTono",JSON.stringify(delta));

            /*----------------------VEXTAB boton transportar-----------------------------------*/
            var TotalDelta = JSON.parse(localStorage.getItem("VEXTABdeltaTono"));
            if (TotalDelta === null ||TotalDelta === undefined)
                TotalDelta = 0;

            if (delta === 0){
                TotalDelta = 0;
                localStorage.setItem("VEXTABdeltaTono",JSON.stringify(TotalDelta));
            }

            $(".botonTransportarMenos").click(function(e) {
                e.preventDefault();
                //console.log(currentKey.value);
                var bajarTono = -1;
                var suma = currentKey.value + bajarTono;
                if (suma === (-1)){
                    suma = 11;
                }
                var nuevoTono = keys.filter(function(tono){
                    return tono.value === suma;
                });
                
                //console.log(suma);
                //console.log(nuevoTono);
                /*if (nuevoTono[0].name==="A#")
                    nuevoTono[0].name = "Bb";
                else if (nuevoTono[0].name==="D#")
                    nuevoTono[0].name = "Eb";*/
                if (nuevoTono[1])
                    transposeSong($this, nuevoTono[1].name);
                else
                transposeSong($this, nuevoTono[0].name);
                //return false;
                TotalDelta = TotalDelta - 1;
                localStorage.setItem("VEXTABdeltaTono",JSON.stringify(TotalDelta));
            });

            $(".botonTransportarMas").click(function(e) {
                e.preventDefault();
                //console.log(currentKey.value);
                var subirTono = 1;
                var suma = currentKey.value + subirTono;
                if (suma === 12){
                    suma = 0;
                }
                var nuevoTono = keys.filter(function(tono){
                    return tono.value === suma;
                });
                //console.log(nuevoTono);
                //console.log(suma);
                /*if (nuevoTono[0].name==="A#")
                    nuevoTono[0].name = "Bb";
                else if (nuevoTono[0].name==="D#")
                    nuevoTono[0].name = "Eb";*/
                
                transposeSong($this, nuevoTono[0].name);

                TotalDelta = TotalDelta + 1;
                localStorage.setItem("VEXTABdeltaTono",JSON.stringify(TotalDelta));
                //return false;
            });

            
            /*----------------------Agarrar todas las lineas del <pre> y revisar si es acorde o un titulo----------------------*/
            var output = [];
            var lines = $(this).text().split(/\r\n|\n/g);
            var line, tmp = "";
            
            for (var i = 0; i < lines.length; i++) {
                line = lines[i];
                //console.log(line);
                if (isChordLine(line))
                    output.push("<span>" + wrapChords(line) + "</span>");
                //Para VexTab
                else if (isVexTabLine(line))
                    output.push("<span>" + wrapVextab(line) + "</span>");
                else if (line.startsWith("div")||line.startsWith("/div"))
                    output.push("<" + line);
                else if (line.includes("notes")){
                    output.push(VextabNotes(line));
                }
                //Titulos de partes del canto
                else if (line=="INTRO:" || line=="//INTRO://" || line=="INTRO1:" || line=="INTRO2:")
                    output.push("<p class='tituloCanto'>" + line + "</p>");
                else if (line=="VERSO:" || line=="VERSO1:" || line=="VERSO2:" || line=="VERSO3:" || line=="VERSO4:")
                    output.push("<p class='tituloVerso'>" + line + "</p>");
                else if (line=="CORO:" || line=="//CORO://" || line=="CORO1:" || line=="CORO2:" || line=="CORO3:" || line=="CORO4:")
                    output.push("<p class='tituloCoro'>" + line + "</p>");
                else if (line=="PUENTE:" || line=="PUENTE1:" || line=="PUENTE2:" || line=="PUENTE3:")
                    output.push("<p class='tituloPuente'>" + line + "</p>");
                else if (line=="PRECORO:" || line=="PRECORO1:" || line=="PRECORO2:" || line=="PRECORO3:")
                    output.push("<p class='tituloPreCoro'>" + line + "</p>");
                else if(line=="FINAL:" || line=="//FINAL://" || line=="FINAL1:" || line=="FINAL2:")
                    output.push("<p class='tituloFinal'>" + line + "</p>");
                //Simbolos en la linea de la letra
                    //Para poner la linea de repeticion
                else if (line.startsWith("_"))
                    output.push("<span class='fontNotas'>" + line + "</span>");
                    //Para poner el ritornelo 
                else{
                    if(line.startsWith("//")){
                        line = line.replace("//","<span class= 'fontNotas'>||:  </span>");
                        if(line.endsWith("//"))
                            line = line.replace("//","<span class= 'fontNotas'>  :||</span>");
                        output.push(line);
                    }
                    else if(line.endsWith("//")){
                        line = line.replace("//","<span class= 'fontNotas'>  :||</span>");
                        output.push(line);
                    }
                    else
                        output.push("<span>" + line + "</span>");
                }
            };
            $(this).html(output.join("\n"));
            //console.log(output);
            
            /*-----------------Transportar desde el inicio el canto con el tono guardado--------------*/
            transposeSong($this, Tonos[0].tono);
            //var TonoActual = JSON.parse(localStorage.getItem("TonoActual"));
            //if (TonoActual !== null){
                //transposeSong($this, TonoActual);
                //console.log(TonoActual);
            //}

            /*---------------------------------VEXTAB Scale---------------------------------------*/
            /*let editor = $(".vex-tabdiv").attr("editor");
            console.log(editor);*/
            if ($(".vex-tabdiv")){
                var EscalaActual = JSON.parse(localStorage.getItem("VEXTABscale"));
                if (EscalaActual === null){
                    EscalaActual = $(".vex-tabdiv").attr("scale");
                }

                $(".vex-tabdiv").attr({
                    scale: EscalaActual
                });

                $(".botonTabChico").click(function(e) {
                    EscalaActual = EscalaActual - 0.1;
                    localStorage.setItem("VEXTABscale",JSON.stringify(EscalaActual));
                    /*$(".vex-tabdiv").attr({
                        scale: EscalaActual
                    });*/
                    console.log("menos");
                    console.log(EscalaActual);
                });
                
                $(".botonTabGrande").click(function(e) {
                    EscalaActual = EscalaActual + 0.1;
                    localStorage.setItem("VEXTABscale",JSON.stringify(EscalaActual));
                    /*$(".vex-tabdiv").attr({
                        scale: EscalaActual
                    });*/
                    console.log("mas");
                    console.log(EscalaActual);
                });
            }
        });
    };
  
  
    $.fn.transpose.defaults = {
        chordRegex: /^[A-G][b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*(\/[A-G][b\#]*)*$/,
        chordReplaceRegex: /([A-G][b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*)/g
    };
  
  })(jQuery);