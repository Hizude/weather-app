const warning = document.querySelector('.warning');
const title = document.querySelector('title');
const city = document.querySelector('.city');
const countryCode = document.querySelector('.country-code');
const temperature = document.querySelector('.temperature');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const sunrise = document.querySelector('.sunrise-time');
const sunset = document.querySelector('.sunset-time');
const humidity = document.querySelector('.humidity-percentage');
const visibility = document.querySelector('.visibility-distance');

window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        warning.style.display = 'none';
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const apiKey = process.env.API_KEY;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    title.textContent = data.name;
                    city.textContent = data.name;
                    countryCode.textContent = data.sys.country;
                    weatherDescription.textContent = Object.values(
                        data.weather
                    )[0].description;

                    humidity.textContent = `${data.main.humidity}%`;

                    console.log(data);
                    let unit = 'C';
                    let tempInC = data.main.temp - 273.15;
                    let tempInF = ((data.main.temp - 273.15) * 9) / 5 + 32;
                    temperature.textContent = `${Math.round(tempInC)}°${unit}`;
                });
        });
    }
});
