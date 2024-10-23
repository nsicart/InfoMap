var selectedLanguage = 'ca';

document.getElementById('languageSelect').addEventListener('change', function() {
    selectedLanguage = this.value;
    console.log("Idioma seleccionat: ", selectedLanguage);
});
