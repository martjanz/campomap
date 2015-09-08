$( document ).ready(function() {

	initMap();

	// Click/Enter en botón Buscar
	$("#btnBuscar").on("click", function(e) {
		// Evita el submit del botón
		e.preventDefault();

		/* TODO: Chequear que ningún campo esté vacío */

		/* Arma la consulta */
		// http://{account}.cartodb.com/api/v2/sql?format=GeoJSON&q={query}
		// cod_indec: 064100104
		// 	provincia: 06
		// 	departamento: 410
		// 	fraccion: 01
		// 	radio: 04

		/* Zerofill identificación. */
		var clave = String('00' + $("#codProvincia").val()).slice(-2);
		clave += String('000' + $("#codDepartamento").val()).slice(-3);
		clave += String('00' + $("#codFraccion").val()).slice(-2);
		clave += String('00' + $("#codRadio").val()).slice(-2);

		var sqlQuery = "SELECT the_geom, cod_indec FROM cnphyv2010 WHERE cod_indec = '" + clave + "'";

		/* Ejecuta la consulta y obtiene el resultado. */
		$.getJSON('http://martianz.cartodb.com/api/v2/sql?format=GeoJSON&q=' + sqlQuery, function(data) {

		}).done(function(data) { /* Si existe el polígono lo muestra. */
			showPolygon(data);
		}).fail(function() { /* Si no existe el polígono muestra un mensaje de error. */
			alert("Ha ocurrido un error.");
		});
	});
});