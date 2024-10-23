function playOSMAudio(point) {
    if (audioEnabled && point.source === 'OSM' && point.description) {
        const speech = new SpeechSynthesisUtterance(point.description);
        speech.lang = selectedLanguage;
        window.speechSynthesis.speak(speech);
    }
}
