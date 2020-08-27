//Variables
let TituloListaAct = document.querySelector(".TituloListaAct");
let divDesplegarCantos = document.querySelector(".DesplegarCantos");
let ulCantosDelDia = document.querySelector(".CantosDelDia");
let BaseCantos = JSON.parse(localStorage.getItem("TonosActuales"));


/*--------------------------Funcion regresar pagina---------------------------*/
let botonRegresar = document.querySelector(".arrowRegresar");
if(botonRegresar){
    botonRegresar.addEventListener("click",(e) =>  {
      window.history.back();
    });
  }

/*------------------------------------MODO NOCTURNO----------------------------*/
const modoDiaNoche = JSON.parse(localStorage.getItem("modoDiaNoche"));
const body2 = document.querySelector("body");
const h2inicio = document.querySelector("h2");
//const controles = document.querySelector(".clndr-controls");
const cal1 = document.querySelector(".cal1");
const cal3 = document.querySelector(".cal3");
const TituloLista = document.querySelector(".TituloListaAct");
if (modoDiaNoche == true){
    body2.style.backgroundColor = "rgb(51, 51, 51)";
    body2.style.color = "white";
    h2inicio.style.color = "rgb(102, 102, 255)";
    cal1.style.backgroundColor = "rgb(204, 204, 204)";
    cal1.style.color = "black";
    cal3.style.backgroundColor = "rgb(204, 204, 204)";
    cal3.style.color = "black";
    //controles.style.backgroundColor = "rgb(153, 153, 153)";
    TituloLista.style.color = "rgb(128, 179, 255)";
}

// Call this from the developer console and you can control both instances
var calendars = {};

