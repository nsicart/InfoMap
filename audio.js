var audioEnabled = false;
document.getElementById('playButton').addEventListener('click', toggleAudio);

function toggleAudio() {
    audioEnabled = !audioEnabled;
    this.textContent = audioEnabled ? 'Parar Reproducció Automàtica' : 'Activar Reproducció Automàtica';
}

async function getPointDescription(point) {
    try {
        const response = await fetch('/.netlify/functions/chatgpt-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: point.name, language: selectedLanguage })
        });

        const data = await response.json();
        if (data.description) {
            const speech = new SpeechSynthesisUtterance(data.description);
            speech.lang = selectedLanguage;
            if (audioEnabled) {
                window.speechSynthesis.speak(speech);
            }
        }
    } catch (error) {
        console.error('Failed to fetch description:', error);
    }
}
