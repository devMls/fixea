var varTemplatePaisesPublicar;
var vartemplateCiudadesPublicar;
var imagen;
var botonfotoshow;
var validado = false;
function publicarAction() {

    validado = true;

    if (validado && !$('#ciudadSelectorPublicar').val()) {
        validado = false;
        $("#tetxtopublicado").html('datos incompletos');
        $("#popupPublicar").popup();
        $("#popupPublicar").popup("open", null);
    }
    if (validado && !$('#paisSelectorPublicar').val()) {
        validado = false;
        $("#tetxtopublicado").html('datos incompletos');
        $("#popupPublicar").popup();
        $("#popupPublicar").popup("open", null);
    }
    if (validado && !$('#tipoSelector').val()) {
        validado = false;
        $("#tetxtopublicado").html('datos incompletos');
        $("#popupPublicar").popup();
        $("#popupPublicar").popup("open", null);
    }
    if (validado && !$('#tituloAnuncio').val()) {
        validado = false;
        $("#tetxtopublicado").html('datos incompletos');
        $("#popupPublicar").popup();
        $("#popupPublicar").popup("open", null);
    }
    if (validado && !$('#descripcionAnuncio').val()) {
        validado = false;
        $("#tetxtopublicado").html('datos incompletos');
        $("#popupPublicar").popup();
        $("#popupPublicar").popup("open", null);
    }

    if (validado) {
        if ($('#tipoSelector').val() == "fixsite")
        {
            imagen = null;

        }
        $('#anunciarPublicar').text('publicando....');
        clientRest.publicarAnuncioBici.create({
            idCiudad: $('#ciudadSelectorPublicar').val(),
            idPais: $('#paisSelectorPublicar').val(),
            tipo: $('#tipoSelector').val(),
            titulo: $('#tituloAnuncio').val(),
            descripcion: $('#descripcionAnuncio').val(),
            fechaPublicacion: new Date().toISOString(),
            direccion: $('#direccion').val(),
            imagen: imagen,
            idUsuario: localStorage.idUsuario
        }).done(function (data) {

            $('#anunciarPublicar').text('Publicar');
            $("#tetxtopublicado").html('Anuncio publicado');
            $("#popupPublicar").popup();
            $("#popupPublicar").popup("open", null);
        }).error(function (data) {
            alert(data.responseText.toString());
        });
        ;
    }
}

function acepctarpublicarAction() {
    if (validado) {
        window.location = "index.html";
    } else {
        $("#popupPublicar").popup("close");
    }
}

function addImageAction() {
    navigator.camera.getPicture(cameraSuccess, cameraError, {
        destinationType: navigator.camera.DestinationType.DATA_URL,
        quality: 25

    });

}

function cameraSuccess(imageData) {
    console.log("Camera cleanup success.")
    imagen = imageData;
}

function cameraError(message) {
    alert('Failed because: ' + message);
}

function seleccionarPaisPublicarAction() {

    $('#ciudadSelectorPublicar').val('');
    $('#ciudadSelectorPublicar').selectmenu("enable");
    $('#ciudadSelectorPublicar').removeClass('ui-disabled');


    clientRest.listarciudadespais.read({idPais: $('#paisSelectorPublicar').val()}).done(function (data) {
        $("#ciudadSelectorPublicar").html(vartemplateCiudadesPublicar(data));
        $('#ciudadSelectorPublicar').val('');
        $('#ciudadSelectorPublicar').selectmenu();
        $("#ciudadSelectorPublicar").selectmenu("refresh");
    });





}

function tipoSelectorAction() {

    if ($('#tipoSelector').val() == "fixsite")
    {
        botonfotoshow = false;

        $("#direccionlabel").show();
        $('#direccion').show();
        $("#incluirFoto").hide();

    } else
    {
        $("#direccionlabel").hide();
        $('#direccion').hide();
        if (!botonfotoshow) {
            $('#incluirFoto').show();
            botonfotoshow = true;
        }
    }



}
function compilarTemplates() {
    varTemplatePaisesPublicar = Handlebars.compile($("#templatePaisesPublicar").html());
    vartemplateCiudadesPublicar = Handlebars.compile($("#templateCiudadesPublicar").html());



}
function bindingEvents() {
    $("#anunciarPublicar").on('vclick', publicarAction);
    $("#aceptarPublicar").on('vclick', acepctarpublicarAction);
    $("#paisSelectorPublicar").on('change', seleccionarPaisPublicarAction);
    $("#tipoSelector").on('change', tipoSelectorAction);

    $("#incluirFoto").on('vclick', addImageAction);



}
function inicializar() {
    compilarTemplates();
    bindingEvents();
    botonfotoshow = true;

    $('#ciudadSelectorPublicar').selectmenu();//inicializacion no se poruqe hace falta marcha atras
    $('#ciudadSelectorPublicar').prop('disabled', 'disabled').addClass('ui-disabled');
    $('#ciudadSelectorPublicar').val('');
    $("#ciudadSelectorPublicar").selectmenu("refresh");
    $("#direccionlabel").hide();
    $('#direccion').hide();
    inicializarRestClient();

    clientRest.listarpaises.read()
            .done(
                    function (data) {
                        $("#paisSelectorPublicar").append(varTemplatePaisesPublicar(data));
                        $('#paisSelectorPublicar').val('');
                        $('#paisSelectorPublicar').selectmenu();
                        $("#paisSelectorPublicar").selectmenu("refresh");
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