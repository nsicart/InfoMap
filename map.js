// Inicialitzar el mapa
var map = L.map('map').setView([42.0, 1.0], 13);

// Afegir una capa de mapes (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Afegir un marcador per a la ubicació
var marker = L.marker([42.0, 1.0], {
    icon: L.icon({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    })
}).addTo(map);
