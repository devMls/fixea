var varTemplatePaises;
var vartemplateCiudades;

function desconectarAction() {
   // localStorage.email = null;
   // localStorage.idUsuario = null;
    // $("#popupLogin").popup("open", null);
    window.location = "config.html";

}

function conectarseAccion() {

    clientRest.conectarUsuario.read({
        email: $('#un').val(),
        password: $('#pw').val()
    }).done(
            function (data) {
                if (data) {
                    if (data.validado == 1)
                    {
                        localStorage.email = data.email;
                        localStorage.idUsuario = data._id;
                        $("#popupLogin").popup("close");
                    }
                    else {
                        $("#textoIncorrecto").html("usuario no validado, revise el correo");

                    }
                } else {
                    $("#textoIncorrecto").html("usuario incorrecto por favor reintente");
                }
            });
}

function comprarAction() {
    sessionStorage.modo = "fixeablelink";
    window.location = "listado.html";
}
function venderAction() {
    sessionStorage.modo = "fixielink";
    window.location = "listado.html";
}
function registrarseAccion() {
    window.location = "registro.html";
}
function fixmanAction() {
    sessionStorage.modo = "fixerlink";
    window.location = "listado.html";
}
function lugarAction() {
    sessionStorage.modo = "fixsitelink";
    window.location = "listado.html";
}
function anunciarAction() {
    window.location = "publicar.html";
}
function deshabilitarGeneral() {
    $("#fixeable").prop('disabled', true).addClass('ui-disabled');
    $("#fixie").prop('disabled', true).addClass('ui-disabled');
    $("#fixsite").prop('disabled', true).addClass('ui-disabled');
    $("#fixer").prop('disabled', true).addClass('ui-disabled');
}
function seleccionarPaisAction() {
    sessionStorage.pais = $("#paisSelector").val();
    $('#ciudadSelector').val('');
    sessionStorage.ciudad = null;
    deshabilitarGeneral();
    $('#ciudadSelector').selectmenu("enable");
    $('#ciudadSelector').removeClass('ui-disabled');
    $("#ciudadSelector").selectmenu("refresh");


    clientRest.listarciudadespais.read({idPais: sessionStorage.pais})
            .done(function (data) {
                $("#ciudadSelector").html(vartemplateCiudades(data));
                $('#ciudadSelector').val('');
            });


}
function seleccionarCiudad() {
    sessionStorage.ciudad = $("#ciudadSelector").val();
    sessionStorage.ciudadDescripcion = $("#ciudadSelector option:selected").text();
    ;
    $("#fixeable").prop('disabled', false).removeClass('ui-disabled');
    $("#fixie").prop('disabled', false).removeClass('ui-disabled');
    $("#fixsite").prop('disabled', false).removeClass('ui-disabled');
    $("#fixer").prop('disabled', false).removeClass('ui-disabled');


}
function compilarTemplates() {
    varTemplatePaises = Handlebars.compile($("#templatePaises").html());
    vartemplateCiudades = Handlebars.compile($("#templateCiudades").html());
}
function bindingEvents() {
    $("#fixeable").on('vclick', comprarAction);
    $("#fixie").on('vclick', venderAction);
    $("#fixsite").on('vclick', lugarAction);
    $("#fixer").on('vclick', fixmanAction);
    $("#ciudadSelector").on('change', seleccionarCiudad);
    $("#paisSelector").on('change', seleccionarPaisAction);
    $("#anunciar").on('vclick', anunciarAction);
    $("#registrarse").on('vclick', registrarseAccion);
    $("#conectarse").on('vclick', conectarseAccion);
    $("#cerrarsesion").on('vclick', desconectarAction);




}
function inicializar() {
    compilarTemplates();
    bindingEvents();

    inicializarRestClient();

    //jsonplaceholder.typicode.com/post/1
    clientRest.listarpaises.read()
            .done(
                    function (data) {
                        $("#paisSelector").append(varTemplatePaises(data));
                        if (sessionStorage.pais)
                        {
                            $('#paisSelector').val(sessionStorage.pais);

                            clientRest.listarciudadespais.read({idPais: sessionStorage.pais})
                                    .done(function (data) {
                                        $('#ciudadSelector').selectmenu();//inicializacion no se poruqe hace falta marcha atras
                                        $("#ciudadSelector").html(vartemplateCiudades(data));
                                        if (sessionStorage.ciudad && sessionStorage.ciudad != 'null') {
                                            $('#ciudadSelector').val(sessionStorage.ciudad);
                                        } else {
                                            $('#ciudadSelector').val('');
                                        }
                                        $("#ciudadSelector").selectmenu("refresh");
                                    });


                        } else
                        {
                            $('#paisSelector').val('');
                            $('#ciudadSelector').selectmenu();//inicializacion no se poruqe hace falta marcha atras
                            $('#ciudadSelector').prop('disabled', 'disabled').addClass('ui-disabled');
                            $('#ciudadSelector').val('');
                            $("#ciudadSelector").selectmenu("refresh");
                            sessionStorage.ciudad = null;
                        }
                        $('#paisSelector').selectmenu();
                        $("#paisSelector").selectmenu("refresh");
                        if (sessionStorage.ciudad == "null") {
                            deshabilitarGeneral();
                        }
                        if (!localStorage.email || localStorage.email == "null") {
                            $("#popupLogin").popup();
                            $("#popupLogin").popup("open", null);
                        }
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