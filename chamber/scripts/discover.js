// Shared functions
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

// Welcome Message functionality
const visitorMessage = document.getElementById('visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (lastVisit) {
    const lastVisitDate = new Date(parseInt(lastVisit));
    const daysSinceLastVisit = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

    if (daysSinceLastVisit < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else if (daysSinceLastVisit === 1) {
        visitorMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitorMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
    }
} else {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem('lastVisit', now);

// Function to show a random selection of events in the list
function showRandomEvents() {
    fetch('./data/events.json')
        .then(response => response.json())
        .then(data => {
            const eventList = document.getElementById('event-list');
            eventList.innerHTML = ''; // Clear previous list items

            // Shuffle the events array to randomize
            const shuffledEvents = data.events.sort(() => 0.5 - Math.random());

            // Select a random number of events (up to 3 in this case)
            const randomEvents = shuffledEvents.slice(0, 3);

            // Populate the list with random events
            randomEvents.forEach(event => {
                const listItem = document.createElement('li');
                const formattedDate = formatDate(event.date); // Use the formatDate function to format the date
                listItem.textContent = `${event.title}: ${formattedDate}`;
                eventList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

// Function to format the date as MM-dd-yy
function formatDate(dateString) {
    const [month, day, year] = dateString.split('-');
    return `${month}-${day}-${year}`;
}

// Call the function to display random events when the page loads
showRandomEvents();

// Add event listener for "Clear Selection" button
document.getElementById('clear-selection').addEventListener('click', () => {
    showAllEvents();
});

// Function to show all events (clear the date filter)
function displayEventCard(event, container) {
    const figure = document.createElement('figure');
    figure.classList.add('event-card');

    const img = document.createElement('img');
    img.setAttribute('src', event.imageUrl); // Set the source for the image
    img.setAttribute('alt', event.title);
    img.setAttribute('loading', 'lazy'); // Native lazy loading
    img.classList.add('event-image'); // No need for 'lazy' class anymore

    const title = document.createElement('h3');
    title.textContent = event.title;
    title.classList.add('event-title');

    const date = document.createElement('p');
    date.textContent = `Date: ${event.date}`;
    date.classList.add('event-date');

    const description = document.createElement('p');
    description.textContent = event.description;
    description.classList.add('event-description');

    figure.appendChild(img);
    figure.appendChild(title);
    figure.appendChild(date);
    figure.appendChild(description);
    container.appendChild(figure);
}

// Generate filtered cards
function filterEventsByDate(selectedDate) {
    fetch('./data/events.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('attractions-container');
            container.innerHTML = ''; // Clear previous events

            const filteredEvents = data.events.filter(event => event.date === selectedDate);

            if (filteredEvents.length > 0) {
                filteredEvents.forEach(event => displayEventCard(event, container));
            } else {
                container.innerHTML = '<p>No events found for this date.</p>';
            }
        })
        .catch(error => console.error('Error loading events:', error));
}

// Generate all cards
function showAllEvents() {
    fetch('./data/events.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('attractions-container');
            container.innerHTML = ''; // Clear previous events

            data.events.forEach(event => displayEventCard(event, container));
        })
        .catch(error => console.error('Error loading events:', error));
}


// Generate calendar function
function generateCalendar(year, month) {
    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = ''; // Clear previous calendar

    const date = new Date(year, month);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Create month and navigation
    const header = document.createElement('div');
    header.classList.add('calendar-header');
    header.innerHTML = `
        <button id="prev-month">&lt;</button>
        <span>${monthNames[month]} ${year}</span>
        <button id="next-month">&gt;</button>
    `;
    calendarContainer.appendChild(header);

    // Days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysRow = document.createElement('div');
    daysRow.classList.add('days-row');
    daysOfWeek.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.textContent = day;
        daysRow.appendChild(dayEl);
    });
    calendarContainer.appendChild(daysRow);

    // Days grid
    const daysGrid = document.createElement('div');
    daysGrid.classList.add('days-grid');

    // Add empty cells for the days before the start of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        daysGrid.appendChild(emptyCell);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = i;
        dayCell.classList.add('day-cell');
        const formattedDate = `${month + 1}-${i}-${String(year).slice(2)}`;
        dayCell.setAttribute('data-date', formattedDate);
        dayCell.addEventListener('click', () => filterEventsByDate(formattedDate));
        daysGrid.appendChild(dayCell);
    }

    calendarContainer.appendChild(daysGrid);

    // Event listeners for navigation
    document.getElementById('prev-month').addEventListener('click', () => {
        const prevMonth = new Date(year, month - 1);
        generateCalendar(prevMonth.getFullYear(), prevMonth.getMonth());
    });

    document.getElementById('next-month').addEventListener('click', () => {
        const nextMonth = new Date(year, month + 1);
        generateCalendar(nextMonth.getFullYear(), nextMonth.getMonth());
    });
}

// Add event listener for "Clear Selection" button
document.getElementById('clear-selection').addEventListener('click', () => {
    showAllEvents();
});

// Initialize calendar
generateCalendar(new Date().getFullYear(), new Date().getMonth());
showAllEvents();
getCurrentYear();
getLastModified();