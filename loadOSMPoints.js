function loadOSMPoints(lat, lng) {
    var queries = [
        `[out:json];node(around:5000, ${lat}, ${lng})["natural"];out body;`,
        `[out:json];node(around:5000, ${lat}, ${lng})["waterway"];out body;`,
        `[out:json];node(around:5000, ${lat}, ${lng})["place"];out body;`,
        `[out:json];node(around:5000, ${lat}, ${lng})["historic"];out body;`,
        `[out:json];node(around:5000, ${lat}, ${lng})["settlement"];out body;`
    ];

    queries.forEach(query => {
        fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'data=' + encodeURIComponent(query)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la resposta de l\'API Overpass');
            }
            return response.json();
        })
        .then(data => {
            data.elements.forEach(function(element) {
                if (element.lat && element.lon && element.tags && element.tags.name) {
                    var lat = element.lat;
                    var lng = element.lon;
                    var name = element.tags.name;

                    // Comprovar si el punt ja existeix a OSMPointsOfInterest
                    var existeix = OSMPointsOfInterest.some(point => point.lat === lat && point.lng === lng);
                    if (!existeix) {
                        console.log("Afegint punt d'interès d'OSM: ", lat, lng, name);
                        L.circle([lat, lng], { color: 'blue', fillColor: 'transparent', fillOpacity: 0, radius: 50 })
                            .bindPopup(name)
                            .addTo(map);

                        // Afegir el punt d'interès a la llista
                        OSMPointsOfInterest.push({
                            lat: lat,
                            lng: lng,
                            name: name,
                            audioPlayed: false,
                            source: 'OSM'
                        });
                    } else {
                        console.log("El punt ja existeix: ", lat, lng, name);
                    }
                } else {
                    console.warn('Punt d\'interès sense nom, ignorat:', element);
                }
            });
            console.log('Punts d’interès de OSM carregats correctament!');
        })
        .catch(error => {
            console.error('Error carregant els punts d’interès des d’OpenStreetMap: ', error);
        });

// Cridar a generateOSMDescription i després intentar reproduir l'àudio
generateOSMDescription(OSMPointsOfInterest[OSMPointsOfInterest.length - 1], lat, lng)
    .then(() => {
        playOSMAudio(OSMPointsOfInterest[OSMPointsOfInterest.length - 1], lat, lng);
    });
});
}
