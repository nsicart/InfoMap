if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, function(error) {
        console.error("Error obtenint la ubicació: ", error);
        alert("No s'ha pogut obtenir la ubicació. Comproveu els permisos de geolocalització al vostre dispositiu.");
    }, {
        enableHighAccuracy: true
    });
} else {
    alert("El teu navegador no suporta la geolocalització.");
}

function updateLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 13);

    pointsOfInterest.forEach(function(point) {
        var distance = map.distance([lat, lng], [point.lat, point.lng]);
        if (distance < 200 && !point.audioPlayed) {
            if (point.source === 'JotForm') {
                playJotformAudio(point);
            } else if (point.source === 'OSM' && !point.description) {
                generateOSMDescription(point).then(() => playOSMAudio(point));
            } else if (point.source === 'OSM') {
                playOSMAudio(point);
            }
            point.audioPlayed = true;
        }
    });
}
