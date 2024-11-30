const passwordFields = document.querySelectorAll(".toggle-password");
const passwordHint = document.getElementById("password-hint");
const signupForm = document.getElementById("signup-form");
const successModal = new bootstrap.Modal(
  document.getElementById("successModal")
);

// Toggle password visibility
passwordFields.forEach((field) => {
  field.addEventListener("click", () => {
    const input = field.previousElementSibling;
    const icon = field.querySelector("i");
    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("bi-eye-slash", "bi-eye");
    } else {
      input.type = "password";
      icon.classList.replace("bi-eye", "bi-eye-slash");
    }
  });
});

// Select individual criteria elements
const lengthCriteria = document.getElementById("length");
const uppercaseCriteria = document.getElementById("uppercase");
const lowercaseCriteria = document.getElementById("lowercase");
const digitCriteria = document.getElementById("digit");
const specialCriteria = document.getElementById("special");

// Regex patterns for individual criteria
const lengthRegex = /.{8,}/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const digitRegex = /\d/;
const specialRegex = /[@$!%*?&]/;

// Combined password regex for overall validation
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validate password on input
signupForm.password.addEventListener("input", () => {
  const password = signupForm.password.value;

  // Check each criterion and update its status
  updateCriteriaStatus(lengthCriteria, lengthRegex.test(password));
  updateCriteriaStatus(uppercaseCriteria, uppercaseRegex.test(password));
  updateCriteriaStatus(lowercaseCriteria, lowercaseRegex.test(password));
  updateCriteriaStatus(digitCriteria, digitRegex.test(password));
  updateCriteriaStatus(specialCriteria, specialRegex.test(password));

  // Hide or show the hint based on overall validation
  const allValid =
    lengthRegex.test(password) &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    digitRegex.test(password) &&
    specialRegex.test(password);

  document.getElementById("password-hint").classList.toggle("d-none", allValid);
});

// Function to update criteria status
function updateCriteriaStatus(element, isValid) {
  if (isValid) {
    element.classList.remove("text-danger");
    element.classList.add("text-success");
  } else {
    element.classList.remove("text-success");
    element.classList.add("text-danger");
  }
}

// Validate password match and show success modal on submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const password = signupForm.password.value;
  const confirmPassword = signupForm["confirm-password"].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
  } else if (!passwordRegex.test(password)) {
    alert("Password does not meet the required criteria!");
  } else {
    // Show the success modal when all criteria are met
    successModal.show();
  }
});
