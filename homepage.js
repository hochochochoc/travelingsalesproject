document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Brazil').addEventListener('click', function() {
        window.location.href = 'index.html?chosenCountry=Brazil'; 
    });

    document.getElementById('Spain').addEventListener('click', function() {
        window.location.href = 'index.html?chosenCountry=Spain'; 
    });

    document.getElementById('China').addEventListener('click', function() {
        window.location.href = 'index.html?chosenCountry=China'; 
    });
});