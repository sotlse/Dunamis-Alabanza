//Variables
//let divListaActividades = document.querySelector(".ListaActividades");
let TituloListaAct = document.querySelector(".TituloListaAct");
//let divDesplegarCantos = documet.querySelector(".DesplegarCantos");
let ulCantosDelDia = document.querySelector(".CantosDelDia");

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

    // Assuming you've got the appropriate language files,
    // clndr will respect whatever moment's language is set to.
     moment.locale('es-do');

    // Here's some magic to make sure the dates are happening this month.
    var thisMonth = moment().format('YYYY-MM');
    // Events to load into calendar
    var eventArray = [
        /*{
            title: 'Multi-Day Event',
            endDate: thisMonth + '-14',
            startDate: thisMonth + '-10'
        }, {
            date: thisMonth + '-26',
            title: 'Single Day Event'
        },*/ 
        {
            endDate: '2020-01-12', startDate: '2020-01-12',
            title: 'Programa Dominical 2',
            cantos: 'Bueno es Dios_Cristo te exaltamos_Canta al Senor_Al estar aqui_Hermoso Dios'
        }, {
            endDate: '2020-01-19', startDate: '2020-01-19',
            title: 'Programa Dominical 3',
            cantos: 'No a nosotros_Cerca de mi_Dios_Sentado en su trono_Tu nombre levantare'
        }, {
            endDate: '2020-01-26', startDate: '2020-01-26',
            title: 'Programa Dominical 4',
            cantos: 'Al que me cine_Quien nos separara_Al alto y sublime_Con mis manos levantadas_Bueno es Dios'
        }, {
            endDate: '2020-02-02', startDate: '2020-02-02',
            title: 'Programa Dominical 5',
            cantos: 'Eres fiel_Eres bendito_Mas el Dios de toda gracia_Santo Santo Santo_Cuando yo senti'
        }, {
            endDate: '2020-02-09', startDate: '2020-02-09',
            title: 'Programa Dominical 6',
            cantos: 'Por Siempre,Vino Nuevo_Quiero entender_Sendas Dios hara_Temprano yo te buscare_Tu habitas'
        }, {
            endDate: '2020-02-16', startDate: '2020-02-16',
            title: 'Programa Dominical 7',
            cantos: 'Tu eres Santo_Nuestro Salvador_Dios puede salvar_Jesus mi fiel amigo_Tu nombre oh Dios'
        }, {
            endDate: '2020-02-23', startDate: '2020-02-23',
            title: 'Programa Dominical 8',
            cantos: 'Tu eres Dios,En espiritu y Verdad_Te dare lo mejor_Jesus es el Senor_Cerca de ti_Somos el pueblo de Dios'
        }
    ];

    // The order of the click handlers is predictable. Direct click action
    // callbacks come first: click, nextMonth, previousMonth, nextYear,
    // previousYear, nextInterval, previousInterval, or today. Then
    // onMonthChange (if the month changed), inIntervalChange if the interval
    // has changed, and finally onYearChange (if the year changed).
    calendars.clndr1 = $('.cal1').clndr({
        events: eventArray,
        clickEvents: {
            click: function (target) {
                //console.log('Cal-1 clicked: ', target.events[0].cantos);
                let cantos = target.events[0].cantos;
                let titulo = target.events[0].title;
                
                console.log(ulCantosDelDia.lastElementChild);
                if (ulCantosDelDia.lastElementChild !== null){
                    console.log("Si");
                    ulCantosDelDia.removeChild(ulCantosDelDia.childNodes[0]); 
                }

                if (cantos)
                {
                    cantos = cantos.split('_');
                    TituloListaAct.innerHTML = titulo;
                    
                    
                    cantos.forEach(canto => {
                        const crearli = document.createElement('li');
                        crearli.innerHTML = canto;
                        //`<a href="${canto.pagina}">${canto.titulo} - <span style="color:black">${canto.tipo}</span></a>`; 
                        ulCantosDelDia.appendChild(crearli);
                    });
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
});
