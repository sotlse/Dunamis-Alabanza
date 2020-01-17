var clndrTemplate =
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

              '<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>' +
                  "<td class='header-day'><%= daysOfTheWeek[i] %></td>" +
              '<% } %>' +
              '</tr>' +
          '</thead>' +
          '<tbody>' +
          '<% for(var i = 0; i < numberOfRows; i++){ %>' +
              '<tr>' +
              '<% for(var j = 0; j < 7; j++){ %>' +
              '<% var d = j + i * 7; %>' +
                  "<td class='<%= days[d].classes %>'>" +
                      "<div class='day-contents'><%= days[d].day %></div>" +
                  '</td>' +
              '<% } %>' +
              '</tr>' +
          '<% } %>' +
          '</tbody>' +
      '</table>';

      



    
      <button class="botonTransportar">
        C->D
      </button>  

      <button class="botonAudio">
        <i class="fas fa-music"></i>
      </button>  

      <button class="botonTextoChico">
        <i class="fas fa-text-height"> -</i>
      </button> 

      <button class="botonTextoGrande">
        <!--<i class="material-icons">format_size</i>-->
        <i class="fas fa-text-height"> +</i>
      </button> 

      <button class="botonCasa">
        <i class="fa fa-home"></i>
      </button> 
        
    </nav>