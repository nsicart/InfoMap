var map = L.map('map').setView([42.0, 1.0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
var marker = L.marker([42.0, 1.0]).addTo(map);
