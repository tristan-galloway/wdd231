// Function to format the field names to be more user-friendly
function formatFieldName(fieldName) {
    // Replace camelCase with space-separated words and capitalize each word
    return fieldName
        .replace(/([A-Z])/g, ' $1')  // Add a space before each capital letter
        .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
}

// Retrieve form data from sessionStorage
document.addEventListener("DOMContentLoaded", () => {
    const formDetails = document.getElementById("form-details");
    
    // Get the required fields
    const formData = {
        firstName: sessionStorage.getItem("firstName"),
        lastName: sessionStorage.getItem("lastName"),
        orgTitle: sessionStorage.getItem("orgTitle"),
        email: sessionStorage.getItem("email"),
        mobileNumber: sessionStorage.getItem("mobileNumber"),
        businessName: sessionStorage.getItem("businessName"),
        membershipLevel: sessionStorage.getItem("membershipLevel"),
        description: sessionStorage.getItem("description"),
        submissionDate: sessionStorage.getItem("submissionDate")
    };
    
    // Create content for each field
    for (const [key, value] of Object.entries(formData)) {
        if (value) { // Only display fields that have data
            const formattedKey = formatFieldName(key); // Format the field name
            const paragraph = document.createElement("p");
            paragraph.textContent = `${formattedKey}: ${value}`;
            formDetails.appendChild(paragraph);
        }
    }
});
