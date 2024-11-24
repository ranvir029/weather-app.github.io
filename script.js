const weatherForm = document.querySelector(".weatherForm");
const inputFirst = document.getElementById("first");
const card = document.querySelector(".card");
const btn = document.getElementById("submit");

const apikey = "c6ea3a4d1155d5e0453d85db76ffc062";

btn.addEventListener("click", async event => {

    event.preventDefault();
    const city = inputFirst.value;
    if (city) {
        try {
            const weatherData = await weatherForcast(city);
            displayWeatherInfo(weatherData);

        }
        catch (error) {
            console.error(error);
            DisplayerrorMessage(error);
        }
    }
    else {
        return DisplayerrorMessage("please enter a city");

    }

})


async function weatherForcast(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error(" could not find the weather data");
    }
    else
        return await response.json();

}

function displayWeatherInfo(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }],
        visibility } = data;

    card.textContent = " ";
    card.style.display = "flex";
    const cityName = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const desicionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const visible = document.createElement("p");
    const message = document.createElement("p");


    cityName.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15).toFixed(2))}°C`;
    humidityDisplay.textContent = `Humidity:${humidity}%`;
    weatherEmoji.textContent = getWeatheremoji(id);
    desicionDisplay.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    visible.textContent = `visibility:${visibility / 1000}Km`;

    cityName.classList.add("cityName");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    desicionDisplay.classList.add("desicionDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    visible.classList.add("visibleDisplay");


    card.appendChild(cityName);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desicionDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(visible);

    console.log(data);

}


function getWeatheremoji(weatherId) {
    switch (true) {
        // yaha pe ham weather id ek api ke through discuss kar rahe hai jaha code ke through ye samjhaya jata hai
        case (weatherId >= 200 && weatherId < 300):
            return "⚡🌩️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️🌤️🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "☃️❄️❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "💨🍃💨";
        case (weatherId == 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️☁️☁️";
        default:
            return "❓";
    }

}


function DisplayerrorMessage(erroroccured) {
    const message = document.createElement("p");
    message.textContent = erroroccured;
    message.classList.add("errorDisplay");


    card.textContent = " ";
    card.style.display = "flex";
    card.appendChild(message);
}