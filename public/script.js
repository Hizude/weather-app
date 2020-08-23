const warning = document.querySelector('.warning');
const title = document.querySelector('title');
const city = document.querySelector('.city');
const countryCode = document.querySelector('.country-code');
const temperature = document.querySelector('.temperature');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const arrow = document.querySelector('.arrow');
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
            const apiKey = apiKey;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    let unit = 'C';
                    let tempInC = data.main.temp - 273.15;
                    let tempInF = ((data.main.temp - 273.15) * 9) / 5 + 32;
                    temperature.textContent = `${Math.round(tempInC)}°${unit}`;

                    title.textContent = data.name;
                    city.textContent = data.name;
                    countryCode.textContent = data.sys.country;
                    weatherDescription.textContent = Object.values(
                        data.weather
                    )[0].description;

                    minTemp.textContent = `${Math.round(
                        data.main.temp_min - 273.15
                    )}°${unit}`;
                    maxTemp.textContent = `${Math.round(
                        data.main.temp_max - 273.15
                    )}°${unit}`;
                    humidity.textContent = `${data.main.humidity}%`;
                    visibility.textContent = `${data.visibility} meters`;
                    windSpeed.textContent = `${data.wind.speed} m/s`;
                    arrow.style.transform = `rotate(${0}deg)`;
                    arrow.style.transform = `rotate(${data.wind.deg}deg)`;

                    // sunrise.textContent = `${}`
                    let sunriseTime = data.sys.sunrise;
                    let sunsetTime = data.sys.sunset;
                    function timeConverterSunrise(sunriseTime) {
                        let a = new Date(sunriseTime * 1000);
                        let hour = a.getHours();
                        let min = a.getMinutes();
                        let time = hour + ':' + min;
                        return time;
                    }
                    function timeConverterSunset(sunsetTime) {
                        let a = new Date(sunsetTime * 1000);
                        let hour = a.getHours();
                        let min = a.getMinutes();
                        let time = hour + ':' + min;
                        return time;
                    }

                    sunrise.textContent = timeConverterSunrise(sunriseTime);

                    sunset.textContent = timeConverterSunset(sunsetTime);
                    console.log(data);
                });
        });
    }
});
