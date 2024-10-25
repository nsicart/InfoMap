let wakeLock = null;

async function requestWakeLock() {
    if ('wakeLock' in navigator) { // Verifica que l'API de Wake Lock està disponible
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock activat!');

            // Escolta l'esdeveniment de quan es perd el Wake Lock
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock s\'ha alliberat.');
            });
        } catch (err) {
            console.error(`Error activant el Wake Lock: ${err.name}, ${err.message}`);
        }
    } else {
        console.log('API de Wake Lock no disponible en aquest navegador.');
    }
}

// Reactiva el Wake Lock si la pàgina torna a ser visible
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        requestWakeLock();
    }
});

// Activar el Wake Lock en carregar la pàgina
document.addEventListener('DOMContentLoaded', () => {
    requestWakeLock();
});
