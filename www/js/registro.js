var registrado = false;
function homeAction() {
    window.location = "index.html";
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function aceptarRegistroAction() {
    datosbuenos = true;


    if (datosbuenos && !$('#pwRegistro').val()) {
        datosbuenos = false;
        registrado = false;
        $("#textologin").html('los passwords no pueden ser vacios');
        $("#popupRegistro").popup();
        $("#popupRegistro").popup("open", null);
    }
    if (datosbuenos && !$('#unRegistro').val()) {
        datosbuenos = false;
        registrado = false;
        $("#textologin").html('el usuario no puede ser vacio');
        $("#popupRegistro").popup();
        $("#popupRegistro").popup("open", null);
    }
    if (datosbuenos && $('#pwRegistro').val() != $('#pwRegistro2').val()) {
        datosbuenos = false;
        registrado = false;
        $("#textologin").html('los passwords deben coincidir');
        $("#popupRegistro").popup();
        $("#popupRegistro").popup("open", null);
    }
    if (datosbuenos && !validateEmail($('#email').val())) {
        datosbuenos = false;
        registrado = false;
        $("#textologin").html('email no valido');
        $("#popupRegistro").popup();
        $("#popupRegistro").popup("open", null);
    }


    if (datosbuenos) {
        clientRest.crearUsuario.create({
            email: $('#email').val(),
            password: $('#pwRegistro').val(),
            nombre: $('#unRegistro').val()
        }).done(function (data) {

            $("#textologin").html(data);

            if (data == 'OK') {
                registrado = true;
                $("#textologin").html('usuario creado, revise su email para validarlo');
            }
            $("#popupRegistro").popup();
            $("#popupRegistro").popup("open", null);

        }).error(function (data) {
            alert(data.responseText.toString());
        });
    }

}
function finalizarAction() {
    if (registrado) {
        window.location = "index.html";
    } else {
        $("#popupRegistro").popup("close");

    }
}



function compilarTemplates() {
}
function bindingEvents() {
    $("#homeRegistrarse").on('vclick', homeAction);
    $("#aceptarRegistro").on('vclick', aceptarRegistroAction);
    $("#confirmar").on('vclick', finalizarAction);


}
function inicializar() {
    compilarTemplates();
    bindingEvents();
    inicializarRestClient();
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