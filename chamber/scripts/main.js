// Get the last modified date for the footer
function getLastModified(){
    const lastModified = document.lastModified;
    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
};

// Get the current year for the footer
function getCurrentYear(){
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById("currentYear");
    currentYearElement.innerHTML = `&copy;${currentYear}`
};

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

// select HTML elements in the document
const weatherCard = document.querySelector('#weather-card');

// Timbuktu lat and lon 16.76661604047582, -3.0019715196097323
const lat = "16.77";
const lon = "-3.00";
const key = "632b64b71b2dc4a8bb1015a777025050";

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
const forcastURL = `https://api.openweathermap.org/data/2.5/forcast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
};

function displayWeather(data) {
    const desc = data.weather[0].description;
    const high = data.main.temp_max;
    const low = data.main.temp_min;
    const hum = data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); // Convert timestamp to time
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(); // Convert timestamp to time
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    // Select the existing weather card section
    const weatherCard = document.getElementById("weather-card");

    // Clear any existing content in the weather card
    weatherCard.innerHTML = "";

    // Create and append child elements dynamically
    const title = document.createElement("h4");
    title.textContent = "Current Weather";
    weatherCard.appendChild(title);

    const icon = document.createElement("img");
    icon.src = iconsrc;
    icon.alt = desc;
    weatherCard.appendChild(icon);

    const description = document.createElement("p");
    description.textContent = desc.charAt(0).toUpperCase() + desc.slice(1); // Capitalize description
    weatherCard.appendChild(description);

    const highTemp = document.createElement("p");
    highTemp.textContent = `High: ${high}°C`;
    weatherCard.appendChild(highTemp);

    const lowTemp = document.createElement("p");
    lowTemp.textContent = `Low: ${low}°C`;
    weatherCard.appendChild(lowTemp);

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${hum}%`;
    weatherCard.appendChild(humidity);

    const sunriseTime = document.createElement("p");
    sunriseTime.textContent = `Sunrise: ${sunrise}`;
    weatherCard.appendChild(sunriseTime);

    const sunsetTime = document.createElement("p");
    sunsetTime.textContent = `Sunset: ${sunset}`;
    weatherCard.appendChild(sunsetTime);
}

// Async function to fetch business data from JSON
async function fetchBusinessData() {
    try {
        const response = await fetch('data/members.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON data
        return data;
    } catch (error) {
        console.error("Failed to fetch business data:", error);
        return [];
    }
}

// Function to filter businesses by membership level and pick 3 randomly
function getRandomBusinesses(businesses, count = 3) {
    // Filter businesses by membership level 2 or 3
    const filtered = businesses.filter(
        (business) => business.membershipLevel === 2 || business.membershipLevel === 3
    );

    // Shuffle the array and pick the first `count` businesses
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to create business cards dynamically
async function createBusinessCards() {
    const businesses = await fetchBusinessData(); // Fetch the data
    const container = document.querySelector('.business-card-row');

    // Get 3 random businesses
    const selectedBusinesses = getRandomBusinesses(businesses);

    selectedBusinesses.forEach((business) => {
        const card = document.createElement('div');
        card.classList.add('business-card');

        card.innerHTML = `
            <p class="business-name">${business.name}</p>
            <img class="business-image" src="images/${business.imageName}" alt="Image of ${business.name}" width=200>
            <p class="business-address">${business.address}</p>
            <p class="phone-number">${business.phoneNumber}</p>
            <a href="${business.url}" target="_blank">${business.url}</a>
        `;

        container.appendChild(card);
    });
}

// Function Calls
createBusinessCards();
getLastModified();
getCurrentYear();
apiFetch(weatherURL);