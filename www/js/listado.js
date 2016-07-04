var varTemplate;
var indice = 1;
function muestraAction() {
    indice = 1;
    mostrarEstado($(this).attr('id'));
}

function mostrarEstado(modo) {
    sessionStorage.modo = modo;

    clientRest.listarAnunciosBicis.read({
        pais: sessionStorage.pais,
        ciudad: sessionStorage.ciudad,
        indice: indice,
        tipo: sessionStorage.modo.replace("link", "")
    }).done(function (data) {
        $("#listaComprar").html(varTemplate(data));


        $("#listaComprar").on("click", "button", function () {
            sessionStorage.detalleSeleccionado = $(this).attr('id');
            window.location = "detalle.html";
        });
    });

}


function anunciarListadoAction() {
    window.location = "publicar.html";
}

function compilarTemplates() {
    varTemplate = Handlebars.compile($("#templateListado").html());


    //console.log("ok");
}

function bindingEvents() {
    $("#fixielink").on('vclick', muestraAction);
    $("#fixeablelink").on('vclick', muestraAction);
    $("#fixsitelink").on('vclick', muestraAction);
    $("#fixerlink").on('vclick', muestraAction);
    $("#anunciarlistado").on('vclick', anunciarListadoAction);

    $(window).scroll(function () {
        if ($(window).scrollTop() + window.innerHeight == $(document).height()) {
            cargarMasAction();
        }
    });

}

function cargarMasAction(){
    indice = indice + 1;
    clientRest.listarAnunciosBicis.read({
        pais: sessionStorage.pais,
        ciudad: sessionStorage.ciudad,
        indice: indice,
        tipo: sessionStorage.modo.replace("link", "")
    }).done(function (data) {
        if (data){
        $("#listaComprar").append(varTemplate(data));


        $("#listaComprar").on("click", "button", function () {
            sessionStorage.detalleSeleccionado = $(this).attr('id');
            window.location = "detalle.html";
        });
    }
    });
    
}

function inicializar() {
    compilarTemplates();
    bindingEvents();
    inicializarRestClient();

    if (sessionStorage.modo) {
        $('#' + sessionStorage.modo).addClass("ui-state-persist ui-btn-active");
        mostrarEstado(sessionStorage.modo);
    }
    $("#tituloCiudad").html(sessionStorage.ciudadDescripcion);





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