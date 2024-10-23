var pointsOfInterest = [];

function updateLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 13);

    pointsOfInterest.forEach(function(point) {
        var distance = map.distance([lat, lng], [point.lat, point.lng]);
        console.log("Distància al punt d'interès (", point.lat, point.lng, "): ", distance);
        if (distance < 200 && !point.audioPlayed) {
            playAudio(point.audioUrl);
            point.audioPlayed = true;
        }
    });

    if (!pointsOfInterest.some(point => point.source === 'OSM')) {
        fetchPointsOfInterest(lat, lng);
    }
}
