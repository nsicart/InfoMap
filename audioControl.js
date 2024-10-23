var audioEnabled = false;

document.getElementById('playButton').addEventListener('click', function() {
    audioEnabled = !audioEnabled;
    this.textContent = audioEnabled ? 'Parar Reproducció Automàtica' : 'Activar Reproducció Automàtica';
    alert(audioEnabled ? "Reproducció d'àudio activada." : "Reproducció d'àudio desactivada.");
});
