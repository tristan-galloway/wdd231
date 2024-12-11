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

