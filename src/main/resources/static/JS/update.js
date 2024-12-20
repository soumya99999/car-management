// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("Updation-form");
    const updateButton = document.querySelector(".update");

    // Add event listener to the update button
    updateButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get all input and select fields in the form
        const inputs = form.querySelectorAll("input, select");
        let isAnyFieldFilled = false;

        // Check if at least one field has a value
        inputs.forEach((input) => {
            if (input.value.trim() !== "") {
                isAnyFieldFilled = true;
            }
        });

        if (isAnyFieldFilled) {
            // Display success message popup
            displayPopup("Your form updated successfully!", "success");
            // Optionally, reset the form after successful submission
            form.reset();
        } else {
            // Display error message popup
            displayPopup("Please fill at least one field before updating!", "error");
        }
    });
});

// Function to display a popup message
function displayPopup(message, type) {
    // Create the popup container
    const popup = document.createElement("div");
    popup.className = `popup ${type}`; // Add dynamic class for styling
    popup.textContent = message;

    // Add popup to the body
    document.body.appendChild(popup);

    // Style the popup dynamically
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.padding = "15px 20px";
    popup.style.borderRadius = "8px";
    popup.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545"; // Green for success, red for error
    popup.style.color = "white";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    popup.style.fontSize = "14px";
    popup.style.fontWeight = "bold";
    popup.style.zIndex = "1000";
    popup.style.opacity = "1";
    popup.style.transition = "opacity 0.5s ease-in-out";

    // Fade out and remove popup after 3 seconds
    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}
