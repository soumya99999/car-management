// Utility function for field validation
function validateField(field, validationFn, errorMessage) {
    const errorElementId = `${field.id}-error`;
    const existingErrorElement = document.getElementById(errorElementId);

    // Remove existing error message
    if (existingErrorElement) {
        existingErrorElement.remove();
    }

    const value = field.value.trim();
    if (!validationFn(value)) {
        // Create error message
        const errorDiv = document.createElement("div");
        errorDiv.id = errorElementId;
        errorDiv.className = "error";
        errorDiv.textContent = errorMessage;

        // Insert the error message after the input field
        field.classList.add("error");
        field.classList.remove("valid");
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        return false;
    } else {
        field.classList.remove("error");
        field.classList.add("valid");
        return true;
    }
}

// Example validation functions
function validateRegistrationNumber(value) {
    const regNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    return regNumberRegex.test(value);
}

function validateRequired(value) {
    return value !== "";
}

function validatePositiveNumber(value) {
    return !isNaN(value) && parseFloat(value) > 0;
}

// Validation for all fields
document.getElementById("regNumber").addEventListener("blur", () => {
    validateField(
        document.getElementById("regNumber"),
        validateRegistrationNumber,
        "Registration number must follow the format AP09AB1234"
    );
});

document.getElementById("model").addEventListener("blur", () => {
    validateField(
        document.getElementById("model"),
        validateRequired,
        "Model is required"
    );
});

document.getElementById("company").addEventListener("blur", () => {
    validateField(
        document.getElementById("company"),
        validateRequired,
        "Company is required"
    );
});

document.getElementById("mileage").addEventListener("blur", () => {
    validateField(
        document.getElementById("mileage"),
        validatePositiveNumber,
        "Mileage must be a positive number"
    );
});

document.getElementById("seatingCapacity").addEventListener("blur", () => {
    validateField(
        document.getElementById("seatingCapacity"),
        validatePositiveNumber,
        "Seating capacity must be a positive number"
    );
});

document.getElementById("fuelType").addEventListener("blur", () => {
    validateField(
        document.getElementById("fuelType"),
        validateRequired,
        "Fuel type is required"
    );
});

document.getElementById("currentStatus").addEventListener("blur", () => {
    validateField(
        document.getElementById("currentStatus"),
        validateRequired,
        "Current status is required"
    );
});

document.getElementById("insuranceNumber").addEventListener("blur", () => {
    validateField(
        document.getElementById("insuranceNumber"),
        validateRequired,
        "Insurance number is required"
    );
});

document.getElementById("carCondition").addEventListener("blur", () => {
    validateField(
        document.getElementById("carCondition"),
        validateRequired,
        "Car condition is required"
    );
});

document.getElementById("rentalRate").addEventListener("blur", () => {
    validateField(
        document.getElementById("rentalRate"),
        validatePositiveNumber,
        "Rental rate must be a positive number"
    );
});

document.getElementById("previousServiceDate").addEventListener("blur", () => {
    validateField(
        document.getElementById("previousServiceDate"),
        validateRequired,
        "Previous service date is required"
    );
});

document.getElementById("nextServiceDate").addEventListener("blur", () => {
    validateField(
        document.getElementById("nextServiceDate"),
        validateRequired,
        "Next service date is required"
    );
});

document.getElementById("maintenanceStatus").addEventListener("blur", () => {
    validateField(
        document.getElementById("maintenanceStatus"),
        validateRequired,
        "Maintenance status is required"
    );
});

// Form Submission Event
document.getElementById("registration-form").addEventListener("submit", (event) => {
    event.preventDefault();

    let isFormValid = true;
    const fields = [
        "regNumber", "model", "company", "mileage",
        "seatingCapacity", "fuelType", "currentStatus",
        "insuranceNumber", "carCondition", "rentalRate",
        "previousServiceDate", "nextServiceDate", "maintenanceStatus"
    ];

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const validationFn = fieldId === "regNumber" ? validateRegistrationNumber : validateRequired;
        if (!validateField(field, validationFn, `${fieldId.replace(/([A-Z])/g, ' $1')} is required`)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        alert("Form submitted successfully!");
    } else {
        alert("Please fix the errors before submitting.");
    }
});
