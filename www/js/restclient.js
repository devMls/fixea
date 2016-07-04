var client;

Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,50);
    return new Handlebars.SafeString(theString)
});

function inicializarRestClient() {
    //se puede apuntar a dentro de la aplicacion
    clientRest = new $.RestClient(
            '@domain@/servicios/'
            );

    clientRest.add("listarpaises");
    clientRest.add("publicarAnuncioBici");
    clientRest.add("crearUsuario");
    clientRest.add("conectarUsuario");
    clientRest.add("listarciudadespais");
    clientRest.add("listarAnunciosBicis");
    clientRest.add("detalleAnuncioBici");
    clientRest.add("contactar");
    
    clientRest.add("listarAnunciosUsuario");
    clientRest.add("borrarUsuario");
    clientRest.add("borrarAnuncioBicir");
    clientRest.add("cambiarPassword");





}

