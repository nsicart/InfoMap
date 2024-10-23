async function generateOSMDescription(point) {
    try {
        const response = await fetch('/.netlify/functions/chatgpt-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: point.name, language: selectedLanguage })
        });

        const data = await response.json();
        if (data.description) {
            point.description = data.description;
            console.log('Descripció obtinguda per al punt d’OSM:', point.description);
        }
    } catch (error) {
        console.error('Failed to fetch description from ChatGPT:', error);
    }
}
