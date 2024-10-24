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

// Després de carregar tots els punts OSM
OSMPointsOfInterest.forEach(point => {
    generateOSMDescription(point, point.lat, point.lng);
});

}
