function fetchJotFormPoints() {
    fetch('https://eu-api.jotform.com/form/242954710671055/submissions?apiKey=5537d3b5552efb27643cda9ac6f409e3')
        .then(response => response.json())
        .then(data => {
            data.content.forEach(function(submission) {
                var addressField = submission.answers['6'].answer;
                var audioUrl = submission.answers['8'].answer[0];
                
                // Buscar latitud i longitud dins del camp de text
                var latMatch = addressField.match(/Latitude:\s*([\d\.]+)/);
                var lngMatch = addressField.match(/Longitude:\s*([\d\.]+)/);

                if (latMatch && lngMatch) {
                    var lat = parseFloat(latMatch[1]);
                    var lng = parseFloat(lngMatch[1]);

                    console.log("Afegint punt d'interès: ", lat, lng, audioUrl);
                    L.circle([lat, lng], { color: 'orange', fillColor: 'transparent', fillOpacity: 0, radius: 50 }).addTo(map);

                    if (!audioUrl) {
                        getPointDescription({ lat, lng, name: "Punt d'interès" });
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error carregant els punts d’interès: ', error);
        });
}

fetchJotFormPoints();
