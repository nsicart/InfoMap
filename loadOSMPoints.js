async function loadOSMPoints(lat, lng) {
    var queries = [
        `[out:json];node(around:5000, ${lat}, ${lng})["natural"];out body;`,
        `[out:json];node(around:5000, ${lat}, ${lng})["waterway"];out body;`,
        `[out:json];node(around:5000, ${lat}, ${lng})["place"];out body;`,
        `[out:json];node(around:5000, ${lat}, ${lng})["historic"];out body;`,
        `[out:json];node(around:5000, ${lat}, ${lng})["settlement"];out body;`
    ];

    for (const query of queries) {
        try {
            const response = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'data=' + encodeURIComponent(query)
            });

            if (!response.ok) {
                throw new Error('Error en la resposta de l\'API Overpass');
            }

            const data = await response.json();
            for (const element of data.elements) {
                if (element.lat && element.lon && element.tags && element.tags.name) {
                    const lat = element.lat;
                    const lng = element.lon;
                    const name = element.tags.name;
                    const osmId = element.id; // Utilitzem l'ID de l'element OSM

                    // Comprovar si el punt ja existeix a OSMPointsOfInterest
                    var existeix = OSMPointsOfInterest.some(point => point.osmId === osmId);
                    if (!existeix) {
                        // Fer el map matching per trobar la carretera més propera
                        const snappedPoint = await getSnappedPoint(lat, lng);
                        if (snappedPoint) {
                            const { lat: snappedLat, lng: snappedLng } = snappedPoint;

                            console.log("Afegint punt d'interès d'OSM: ", snappedLat, snappedLng, name);
                            L.circle([snappedLat, snappedLng], { color: 'blue', fillColor: 'transparent', fillOpacity: 0, radius: 50 })
                                .bindPopup(name)
                                .addTo(map);

                            // Afegir el punt d'interès a la llista
                            OSMPointsOfInterest.push({
                                osmId: osmId, // Guardar l'ID per a futures comprovacions
                                lat: snappedLat,
                                lng: snappedLng,
                                name: name,
                                audioPlayed: false,
                                source: 'OSM'
                            });
                        }
                    } else {
                        console.log("El punt ja existeix: ", lat, lng, name);
                    }
                } else {
                    console.warn('Punt d\'interès sense nom, ignorat:', element);
                }
            }
            console.log('Punts d’interès de OSM carregats correctament!');
        } catch (error) {
            console.error('Error carregant els punts d’interès des d’OpenStreetMap: ', error);
        }
    }
}

// Funció per obtenir el punt més proper sobre una carretera
async function getSnappedPoint(lat, lng) {
    try {
        const response = await fetch(`https://api.openrouteservice.org/v2/snap-to-road`, {
            method: 'POST',
            headers: {
                'Authorization': '5b3ce3597851110001cf624865a4163e7b01459ba77212067942a21c', // Substitueix per la teva clau API
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coordinates: [[lng, lat]],
                radius: [50] // Radi de cerca en metres
            })
        });

        if (!response.ok) {
            throw new Error('Error en la resposta de l\'API OpenRouteService');
        }

        const data = await response.json();
        if (data && data.snapped_points && data.snapped_points.length > 0) {
            return {
                lat: data.snapped_points[0].location[1],
                lng: data.snapped_points[0].location[0]
            };
        } else {
            console.warn('No s\'ha trobat cap carretera propera per al punt:', lat, lng);
            return null;
        }
    } catch (error) {
        console.error('Error fent el map matching: ', error);
        return null;
    }
}
