var map = "";

function initMap() {

	// OpenStreetMap VM (acceso desde intranet) - Sólo tiles Argentina
	var osm_intranet = new L.tileLayer('http://172.16.50.37:8001/osm_tiles/{z}/{x}/{y}.png', {
	  attribution: 'Mapa base &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, Licencia <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imágenes © <a href="http://cloudmade.com">CloudMade</a>',
	  maxZoom: 18
	});

	// OpenStreetMap estándar
	var osm_remote = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	  attribution: 'Mapa base &copy; Contribuyentes de <a href="http://openstreetmap.org">OpenStreetMap</a>, Licencia <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	  maxZoom: 18
	});

	// OpenStreetMap - Líneas de transporte (Andy Allan tiles)
	var osm_transporte = new L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
	  attribution: 'Mapa base &copy; Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>. Mosaicos, cortesía de <a href="http://www.thunderforest.com/">Andy Allan</a>',
	  maxZoom: 18
	});

	// OpenStreetMap - Calles sin nombre (Simon Poole tiles)
	var osm_calles_sin_nombre  = new L.tileLayer('http://tile3.poole.ch/noname/{z}/{x}/{y}.png', {
	  	attribution: 'Mapa base &copy; Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>. Mosaicos, cortesía de <a href="http://www.thunderforest.com/">Simon Poole</a>',
	    transparent: true,
	    attribution: "Simon Poole",
	    tiled: true
	});


	var intersecciones = new L.tileLayer.wms("http://172.16.48.68:8080/geoserver/enmodo/gwc/service/wms", {
	    layers: 'enmodo:osm_intersecciones',
	    format: 'image/png',
	    transparent: true,
	    version: '1.1.0',
	    attribution: "Martín Anzorena",
	    tiled: true
	});

	var departamentos_indec = new L.tileLayer.wms("http://172.16.48.68:8080/geoserver/enmodo/gwc/service/wms", {
	    layers: 'enmodo:departamentos_indec',
	    format: 'image/png',
	    transparent: true,
	    opacity: 0.5,
	    version: '1.1.0',
	    attribution: "Martín Anzorena"
	});

	var calles_indec = new L.tileLayer.wms("http://172.16.48.68:8080/geoserver/enmodo/gwc/service/wms", {
	    layers: 'enmodo:calles_indec',
	    format: 'image/png',
	    transparent: true,
	    opacity: 0.5,
	    version: '1.1.0',
	    attribution: "Martín Anzorena"
	});

	var lineas_transporte = new L.tileLayer.wms("http://172.16.48.68:8080/geoserver/enmodo/gwc/service/wms", {
	    layers: 'enmodo:lineas_transporte_publico',
	    format: 'image/png8',
	    transparent: true,
	    opacity: 0.5,
	    version: '1.1.0',
	    attribution: "Martín Anzorena"
	});

	var hitos = new L.tileLayer.wms("http://172.16.48.68:8080/geoserver/enmodo/gwc/service/wms", {
	    layers: 'enmodo:hitos',
	    format: 'image/png8',
	    transparent: true,
	    opacity: 1,
	    version: '1.1.0',
	    attribution: "Martín Anzorena"
	});

	// Google Satellite + Calles
	var google_satellite = new L.Google('HYBRID');

	// Google Calles
	var google_roadmap = new L.Google('ROADMAP');

	// Bing Maps Satellite
	var bing = new L.BingLayer("AsOWvxBlrK6QzYW2gOFne8C4Ln6OgehGD85BeFZIH-P6s5uIv1rjoftPqjGjZHgd");

	// OpenStreetMap - Líneas de transporte (Andy Allan tiles)
	var osm_stamen = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
	  attribution: 'Mapa base &copy; Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>. Diseño de mosaicos: <a href="http://www.stamen.com/">Stamen</a>',
	  maxZoom: 18
	});

	var baseLayers = {
		"OpenStreetMap Internet": osm_remote,
		"OpenStreetMap Transporte": osm_transporte,
		"Bing Maps": bing,
		"Google Satélite": google_satellite,
		"Google Calles": google_roadmap,
		"OpenStreetMap Intranet": osm_intranet,
		"OpenStreetMap artístico": osm_stamen
	};

	var overlayLayers = {
		"Intersecciones OSM": intersecciones,
		"Departamentos INDEC": departamentos_indec,
		"Calles INDEC": calles_indec,
		"Líneas de transporte público": lineas_transporte,
		"Hitos": hitos,
		"Calles sin nombre (OSM)": osm_calles_sin_nombre
	};

	/**
	 * Provincia de Buenos Aires
	 *
	 * == Puntos máximos ==
	 * Máx N -33.2677/-60.2656
	 * Max S -41.0373/-62.7340
	 * Max E -36.8763/-56.6662
	 * Max W -37.8415/-63.3805
	 *
	 * == Caja ==
	 *  NE -33.2677/-56.6662
	 *  SW -41.0373/-63.3805
	 *
	 **/

	/* Carga mapa con layer por defecto. */
	map = L.map("map", {
	  layers: [osm_remote],
	  maxBounds: [ // Caja dentro de la que se podrá mover la vista.
	  	[-33, -56.5], // Extremo Noreste
	  	[-41.04, -63.5]  // Extremo Sudoeste
	  ]
	});

	var layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);

	map.fitBounds([[-33, -56.5], [-41.04, -63.5]]);
}

/**
 * function mostrarRadio()
 *
 * Carga y muestra en mapa radio censal que recibe por parámetro.
 **/
function mostrarRadio(input) {
	var radiosLayer = L.geoJson(input);

	/* Ajusta mapa a layer radio */
	map.fitBounds(radiosLayer.getBounds(), {duration: 1, animate: true});

	/* Muestra layer radio */
	radiosLayer.addTo(map);
}

