function playJotformAudio(point, currentLat, currentLng) {
    if (audioEnabled && point.source === 'JotForm' && point.audioUrl && !point.audioPlayed) {
        var distance = map.distance([currentLat, currentLng], [point.lat, point.lng]);
        if (distance < 50) { // Si estem a menys de 50 metres del punt
            var audio = new Audio(point.audioUrl);
            audio.play();
            point.audioPlayed = true; // Marcar l'àudio com a reproduït
        }
    }
}
