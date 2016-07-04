var varTemplate;

function compilarTemplates() {

    varTemplate = Handlebars.compile($("#templateSelectAnuncio").html());


}

function desconectarAction() {

    localStorage.email = null;
    localStorage.idUsuario = null;
    // $("#popupLogin").popup("open", null);
    window.location = "index.html";

}
function cambiarpassAction() {
    datosbuenos = true;
    if (datosbuenos && !$('#pwRegistro3').val()) {
        datosbuenos = false;
        $("#textologin2").html('los passwords no pueden ser vacios');
        $("#popupRegistro2").popup();
        $("#popupRegistro2").popup("open", null);
    }
    if (datosbuenos && $('#pwRegistro3').val() != $('#pwRegistro4').val()) {
        datosbuenos = false;
        $("#textologin2").html('los passwords deben coincidir');
        $("#popupRegistro2").popup();
        $("#popupRegistro2").popup("open", null);
    }
    if (datosbuenos) {

        clientRest.cambiarPassword.read({
            email: localStorage.email,
            password: $('#pwRegistro3').val()
        }).done(function (data) {

            $("#textologin2").html("password actualizado");
            $("#popupRegistro2").popup();
            $("#popupRegistro2").popup("open", null);

        }).error(function (data) {
            alert(data.responseText.toString());
        });

    }


}
function borraranuncioAction() {

    clientRest.borrarAnuncioBicir.read({idanuncio: $('#anuncioSelector').val()}).done(function (data) {

        $('#anuncioSelector').selectmenu();
        $("#anuncioSelector option:selected").remove();
        $('#anuncioSelector').val('');
        $("#anuncioSelector").selectmenu("refresh");

    });


}
function cerrarPopup() {
    $("#popupRegistro2").popup("close");
}

function bindingEvents() {
    $("#desconectar").on('vclick', desconectarAction);
    $("#cambiarpass").on('vclick', cambiarpassAction);
    $("#borraranuncio").on('vclick', borraranuncioAction);
    $("#confirmar2").on('vclick', cerrarPopup);




}
function inicializar() {
    compilarTemplates();
    bindingEvents();

    inicializarRestClient();

    clientRest.listarAnunciosUsuario.read(localStorage.idUsuario).done(function (data) {
        $("#anuncioSelector").append(varTemplate(data));
        $('#anuncioSelector').val('');
        $('#anuncioSelector').selectmenu();
        $("#anuncioSelector").selectmenu("refresh");
    });
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