var varTemplate;
var map;
function compilarTemplates() {
    varTemplate = Handlebars.compile($("#templateDetalle").html());
    //console.log("ok");
}
function enviarAnuncioAction() {



    clientRest.contactar.create({
        idusuario: localStorage.idUsuario,
        idanuncio: sessionStorage.detalleSeleccionado,
        texto: $("#textocontacto").val()
    }).done(function (data) {
        $("#uibartest").show();
        $("#popupcontact").popup("close");

    }).error(function (er) {
    
    console.log(er);
    });

}


function bindingEvents() {



    $("#enviarAnuncio").on('vclick', enviarAnuncioAction);
}

function inicializar() {
    compilarTemplates();

    inicializarRestClient();
    clientRest.detalleAnuncioBici.read({idanuncio: sessionStorage.detalleSeleccionado})
            .done(function (data) {


                $("#mostrarDetalle").html(varTemplate(data));

                $("#contactoemailorigen").html("datos de contacto: " + localStorage.email);
                $("#tituloDetalle").html(data.titulo);
                $("#uibartest").hide();


                bindingEvents();
                var div = document.getElementById("map_canvas");


                map = new google.maps.Map(div, {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 14
                });
                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({'address': data.direccion.concat(" ").concat(sessionStorage.ciudadDescripcion)}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {

                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                        }
                });


            }).error(function (data) {
        alert(data.responseText.toString());
    });

    ;
}




//apartir de aqui stuf de arquitectura no tocar funciona tocar inicializar joder
////////////////////////////////////////////////////////////////////////////////
function init() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", inicializar, false);
        FastClick.attach(document.body);
    } else {
        inicializar();
    }
    ;
}
jQuery(document).load(init());
////////////////////////////////////////////////////////////////////////////////