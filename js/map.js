var map = "";

function initMap() {
    // Load map layers

    // OpenStreetMap default tiles
	var osm_remote = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	  attribution: 'Mapa base &copy; Contribuyentes de <a href="http://openstreetmap.org">OpenStreetMap</a>, Licencia <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	  maxZoom: 18
	});

    // Google layers
	var google_hybrid = new L.Google('HYBRID');
	var google_roadmap = new L.Google('ROADMAP');

    // Bing Maps layers
	var bing_roadmap = new L.BingLayer("AsOWvxBlrK6QzYW2gOFne8C4Ln6OgehGD85BeFZIH-P6s5uIv1rjoftPqjGjZHgd", {type: 'Road'});
    var bing_hybrid = new L.BingLayer("AsOWvxBlrK6QzYW2gOFne8C4Ln6OgehGD85BeFZIH-P6s5uIv1rjoftPqjGjZHgd", {type: 'AerialWithLabels'});

    // OpenStreetMap - Transport lines (Andy Allan's custom tiles)
    var osm_transport = new L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
        attribution: 'Mapa base &copy; Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>. Design: <a href="http://www.thunderforest.com/">Andy Allan</a>',
	  maxZoom: 18
	});

    // OpenStreetMap - unnamed streets (Simon Poole's custom tiles)
    var osm_unnamed_streets  = new L.tileLayer('http://tile3.poole.ch/noname/{z}/{x}/{y}.png', {
          attribution: 'Mapa base &copy; Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>. Design: <a href="http://www.thunderforest.com/">Simon Poole</a>',
        transparent: true,
        attribution: "Simon Poole",
        tiled: true
    });

    // OpenStreetMap "artistic" tiles
    var osm_stamen = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        attribution: 'Mapa base &copy; Colaboradores de <a href="http://openstreetmap.org">OpenStreetMap</a>. Diseño de mosaicos: <a href="http://www.stamen.com/">Stamen</a>',
        maxZoom: 18
    });

	var baseLayers = {
	  "OpenStreetMap Internet": osm_remote,
        "OpenStreetMap Transporte": osm_transport,
        "OpenStreetMap artístico": osm_stamen,
        "Bing Maps Calles": bing_roadmap,
        "Bing Maps Híbrido": bing_hybrid,
        "Google Calles": google_roadmap,
        "Google Híbrido": google_hybrid
	};

    var overlayLayers = {
        "Calles sin nombre (OSM)": osm_unnamed_streets
    }


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