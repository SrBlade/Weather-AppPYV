const dataDiv = document.getElementById('data-div');
const input = document.getElementById('city-name');
const country = document.getElementById('country');
const temperature = document.getElementById('temperature');
const information = document.getElementById('information');
const wind = document.getElementById('wind-info');
const humidity = document.getElementById('humidity');
const feels_like = document.getElementById('feels_like');
const button = document.getElementById('search-button');
const weatherIcon = document.getElementById('weather-icon');
const apiKey = '43d5caaf1d5eaad15c4796f64b3ccee3';

function fetchData() {
    const city = input.value;
    if (city === '') {
        return alert('Enter a valid city, please');
    }

    fetch(`http://127.0.0.1:5000/weather?city=${city}`, {
        mode: 'cors'  // Asegúrate de que el modo sea 'cors'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }

        let iconId = data.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

        weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;
        temperature.textContent = `${data.main.temp} °C`;
        information.textContent = data.weather[0].main;
        country.innerHTML = `${data.sys.country}`
        feels_like.textContent = `Feels like: ${data.main.feels_like} °C`;
        wind.innerHTML = `💨${data.wind.speed} km/h`;
        humidity.innerHTML = `💧${data.main.humidity}%`;
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

button.addEventListener('click', fetchData);

button.addEventListener('click', function() {
    if (dataDiv.classList.contains('visible')) {
        dataDiv.classList.remove('visible');
        setTimeout(() => {
            dataDiv.style.display = 'none';
        }, 500);
    } else {
        dataDiv.style.display = 'block';
        setTimeout(() => {
            dataDiv.classList.add('visible');
        }, 10);
    }
});