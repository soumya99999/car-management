// Utility function to display error messages
function validateField(field, validationFn, errorMessage) {
    const isValid = validationFn(field.value);

    // Remove existing error messages
    const errorElementId = `${field.id}-error`;
    document.getElementById(errorElementId)?.remove();

    if (!isValid) {
        const errorElement = document.createElement("div");
        errorElement.id = errorElementId;
        errorElement.className = "error-message";
        errorElement.textContent = errorMessage;
        field.insertAdjacentElement("afterend", errorElement);
        field.classList.add("error");
        field.classList.remove("valid"); // Remove green border
    } else {
        field.classList.remove("error");
        field.classList.add("valid"); // Add green border
    }

    return isValid;
}

// Show a dynamic popup message
function showPopup(message, isSuccess) {
    const popup = document.createElement("div");
    popup.className = `popup ${isSuccess ? "success" : "error-popup"}`;
    popup.textContent = message;

    document.body.appendChild(popup);

    // Automatically remove the popup after 3 seconds
    setTimeout(() => popup.remove(), 3000);
}

// Validation functions
function validateRequired(value) {
    return value.trim() !== "";
}

function validateLetters(value) {
    return /^[A-Za-z\s]+$/.test(value.trim());
}

function validatePositiveNumber(value) {
    return /^[1-9]\d*(\.\d+)?$/.test(value.trim());
}

function validateRegistrationNumber(value) {
    return /^(?=.*[A-Z])(?=.*\d)[A-Z0-9-]+$/.test(value.trim());
}

function validateInsuranceNumber(value) {
    return /^INS\d{10}$/.test(value.trim());
}

function validateServiceDates() {
    const prevServiceDateField = document.getElementById("previousServiceDate");
    const nextServiceDateField = document.getElementById("nextServiceDate");

    const prevServiceDate = new Date(prevServiceDateField.value);
    const nextServiceDate = new Date(nextServiceDateField.value);

    let isValid = true;

    // Remove existing error messages
    document.getElementById("previousServiceDate-error")?.remove();
    document.getElementById("nextServiceDate-error")?.remove();

    if (prevServiceDate >= nextServiceDate) {
        validateField(
            prevServiceDateField,
            () => false,
            "Previous service date must be earlier than the next service date."
        );
        validateField(
            nextServiceDateField,
            () => false,
            "Next service date must be later than the previous service date."
        );
        isValid = false;
    }

    return isValid;
}

// Attach validation to blur events
const fieldsToValidate = [
    "regNumber", "model", "company", "mileage", "seatingCapacity",
    "fuelType", "currentStatus", "insuranceNumber", "carCondition",
    "rentalRate", "previousServiceDate", "nextServiceDate", "maintenanceStatus"
];

fieldsToValidate.forEach(fieldId => {
    const field = document.getElementById(fieldId);

    if (fieldId === "regNumber") {
        field.addEventListener("blur", () => {
            validateField(field, validateRegistrationNumber, "Invalid registration number (format: AB12CD3456).");
        });
    } else if (fieldId === "insuranceNumber") {
        field.addEventListener("blur", () => {
            validateField(field, validateInsuranceNumber, "Invalid insurance number (format: INS followed by 10 digits).");
        });
    } else if (["model", "company", "maintenanceStatus"].includes(fieldId)) {
        field.addEventListener("blur", () => {
            validateField(field, validateLetters, `${fieldId.replace(/([A-Z])/g, ' $1')} must contain letters only.`);
        });
    } else if (["mileage", "rentalRate"].includes(fieldId)) {
        field.addEventListener("blur", () => {
            validateField(field, validatePositiveNumber, `${fieldId.replace(/([A-Z])/g, ' $1')} must be a positive number.`);
        });
    } else if (fieldId === "seatingCapacity") {
        field.addEventListener("blur", () => {
            validateField(field, value => Number(value) > 0, "Seating capacity must be a positive number.");
        });
    } else {
        field.addEventListener("blur", () => {
            validateField(field, validateRequired, `${fieldId.replace(/([A-Z])/g, ' $1')} is required.`);
        });
    }
});

// Attach validation to service date fields
const prevServiceDateField = document.getElementById("previousServiceDate");
const nextServiceDateField = document.getElementById("nextServiceDate");

prevServiceDateField.addEventListener("blur", validateServiceDates);
nextServiceDateField.addEventListener("blur", validateServiceDates);

// Handle form submission
const form = document.getElementById("registration-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isFormValid = true;

    fieldsToValidate.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const validationFn = 
            fieldId === "regNumber" ? validateRegistrationNumber :
            fieldId === "insuranceNumber" ? validateInsuranceNumber :
            ["model", "company", "maintenanceStatus"].includes(fieldId) ? validateLetters :
            ["mileage", "rentalRate"].includes(fieldId) ? validatePositiveNumber :
            fieldId === "seatingCapacity" ? value => Number(value) > 0 :
            validateRequired;
        
        if (!validateField(field, validationFn, `${fieldId.replace(/([A-Z])/g, ' $1')} is required.`)) {
            isFormValid = false;
        }
    });

    if (!validateServiceDates()) {
        isFormValid = false;
    }

    if (isFormValid) {
        showPopup("Form submitted successfully!", true);
    } else {
        showPopup("Check your fields.", false);
    }
});
