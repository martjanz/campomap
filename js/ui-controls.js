$( document ).ready(function() {

	initMap();

	// Click/Enter en botón Buscar
	$("#btnBuscar").on("click", function(e) {
		// Evita el submit del botón
		e.preventDefault();

        // TODO: Chequear que ningún campo esté vacío

		/* Arma la consulta
    		clavera: 060070000105
    			provincia: 06
    			partido: 007
    			localidad: 000
    			fraccion: 01
    			radio: 05
		*/

		// Zerofill identificación.
		var clave = String('00' + $("#codProvincia").val()).slice(-2);
		clave += String('000' + $("#codDepartamento").val()).slice(-3);
		clave += String('000' + $("#codLocalidad").val()).slice(-3);
		clave += String('00' + $("#codFraccion").val()).slice(-2);
		clave += String('00' + $("#codRadio").val()).slice(-2);

		// Ejecuta la consulta y obtiene el resultado.
		$.getJSON("http://172.16.48.68/mapa/sql-api.php?geotable=radios&geomfield=geom&fields=cod_part,cod_loc,fraccion,radio,geom&parameters=clavera='" + clave + "'", function(data) {
		}).done(function(data) { /* Si existe el radio censal, lo muestra. */
			mostrarRadio(data);
		}).fail(function() { /* Si no existe el radio muestra un mensaje de error. */
			alert("No se encontró ningún radio censal con ese código.");
		});
	});

	map.on('baselayerchange', function(e) {
		if ((e.name == 'Bing Maps') || (e.name == 'Google Satélite')) {
			$('.leaflet-clickable').css('stroke', '#FFFF00');
			$('.leaflet-clickable').css('stroke-opacity', '0.7');
			$('.leaflet-clickable').css('fill', '#FCFFBD');
			$('.leaflet-clickable').css('fill-opacity', '0.3');
		} else {
			$('.leaflet-clickable').css('stroke', '#0033FF');
			$('.leaflet-clickable').css('stroke-opacity', '0.7');
			$('.leaflet-clickable').css('fill', '#0033FF');
			$('.leaflet-clickable').css('fill-opacity', '#0.2');
		}
	});
});