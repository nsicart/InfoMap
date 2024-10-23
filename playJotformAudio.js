function playJotformAudio(point) {
    if (audioEnabled && point.source === 'JotForm' && point.audioUrl) {
        var audio = new Audio(point.audioUrl);
        audio.play();
    }
}
