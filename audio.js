var audioEnabled = false;

document.getElementById('playButton').addEventListener('click', function() {
    audioEnabled = !audioEnabled;
    this.textContent = audioEnabled ? 'Parar Reproducció Automàtica' : 'Activar Reproducció Automàtica';
    alert(audioEnabled ? "Reproducció d'àudio activada." : "Reproducció d'àudio desactivada.");
});

async function getPointDescription(point) {
    try {
        const response = await fetch('chatgpt-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: point.name, language: selectedLanguage })
        });

        const data = await response.json();
        if (data.description) {
            const speech = new SpeechSynthesisUtterance(data.description);
            speech.lang = selectedLanguage;
            window.speechSynthesis.speak(speech);
        }
    } catch (error) {
        console.error('Failed to fetch description:', error);
    }
}

function playAudio(url) {
    if (audioEnabled) {
        var audio = new Audio(url);
        audio.play();
    }
}
