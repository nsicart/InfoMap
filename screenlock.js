let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock activat!');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

// Activar el Wake Lock en carregar la pàgina
document.addEventListener('DOMContentLoaded', () => {
    requestWakeLock();
});
