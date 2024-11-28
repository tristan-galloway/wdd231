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

// Function to create business cards dynamically (Grid View)
async function createBusinessCards() {
    const businesses = await fetchBusinessData(); // Fetch the data
    const container = document.querySelector('.business-card-container');
    container.innerHTML = ''; // Clear previous content

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

// Function to create business lists dynamically (List View)
async function createBusinessLists() {
    const businesses = await fetchBusinessData(); // Fetch the data
    const container = document.querySelector('.business-list-container');
    container.innerHTML = ''; // Clear previous content

    businesses.forEach(business => {
        const list = document.createElement('div');
        list.classList.add('business-list');

        list.innerHTML = `
            <p class="business-name">${business.name}</p>
            <p class="business-address">${business.address}</p>
            <p class="phone-number">${business.phoneNumber}</p>
            <a href="${business.url}" target="_blank">${business.url}</a>
        `;

        container.appendChild(list);
    });
}

// Toggle view between Grid and List
function setupToggleButtons() {
    const gridButton = document.getElementById('grid-button');
    const listButton = document.getElementById('list-button');
    const cardContainer = document.querySelector('.business-card-container');
    const listContainer = document.querySelector('.business-list-container');

    // Load grid view by default
    createBusinessCards();
    cardContainer.style.display = 'flex'; // Ensure grid container is visible
    listContainer.style.display = 'none'; // Hide list container

    // Event listener for Grid Button
    gridButton.addEventListener('click', () => {
        createBusinessCards(); // Create grid view
        cardContainer.style.display = 'flex'; // Show grid container
        listContainer.style.display = 'none'; // Hide list container
    });

    // Event listener for List Button
    listButton.addEventListener('click', () => {
        createBusinessLists(); // Create list view
        cardContainer.style.display = 'none'; // Hide grid container
        listContainer.style.display = 'block'; // Show list container
    });
}

// Function Calls
getLastModified();
getCurrentYear();
setupToggleButtons(); // Set up toggle buttons