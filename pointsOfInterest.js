pointsOfvar pointsOfInterest = [];

function fetchPointsOfInterest(lat, lng) {
    // Lògica per obtenir punts d'interès
}

function checkProximity(lat, lng) {
    pointsOfInterest.forEach(point => {
        var distance = map.distance([lat, lng], [point.lat, point.lng]);
        if (distance < 50 && !point.descriptionFetched) {
            getPointDescription(point);
            point.descriptionFetched = true;
        }
    });
}