$(document).ready( function() {
    console.info(
        'Welcome to the CLNDR demo. Click around on the calendars and' +
        'the console will log different events that fire.');

    // Assuming you've got the appropriate language files clndr will respect whatever moment's language is set to.
     moment.locale('es-do');

    // Here's some magic to make sure the dates are happening this month.
    //var thisMonth = moment().format('YYYY-MM');
    var thisDay = moment().format('ddd LT');
    console.log(thisDay.replace(/-/g,""));
    // Events to load into calendar
    var eventArray = [
        /* Ejemplos
        {
            title: 'Multi-Day Event',
            endDate: thisMonth + '-14',
            startDate: thisMonth + '-10'
        }, {
            date: thisMonth + '-26',
            title: 'Single Day Event'
        },*/ 
        
        /*Actividades con cantos*/
        {
            endDate: '2020-01-12', startDate: '2020-01-12',
            title: 'Programa Dominical 2 - 1 de Enero',
            cantos: 'Bueno es Dios,Don Moen_Cristo te exaltamos,Don Moen_Canta al Senor,Don Moen_Al estar aqui, Marcos Witt_Hermoso Dios,Conquistando Fronteras'
        }, {
            endDate: '2020-01-19', startDate: '2020-01-19',
            title: 'Programa Dominical 3 - 19 de Enero',
            cantos: 'No a nosotros,Jesus Adrian Romero_Cerca de mi,Su presencia_Dios,Danilo Montero_Sentado en su trono,Danilo Montero_Tu nombre levantare,Marcos Witt'
        }, {
            endDate: '2020-01-26', startDate: '2020-01-26',
            title: 'Programa Dominical 4 - 26 de Enero',
            cantos: 'Al que me cine,Jesus Adrian Romero_Quien nos separara_A el alto y sublime,Roberto Torres_Con mis manos levantadas_Bueno es alabar'
        }, {
            endDate: '2020-02-02', startDate: '2020-02-02',
            title: 'Programa Dominical 5 - 02 de Febrero',
            cantos: 'Eres fiel,Coalo Zamorano_Por Siempre,Vino Nuevo_Mas el Dios de toda gracia,Marcos Witt_Santo Santo Santo,Marcos Witt_Cuando yo senti'
        }, {
            endDate: '2020-02-09', startDate: '2020-02-09',
            title: 'Programa Dominical 6 - 09 de Febrero',
            cantos: 'Tu palabra,Juan Carlos Alvarado_Eres bendito,Jaime Murrell/version con guitarra electrica_Quiero entender,Jesus Adrian Romero_Sendas Dios hara,Don Moen_Temprano yo te buscare,Marcos Witt_Tu habitas,Marco Barrientos'
        }, {
            endDate: '2020-02-16', startDate: '2020-02-16',
            title: 'Programa Dominical 7 - 16 de Febrero',
            cantos: 'Tu eres Santo,Michael W. Smith/Principe de Paz_Nuestro Salvador,Lakewood/Campanas sin campanas_Dios puede salvar,Hillsong United_Jesus mi fiel amigo,Abel Zavala_Tu nombre oh Dios,Marcos Witt'
        }, {
            endDate: '2020-02-23', startDate: '2020-02-23',
            title: 'Programa Dominical 8 - 23 de Febrero',
            cantos: 'Tu eres Dios,En espiritu y Verdad_Te dare lo mejor,Jesus Adrian Romero_Jesus es el Senor,Jesus Adrian Romero_Jesus eres mi buen pastor,Marcos Witt_Tu nombre levantare'
        }, {
            endDate: '2020-03-01', startDate: '2020-03-01',
            title: 'Programa Dominical 9 - 01 de Marzo',
            cantos: 'Dios Imparable,Marcos Witt_Enciende una luz,Marcos Witt_La nina de tus ojos,Popular'
        }, {
            endDate: '2020-03-08', startDate: '2020-03-08',
            title: 'Programa Dominical 10 - 08 de Marzo',
            cantos: 'Vamos a cantar,En espiritu y verdad_Nuestro Salvador,Lakewood/Campanas sin campanas_Digno es el Senor,Marcela Gandara_Tu amor por mi,Marcos Witt_Sera llena la tierra,Marcos Witt'
        }, {
            endDate: '2020-03-15', startDate: '2020-03-15',
            title: 'Programa Dominical 11 - 15 de Marzo',
            cantos: 'Yo te busco,Marcos Witt_Tu amor oh Dios,Generacion sin Fronteras_En el lugar de tu presencia,Vino nuevo_Quien nos separara,Juan Carlos Alvarado' 
        }, {
            endDate: '2020-03-22', startDate: '2020-03-22',
            title: 'Programa Dominical 12 y ONLINE - 22 de Marzo',
            cantos: 'Nada es imposible,Marco Barrientos_La nube de tu presencia,Conquistando Fronteras_Inmerecedor,Abel Zavala_Dios me ama,Danilo Montero'
        }, {
            endDate: '2020-03-29', startDate: '2020-03-29',
            title: 'Programa Dominical ONLINE 2 - 29 de Marzo',
            cantos: ''
        }, {
            endDate: '2020-04-05', startDate: '2020-04-05',
            title: 'Programa Dominical ONLINE 3 - 05 de Abril',
            cantos: 'Dios poderoso,IBI_Sana nuestra tierra,Marcos Witt_Tu fidelidad,Marcos Witt'
        }, {
            endDate: '2020-04-10', startDate: '2020-04-10',
            title: 'Culto 7 palabras - 10 de Abril',
            cantos: ''
        }, {
            endDate: '2020-04-12', startDate: '2020-04-12',
            title: 'Domingo de Resurreccion ONLINE 4 - 12 de Abril',
            cantos: ''
        }, {
            endDate: '2020-04-19', startDate: '2020-04-19',
            title: 'Programa Dominical ONLINE 5 - 19 de Abril',
            cantos: ''
        }, {
            endDate: '2020-04-26', startDate: '2020-04-26',
            title: 'Programa Dominical ONLINE 6 - 26 de Abril',
            cantos: ''
        }, {
            endDate: '2020-05-10', startDate: '2020-05-10',
            title: 'Programa Dominical ONLINE 7 Vespertino - 10 de Mayo',
            cantos: 'Nada es imposible,Marco Barrientos_Jesus mi buen pastor,Marcos Witt'
        }, {
            endDate: '2020-05-17', startDate: '2020-05-17',
            title: 'Programa Dominical ONLINE 8- 27 de Mayo',
            cantos: 'Dios de amor,Danilo Montero_Tu mereces gloria,Juan Carlos Alvarado'
        }, {
            endDate: '2020-05-24', startDate: '2020-05-24',
            title: 'Programa Dominical ONLINE 9- 24 de Mayo',
            cantos: 'La nube de tu presencia,Vino nuevo_Tu mereces gloria,Juan Carlos Alvarado'
        }, {
            endDate: '2020-05-31', startDate: '2020-05-31',
            title: 'Programa Dominical ONLINE 10 - 31 de Mayo',
            cantos: 'Dios imparable,Marcos Witt_Tu eres santo,Michael W. Smith_Aqui estoy adorandote,Conquistando Fronteras'
        }, {
            endDate: '2020-06-07', startDate: '2020-06-07',
            title: 'Programa Dominical ONLINE 11 - 07 de Junio',
            cantos: 'Vamos a cantar,En espiritu y verdad_Gracia sublime es,En espiritu y verdad_Temprano yo te buscare,Marcos Witt'
        }, {
            endDate: '2020-06-14', startDate: '2020-06-14',
            title: 'Programa Dominical ONLINE 12 - 14 de Junio',
            cantos: 'El Dios que adoramos,IBI_El es mi amigo fiel,Coalo Zamorano_Dios el mas grande,Juan Carlos Alvarado'
        }, {
            endDate: '2020-06-21', startDate: '2020-06-21',
            title: 'Programa Dominical ONLINE 13 - 21 de Junio',
            cantos: 'Rey de gloria,Marco Barrientos_Bueno es Dios,Don Moen_Cuan grande es Dios,En espiritu y verdad'
        }, {
            endDate: '2020-06-28', startDate: '2020-06-28',
            title: 'Programa Dominical ONLINE 14 - 28 de Junio',
            cantos: 'Un siervo para tu gloria,IBI_Al que me cine,Marcos Witt_Dios ha sido fiel,Marcos Witt'
        }, {
            endDate: '2020-07-05', startDate: '2020-07-05',
            title: 'Programa Dominical ONLINE 15 - 05 de Julio',
            cantos: 'Tu eres santo,Michael W. Smith_Al que es digno,Coalo Zamorano_Dios me ama,Danilo Montero'
        }, {
            endDate: '2020-07-12', startDate: '2020-07-12',
            title: 'Programa Dominical ONLINE 16 - 12 de Julio',
            cantos: 'Hay libertad,IBI_Cantare de tu amor,Danilo Montero_El amor de Cristo,IBI'
        }, {
            endDate: '2020-07-19', startDate: '2020-07-19',
            title: 'Programa Dominical ONLINE 17 - 19 de Julio',
            cantos: 'Te alabare mi buen Jesus,Danilo Montero_Vamos a cantar,En espiritu y verdad_El Senor es mi pastor,Danilo Montero'
        }, {
            endDate: '2020-07-26', startDate: '2020-07-26',
            title: 'Programa Dominical ONLINE 18',
            cantos: 'Bueno es Dios,Don Moen_Dios poderoso,IBI_Aqui estoy adorandote,Conquistando Fronteras'
        }, {
            endDate: '2020-08-02', startDate: '2020-08-02',
            title: 'Programa Dominical ONLINE 19',
            cantos: 'Tu nombre oh Dios,Marcos Witt_Gracia sublime es,En espiritu y verdad_Dios el mas grande,Juan Carlos Alvarado'
        }, {
            endDate: '2020-08-09', startDate: '2020-08-09',
            title: 'Programa Dominical ONLINE 20',
            cantos: 'Eres mi amigo fiel,Coalo Zamorano_El Dios que adoramos,Sovereign Grace_A ti,Marcos Witt'
        }, {
            endDate: '2020-08-16', startDate: '2020-08-16',
            title: 'Programa Dominical ONLINE 21',
            cantos: 'Eres digno de gloria,Coalo Zamorano_Un siervo para tu gloria,IBI_Dios ha sido fiel,Marcos Witt'
        }, {
            endDate: '2020-08-23', startDate: '2020-08-23',
            title: 'Programa Dominical ONLINE 22',
            cantos: 'Al que es digno,Coalo Zamorano_Dios imparable,Marcos Witt_Cuan grande es Dios,En espiritu y verdad_Jesus mi fiel amigo,Abel Zavala'
        }, {
            endDate: '2020-08-30', startDate: '2020-08-30',
            title: 'Programa Dominical ONLINE 23',
            cantos: 'Hay libertad,IBI_Nada es imposible,Marco Barrientos_Jesus mi fiel amigo,Abel Zavala'
        }, {
            endDate: '2020-09-06', startDate: '2020-09-06',
            title: 'Programa Dominical ONLINE 24',
            cantos: 'Rey de Reyes,Marco Barrientos_Nada es imposible,Marco Barrientos_Temprano yo te buscare,Marcos Witt_Jesus mi fiel amigo,Abel Zavala'
        },

        /*Actividades sin cantos, colocar 'No' en la categoria cantos*/
        {
            endDate: '2020-07-18', startDate: '2020-07-17',
            title: 'Viaje Misionero',
            cantos: 'No'
        }

    ];

    // The order of the click handlers is predictable. Direct click action
    //callbacks come first: click, nextMonth, previousMonth, nextYear,previousYear, nextInterval, previousInterval, or today. Then
    //onMonthChange (if the month changed), inIntervalChange if the interval has changed, and finally onYearChange (if the year changed).
    calendars.clndr1 = $('.cal1').clndr({
        events: eventArray,
        clickEvents: {
            click: function (target) {
                //console.log('Cal-1 clicked: ', target.events[0].cantos);
                divDesplegarCantos.style.display = "block";
                //Borrar toda la lista de cantos cuando se presione un evento
                while (ulCantosDelDia.hasChildNodes()) {   
                    ulCantosDelDia.removeChild(ulCantosDelDia.firstChild);
                }

                /*------Si presionan un dia que tiene evento-------*/
                if (target.events[0] !== undefined){
                    let cantos = target.events[0].cantos;
                    let titulo = target.events[0].title;
                    let canto, autor, notas, autorConNotas, cantoPagina, pagina, cantoMinusculas, autorMinusculas;
                    
                    //Si es un evento sin cantos
                    if (cantos ==="No")
                        divDesplegarCantos.style.display = "none";

                    //Agregar cantos cuando se presione un evento y convertirlo en un link al canto
                    cantos = cantos.split('_');
                    TituloListaAct.innerHTML = titulo;
                    cantos.forEach(cantoConAutor => {
                        const crearli = document.createElement('li');
                        //Separamos el canto del autor
                        cantoConAutor = cantoConAutor.split(',');
                        canto = cantoConAutor[0];
                        cantoMinusculas = canto.toLowerCase();
                        if (cantoConAutor[1] != undefined){
                            autorConNotas = cantoConAutor[1].split('/');
                            autor = autorConNotas[0];
                            if (autorConNotas[1] != undefined)
                                notas = '(' + autorConNotas[1] + ')';
                            else
                                notas = "";
                        }
                        //autor = cantoConAutor[1];
                        else {
                            autor = "Pendiente";
                            notas = "";
                        }
                        let LosCantos = BaseCantos.filter(function(cancion){
                            return  cancion.titulo.toLowerCase() === cantoMinusculas; 
                        });
                        
                        //Si hay 2 o mas cantos con el mismo titulo, buscar el autor
                        if (LosCantos.length>1) {
                            LosCantos = LosCantos.filter(function(cancion){
                                autorMinusculas = autor.toLowerCase();
                                return  cancion.autor.toLowerCase() === autorMinusculas; 
                            });
                            //console.log(LosCantos);
                        }


                        if (LosCantos[0] !== undefined)
                            crearli.innerHTML = `<a href="${LosCantos[0].pagina}"><span class="nombreLista">${canto}<span> - ${autor}</a> ${notas}`;
                        else
                            crearli.innerHTML = `<a href="">${canto} - ${autor}</a> ${notas}`;

                        /*cantoPagina = mayuscula(canto).replace(/ /g,"_");
                        pagina = "Cantos/Info/" + cantoPagina + ".html";
                        crearli.innerHTML = `<a href="${pagina}">${canto} - ${autor}</a>`;*/
                        //crearli.innerHTML = cantoConAutor; 
                        ulCantosDelDia.appendChild(crearli);
                    });
                }

                /*Cuando presionen otro dia que no tenga evento, ocultar el div de la lista de cantos*/
                else {
                    TituloListaAct.innerHTML = "";
                    divDesplegarCantos.style.display = "none";
                }
            },
            today: function () {
                console.log('Cal-1 today');
            },
            nextMonth: function () {
                console.log('Cal-1 next month');
            },
            previousMonth: function () {
                console.log('Cal-1 previous month');
            },
            onMonthChange: function () {
                console.log('Cal-1 month changed');
            },
            nextYear: function () {
                console.log('Cal-1 next year');
            },
            previousYear: function () {
                console.log('Cal-1 previous year');
            },
            onYearChange: function () {
                console.log('Cal-1 year changed');
            },
            nextInterval: function () {
                console.log('Cal-1 next interval');
            },
            previousInterval: function () {
                console.log('Cal-1 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-1 interval changed');
            }
        },
        multiDayEvents: {
            singleDay: 'date',
            endDate: 'endDate',
            startDate: 'startDate'
        },
        showAdjacentMonths: true,
        adjacentDaysChangeMonth: false
    });

    // Calendar 2 uses a custom length of time: 2 weeks paging 7 days
    /*calendars.clndr2 = $('.cal2').clndr({
        lengthOfTime: {
            days: 14,
            interval: 7
        },
        events: eventArray,
        multiDayEvents: {
            singleDay: 'date',
            endDate: 'endDate',
            startDate: 'startDate'
        },
        template: $('#template-calendar').html(),
        clickEvents: {
            click: function (target) {
                console.log('Cal-2 clicked: ', target);
            },
            nextInterval: function () {
                console.log('Cal-2 next interval');
            },
            previousInterval: function () {
                console.log('Cal-2 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-2 interval changed');
            }
        }
    });*/

    // Calendar 3 renders two months at a time, paging 1 month
    calendars.clndr3 = $('.cal3').clndr({
        lengthOfTime: {
            months: 2,
            interval: 1
        },
        events: eventArray,
        multiDayEvents: {
            endDate: 'endDate',
            startDate: 'startDate'
        },
        clickEvents: {
            click: function (target) {
                console.log('Cal-3 clicked: ', target);
            },
            nextInterval: function () {
                console.log('Cal-3 next interval');
            },
            previousInterval: function () {
                console.log('Cal-3 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-3 interval changed');
            }
        },
        template: $('#template-calendar-months').html()
    });

    // Bind all clndrs to the left and right arrow keys
    $(document).keydown( function(e) {
        // Left arrow
        if (e.keyCode == 37) {
            calendars.clndr1.back();
            calendars.clndr2.back();
            calendars.clndr3.back();
        }

        // Right arrow
        if (e.keyCode == 39) {
            calendars.clndr1.forward();
            calendars.clndr2.forward();
            calendars.clndr3.forward();
        }
    });

    /*------------Funcion para hacer la primera letra de cada palabra del canto en mayuscula para enviar a la pagina--*/
    function mayuscula (canto){
        canto = canto.split(" ");
        for (var i = 0, x = canto.length; i < x; i++) {
            canto[i] = canto[i][0].toUpperCase() + canto[i].substr(1);
        }
    
        return canto.join(" ");
    }
});
