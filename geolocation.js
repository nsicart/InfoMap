if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, handleError, { enableHighAccuracy: true });
} else {
    alert("El teu navegador no suporta la geolocalització.");
}

function updateLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 13);
}

function handleError(error) {
    console.error("Error obtenint la ubicació:", error);
}
