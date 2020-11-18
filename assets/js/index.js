const api = {
    key: '7f324ac2a9425e3de3c31b29be4388be',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
    iconUrl: ' http://openweathermap.org/img/wn/'
}

const searchBoxInput = document.getElementById('search-box');
searchBoxInput.addEventListener('keypress', setQuery)

function setQuery(event) {
    if (event.keyCode == 13) {
        getResult(searchBoxInput.value);
        searchBoxInput.value = ""
    }

}
function getResult(query) {
    const { key, baseUrl } = api
    fetch(`${baseUrl}weather?q=${query}&units=metric&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            const weatherData = data
            displayWeatherResult(weatherData)
        })

}

function displayWeatherResult(weather) {
    console.log(weather)
    const { temp: temperature, temp_max, temp_min } = weather.main
    const { main, description } = weather.weather[0]
    const city = document.querySelector('.city');
    const dateElement = document.querySelector('.date');
    const temp = document.querySelector('.temp');
    const weatherType = document.querySelector('.weather');
    const weatherTypeDesciption = document.querySelector('.weather-description');
    const highLow = document.querySelector('.high-low')
    let newDate = new Date()

    city.innerText = `${weather.name}, ${weather.sys.country}` //Location City Name & Country Name
    dateElement.innerText = dateBuilder(newDate) //Date First is Day, Date, Month then Year
    temp.innerHTML = `${Math.round(temperature)}<span>°c</span>` //Temperature
    weatherType.innerText = main //Weather Type
    weatherTypeDesciption.innerText = description //Weather type description
    highLow.innerHTML = `${Math.round(temp_max)}°c/${Math.round(temp_min)}°c` //Min and max of temperature

}
function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()]
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}
window.addEventListener('DOMContentLoaded', () => {
    const { key, baseUrl } = api
    fetch(`${baseUrl}weather?q=Tiaong&units=metric&appid=${key}`)
        .then(response => response.json())
        .then(weatherData => displayWeatherResult(weatherData))

})