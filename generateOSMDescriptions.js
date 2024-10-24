async function generateOSMDescription(point, currentLat, currentLng) {
    var distance = map.distance([currentLat, currentLng], [point.lat, point.lng]);
    
    if (distance < 100) { // Només generar descripció si estem a menys de 100 metres
        try {
            const response = await fetch('/.netlify/functions/chatgpt-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    prompt: `Crea una descripció breu en ${selectedLanguage} per al lloc anomenat ${point.name}, situat a les coordenades (${point.lat}, ${point.lng}). Proporciona informació rellevant sobre aquest lloc, com les seves característiques naturals, història o altres detalls d'interès`, 
                                })
            });

            const data = await response.json();
            if (data.description) {
                point.description = data.description;
                console.log('Descripció obtinguda per al punt d’OSM:', point.description);
            }
        } catch (error) {
            console.error('Error obtenint la descripció de ChatGPT:', error);
        }
    }
}

