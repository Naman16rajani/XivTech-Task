document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherResults = document.getElementById('weatherResults');

    getWeatherBtn.addEventListener('click', async () => {
        const cities = cityInput.value.split(',').map(city => city.trim());
        const response = await fetch('/getWeather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cities }),
        });
        const data = await response.json();

        let output = '<h2>Weather Results:</h2>';
        output += '<ul>';
        for (const city in data.weather) {
            output += `<li>${city}: ${data.weather[city]}</li>`;
        }
        output += '</ul>';

        weatherResults.innerHTML = output;
    });
});
