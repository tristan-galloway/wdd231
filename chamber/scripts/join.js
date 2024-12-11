// Get the last modified date for the footer
function getLastModified() {
    const lastModified = document.lastModified;
    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
}

// Get the current year for the footer
function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById("currentYear");
    currentYearElement.innerHTML = `&copy;${currentYear}`;
}

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal if the user clicks outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Handle form submission and redirect to thank you page
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Capture form data
    const formData = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        orgTitle: document.getElementById("org-title").value,
        email: document.getElementById("email").value,
        mobileNumber: document.getElementById("mobile").value,
        businessName: document.getElementById("organization").value,
        membershipLevel: document.getElementById("membership-level").value,
        description: document.getElementById("description").value,
        submissionDate: new Date().toLocaleString() // Current timestamp
    };

    // Store in sessionStorage
    for (const [key, value] of Object.entries(formData)) {
        sessionStorage.setItem(key, value);
    }

    // Redirect to thank you page
    window.location.href = "thankyou.html";
}

function main() {
    getLastModified();
    getCurrentYear();

    // Attach the form submit event handler
    const form = document.getElementById("membership-form");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
}

main();
