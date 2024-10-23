// Carregar punts d'interès
function fetchPointsOfInterest(lat, lng) {
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
        .then(response => response.json())
        .then(data => {
            data.elements.forEach(function(element) {
                if (element.lat && element.lon && element.tags && element.tags.name) {
                    var lat = element.lat;
                    var lng = element.lon;
                    var name = element.tags.name;
                    L.circle([lat, lng], { color: 'blue', fillColor: 'transparent', fillOpacity: 0, radius: 50 }).addTo(map)
                        .bindPopup(name);
                }
            });
        })
        .catch(error => {
            console.error('Error carregant els punts d’interès: ', error);
        });
    });
}
