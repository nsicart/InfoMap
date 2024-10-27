function playOSMAudio(point, currentLat, currentLng) {
    if (audioEnabled && point.source === 'OSM' && point.description && !point.audioPlayed) {
        var distance = map.distance([currentLat, currentLng], [point.lat, point.lng]);
        if (distance < 20) { // Si estem a menys de 50 metres
            const speech = new SpeechSynthesisUtterance(point.description);
            speech.lang = selectedLanguage;
            window.speechSynthesis.speak(speech);
            point.audioPlayed = true; // Marcar l'àudio com a reproduït
        }
    }
}

