/*Documento JS que contiene funciones necesarias
 para el funcionamiento correcto de la aplicacion*/
//Funcion que obtiene el ultimo evento de un rastreo
function ultimoRastreo(rastreo){
	var resultado = "";
	var url= "http://192.168.10.45:7001/ptxws/rest/api/v1/guia/historico/ultimoevento/";
	if(rastreo !=""){
		$.ajax({
				crossOrigin: true,
				beforeSend: function() { $.mobile.loading( "show" ); },
				type:"GET",
				timeout:60000,
				jsonp: "callback",
				url: url+rastreo,
				dataType: "jsonp",
				jsonpCallback: 'Resultado',
				success: function(datos) {
					$.mobile.loading( "hide" );
					$("#busqueda").empty();
					var info = datos;
					var respuesta ="";
					if(info != ""){
						$.each(datos, function(llave){
							/*respuesta += "<li data-icon='carat-r-custom' id="+rastreo+">";
							respuesta += "<a href='#'><img src='img/elements/rastreo-(caja).png' alt='' class='ui-li-icon'>";
							respuesta += "<p class='ui-li-aside bg-green centered'><strong>" + datos[llave].status + " " + datos[llave].hora + "</strong></p>";
							respuesta +="<span class='green'>"+rastreo+"</span></a></li>";*/
							respuesta += "<li id="+rastreo+">";
							respuesta += "<div class='card'>";
							respuesta += "<p class='card-title'><strong>Guía: </strong>" + rastreo + "</p>";
							respuesta += "<p><strong>" + datos[llave].status + "</strong></p>";
							respuesta += "<p class='url'><a>" + datos[llave].fecha + " - " + datos[llave].hora + "</a></p>";
							respuesta += "</li>";
						});
						$("#busqueda").append(respuesta).listview('refresh');
						window.localStorage.setItem("rastreo", rastreo);
					}
					else{
						window.plugins.toast.showLongBottom('!No se encontraron resultados!', function(a){
							console.log('toast success: ' + a)}
							, function(b){
								alert('toast error: ' + b)});
					}
				},
				error: function(jqXHR,text_status,strError){
					$.mobile.loading( "hide" );
					if(jqXHR.status == 404){
						window.plugins.toast.showLongBottom('!Error 404: Por favor verifica tu conexión!');
					}else if(jqXHR.status == 500){
						window.plugins.toast.showLongBottom('!Error: 500\nEl servidor no esta listo!');
					}
					else{
						alert("Error: "+ jqXHR.status + "\n"+jqXHR.error);
					}
				}
			  });
	}
	else{
		window.plugins.toast.showLongCenter('!Debes introducir un rastreo!');
	}
}

//Funcion que obtiene el historial de un rastreo
function historialRastreo(rastreo){
	var resultado = "";
	var url= "http://192.168.10.45:7001/ptxws/rest/api/v1/guia/historico/";
	if(rastreo !=""){
		$("#ul_historico").empty();
		$.ajax({
				crossOrigin: true,
				beforeSend: function() { $.mobile.loading( "show" ); },
				type:"GET",
				timeout:60000,
				jsonp: "callback",
				url: url+rastreo,
				dataType: "jsonp",
				jsonpCallback: 'Resultado',
				success: function(datos) {
					var info = datos;
					var respuesta ="";
					if(info != ""){
						$.each(datos, function(llave){
						respuesta += "<li>";
						respuesta += "<div class='card'>";
						respuesta += "<p class='card-title'>" + datos[llave].sucursal + "</p>";
						respuesta += "<p><strong>" + datos[llave].status + "</strong></p>";
						respuesta += "<p class='url'><a>" + datos[llave].fecha + " - " + datos[llave].hora + "</a></p>";
						respuesta += "</li>";
					});
					$("#ul_historico").append(respuesta);
					$.mobile.changePage("#historial");
					//Oculto el icono de cargando
					$.mobile.loading( "hide" );
					}
					else{
						window.plugins.toast.showLongBottom('!No se encontraron resultados!');
					}
				},
				error: function(jqXHR,text_status,strError){
					$.mobile.loading( "hide" );
					if(jqXHR.status == 404){
						window.plugins.toast.showLongBottom('!Error: 404\nPor vafor revisa tu conexión!');
					}else if(jqXHR.status == 500){
						window.plugins.toast.showLongBottom('!Error: 500\nEl servidor no esta listo!');
					}
					else{
						alert("Error: "+ jqXHR.status + "\n"+jqXHR.error);
					}
				}
			  });
	}
	else{
		alert("No has ingresado numero de rastreo");
	}
}
//Evento que se desencadena al querer cerrar la applicación
function showConfirm() {
    navigator.notification.confirm(
        'Desea cerrar la applicación?',  // message
        exitFromApp,              // callback to invoke with index of button pressed
        'Salir',            // title
        ['No','Si']         // buttonLabels
    );
}
function exitFromApp(buttonIndex) {
  if (buttonIndex==2){
    navigator.app.exitApp();
    }
}
//Funcion que detecta si se encuentra en la pagina de inicio 
//y ademas se presiona la tecla "atras"
document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#inicio')){
        showConfirm();
    }
    else {
        navigator.app.backHistory()
    }
}, false);