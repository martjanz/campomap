var map = "";

function initMap() {
	// OpenStreetMap VM - Sólo tiles Argentina
	/*var osm_local = new L.tileLayer('http://localhost:8001/osm_tiles/{z}/{x}/{y}.png', {
	  attribution: 'Mapa base &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, Licencia <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imágenes © <a href="http://cloudmade.com">CloudMade</a>',
	  maxZoom: 18
	}).addTo(map);*/

	// OpenStreetMap VM (acceso desde intranet) - Sólo tiles Argentina
	var osm_intranet = new L.tileLayer('http://172.16.48.68:8001/osm_tiles/{z}/{x}/{y}.png', {
	  attribution: 'Mapa base &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, Licencia <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imágenes © <a href="http://cloudmade.com">CloudMade</a>',
	  maxZoom: 18
	});

	var osm_remote = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	  attribution: 'Mapa base &copy; Contribuyentes de <a href="http://openstreetmap.org">OpenStreetMap</a>, Licencia <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	  maxZoom: 18
	});

	var google_satellite = new L.Google('HYBRID');
	var google_roadmap = new L.Google('ROADMAP');
	var bing = new L.BingLayer("AsOWvxBlrK6QzYW2gOFne8C4Ln6OgehGD85BeFZIH-P6s5uIv1rjoftPqjGjZHgd");

	var baseLayers = {
	  "OpenStreetMap Internet": osm_remote,
		"Bing Maps": bing,
	  "Google Satélite": google_satellite,
	  "Google Calles": google_roadmap,
		"OpenStreetMap Intranet": osm_intranet
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

	var layerControl = L.control.layers(baseLayers).addTo(map);

	/*map.addControl(new L.Control.Layers({'OSM Localhost': osm_local, 'OSM Intranet': osm_intranet, 'Google':ggl, 'Google Terrain':ggl2, 'Bing': bing, 'OSM Internet': osm_internet}, {}));*/
	//map.addControl(new L.Control.Layers({'OSM Internet': osmRemoteTiles}, {}));

	map.fitBounds([[-33, -56.5], [-41.04, -63.5]]);
}

/**
 * function mostrarRadio()
 *
 * Carga y muestra en mapa radio censal que recibe por parámetro.
 **/
function mostrarRadio(input) {
	var radiosLayer = L.geoJson(input);

	/* Agrega popup*/
	radiosLayer.bindPopup("Humilde y aleatorio radio censal de prueba.");

	/* Ajusta mapa a layer radio */
	map.fitBounds(radiosLayer.getBounds(), {duration: 1, animate: true});

	/* Muestra layer radio */
	radiosLayer.addTo(map);
}
