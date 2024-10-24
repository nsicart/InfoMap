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

// Carregar punts OSM a prop de la nova ubicació
    loadOSMPoints(lat, lng);

// Reproduir àudio per als punts de JotForm si es compleixen les condicions
    JotformPointsOfInterest.forEach(point => {
        playJotformAudio(point, lat, lng);
    });
// Cridar a generateOSMDescription i després intentar reproduir l'àudio
generateOSMDescription(OSMPointsOfInterest[OSMPointsOfInterest.length - 1], lat, lng)
    .then(() => {
        playOSMAudio(OSMPointsOfInterest[OSMPointsOfInterest.length - 1], lat, lng);
    });

}
