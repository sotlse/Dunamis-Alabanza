//Variables
let TituloListaAct = document.querySelector(".TituloListaAct");
let divDesplegarCantos = document.querySelector(".DesplegarCantos");
let ulCantosDelDia = document.querySelector(".CantosDelDia");
let BaseCantos = JSON.parse(localStorage.getItem("TonosActuales"));


//Funcion regresar pagina
let botonRegresar = document.querySelector(".arrowRegresar");
if(botonRegresar){
    botonRegresar.addEventListener("click",(e) =>  {
      window.history.back();
    });
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
    var thisDay = moment().format('YYYY-MM-DD');
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
            cantos: 'Al que me cine,Jesus Adrian Romero_Quien nos separara_Al alto y sublime,Roberto Torres_Con mis manos levantadas_Bueno es alabar'
        }, {
            endDate: '2020-02-02', startDate: '2020-02-02',
            title: 'Programa Dominical 5 - 02 de Febrero',
            cantos: 'Eres fiel,Coalo Zamorano_Por Siempre,Vino Nuevo_Mas el Dios de toda gracia,Marcos Witt_Santo Santo Santo,Marcos Witt_Cuando yo senti'
        }, {
            endDate: '2020-02-09', startDate: '2020-02-09',
            title: 'Programa Dominical 6 - 09 de Febrero',
            cantos: 'Eres bendito_Quiero entender_Sendas Dios hara_Temprano yo te buscare_Tu habitas'
        }, {
            endDate: '2020-02-16', startDate: '2020-02-16',
            title: 'Programa Dominical 7 - 16 de Febrero',
            cantos: 'Tu eres Santo_Nuestro Salvador_Dios puede salvar_Jesus mi fiel amigo_Tu nombre oh Dios'
        }, {
            endDate: '2020-02-23', startDate: '2020-02-23',
            title: 'Programa Dominical 8 - 23 de Febrero',
            cantos: 'Tu eres Dios,En espiritu y Verdad_Te dare lo mejor_Jesus es el Senor_Cerca de ti_Somos el pueblo de Dios'
        },

        /*Actividades sin cantos, colocar 'No' en la categoria cantos*/
        {
            endDate: '2020-07-25', startDate: '2020-07-18',
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
                    let canto, autor, cantoPagina, pagina, cantoMinusculas, autorMinusculas;
                    
                    //Si es un evento sin cantos
                    if (cantos ==="No")
                        divDesplegarCantos.style.display = "none";

                    //Agregar cantos cuando se presione un evento y convertirlo en un link al canto
                    cantos = cantos.split('_');
                    TituloListaAct.innerHTML = titulo;
                    cantos.forEach(cantoConAutor => {
                        const crearli = document.createElement('li');
                        //Separamos el canto del autor
                        cantoConAutor = cantoConAutor.split(',')
                        canto = cantoConAutor[0];
                        cantoMinusculas = canto.toLowerCase();
                        autor = cantoConAutor[1];
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
                            crearli.innerHTML = `<a href="${LosCantos[0].pagina}">${canto} - ${autor}</a>`
                        else
                            crearli.innerHTML = `<a href="">${canto} - ${autor}</a>`

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
