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

	var google_satellite = new L.Google();
	var google_terrain = new L.Google('TERRAIN');
	var bing = new L.BingLayer("AsOWvxBlrK6QzYW2gOFne8C4Ln6OgehGD85BeFZIH-P6s5uIv1rjoftPqjGjZHgd");

	var baseLayers = {
	  "OpenStreetMap Internet": osm_remote,
	  "OpenStreetMap Intranet": osm_intranet,
	  "Bing Maps": bing,
	  "Google Satellite": google_satellite,
	  "Google Terrain": google_terrain
	};

	/**
	 * Bounding box continental Argentina
	 *
	 * E -53.367
     * W -58.583
     * N -21.783
     * S -73.533
	 *
	 * == Caja == 
	 *  NE -21.783 / -53.367
	 *  SW -73.533 / -58.583
	 *
	 **/

	/* Load map with OSM standard as default layer. */
	map = L.map("map", {
	  layers: [osm_remote]
	});

	var layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);

	map.fitBounds([[-21.783, -53.367], [-55.057, -58.583]]);
}

/**
 * function showPolygon()
 *
 * Loads and show polygon
 **/
function showPolygon(input) {
	var radiosLayer = L.geoJson(input);

	/* Ajusta mapa a layer radio */
	map.fitBounds(radiosLayer.getBounds(), {duration: 1, animate: true});

	/* Muestra layer radio */
	radiosLayer.addTo(map);
}