let weather = document.getElementById("whether");
let weatherWeek = document.getElementById("whetherWeek");

let b_url = `https://api.openweathermap.org/`;
let end_point = `data/2.5/weather`;
let week_endpoint = `data/2.5/forecast`;

let key = `&appid=6b85ca9c9b206cef1ca2324dd9aed8ed&units=metric`; 

function getWeather(api_url) {
    fetch(api_url)
        .then((res) => res.json())
        .then((data) => {
            if (data.cod == 200) {
                showWeather(data);
            } else {
                weather.innerHTML = `<p class="text-danger">City not found. Please try again.</p>`;
            }
        })
        .catch((err) => {
            console.error("Error fetching weather data:", err);
            weather.innerHTML = `<p class="text-danger">Error fetching data.</p>`;
        });
}

function getWeatherWeek(api_url) {
    fetch(api_url)
        .then((res) => res.json())
        .then((data) => {
            if (data.cod == "200") {
                showWeatherWeek(data.list);
            } else {
                weatherWeek.innerHTML = `<p class="text-danger">Unable to fetch weekly data.</p>`;
            }
        })
        .catch((err) => {
            console.error("Error fetching weekly weather data:", err);
            weatherWeek.innerHTML = `<p class="text-danger">Error fetching weekly data.</p>`;
        });
}

function showWeather(data) {
    console.log(data)
    weather.innerHTML = `
          <table class="table-auto w-full border-collapse bg-gray-800 text-white rounded-lg shadow-lg">
    <thead>
        <tr class="bg-gradient-to-r from-purple-500 to-pink-500 text-center text-xl font-semibold">
            <th colspan="2" class="py-4 text-2xl text-white">${data.name}, ${data.sys.country}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="text-center" colspan="2">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather icon" class="mx-auto my-4 rounded-full shadow-md" width="150">
            </td>
        </tr>
        <tr class="border-t border-gray-700">
            <td class="font-semibold py-3 px-4 bg-gray-900 text-lg">Weather</td>
            <td class="py-3 px-4 text-lg">${data.weather[0].main}</td>
        </tr>
        <tr class="border-t border-gray-700">
            <td class="font-semibold py-3 px-4 bg-gray-900 text-lg">Description</td>
            <td class="py-3 px-4 text-lg">${data.weather[0].description}</td>
        </tr>
        <tr class="border-t border-gray-700">
            <td class="font-semibold py-3 px-4 bg-gray-900 text-lg">Temperature</td>
            <td class="py-3 px-4 text-lg">${data.main.temp}°C</td>
        </tr>
        <tr class="border-t border-gray-700">
            <td class="font-semibold py-3 px-4 bg-gray-900 text-lg">Feels Like</td>
            <td class="py-3 px-4 text-lg">${data.main.feels_like}°C</td>
        </tr>
        <tr class="border-t border-gray-700">
            <td class="font-semibold py-3 px-4 bg-gray-900 text-lg">Pressure</td>
            <td class="py-3 px-4 text-lg">${data.main.pressure} hPa</td>
        </tr>
        <tr class="border-t border-gray-700">
            <td class="font-semibold py-3 px-4 bg-gray-900 text-lg">Wind Speed</td>
            <td class="py-3 px-4 text-lg">${data.wind.speed} m/s</td>
        </tr>
        <tr class="border-t border-gray-700">
            <td class="font-semibold py-3 px-4 bg-gray-900 text-lg">Humidity</td>
            <td class="py-3 px-4 text-lg">${data.main.humidity}%</td>
        </tr>
    </tbody>
</table>
            <h5 class="text-white text-center mt-6 w-full" style="font-size: 22px;">5-Day Forecast</h5>
        </div>
    `;
}

function showWeatherWeek(dataList) {
    weatherWeek.innerHTML = ``;
    weatherWeek.innerHTML += dataList
        .filter((data, index) => index % 8 === 0)
        .map((data) => {
            return `
         <div class="forecast-item bg-gray-800 text-white rounded-lg shadow-lg p-4 mb-6">
            <span class="badge bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm mb-4 block text-center">
                ${data.dt_txt.split(" ")[0]}
            </span>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon" class="mx-auto mb-4 rounded-md shadow-lg" width="150">
            <span class="d-block text-xl font-semibold text-center mb-2">${data.weather[0].main}</span><br>
            <small class="d-block text-center text-md mb-1">Temp: ${data.main.temp}°C</small><br>
            <small class="d-block text-center text-md mb-1">Wind: ${data.wind.speed} m/s</small><br>
            <small class="d-block text-center text-md">Humidity: ${data.main.humidity}%</small>
        </div>
        `;
})
}


document.getElementById("search").addEventListener("change", function (e) {
    let city = e.target.value;
    let api_url = `${b_url}${end_point}?q=${city}${key}`;
    let week_api_url = `${b_url}${week_endpoint}?q=${city}${key}`;

    getWeather(api_url);
    getWeatherWeek(week_api_url);
});

getWeather(`${b_url}${end_point}?q=London${key}`);
getWeatherWeek(`${b_url}${week_endpoint}?q=London${key}`);
