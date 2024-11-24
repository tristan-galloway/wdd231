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

// Function to create business cards dynamically
async function createBusinessCards() {
    const businesses = await fetchBusinessData(); // Fetch the data
    const container = document.querySelector('.business-card-container');

    businesses.forEach(business => {
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

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}


// Call the function to populate the cards after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createBusinessCards();
});

// Function Calls
getLastModified();
getCurrentYear();