
const passwordFields = document.querySelectorAll(".toggle-password");
const passwordHint = document.getElementById("password-hint");
const signupForm = document.getElementById("signup-form");
const successModal = new bootstrap.Modal(document.getElementById("successModal"));

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

// Password validation regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validate password on input
signupForm.password.addEventListener("input", () => {
  if (passwordRegex.test(signupForm.password.value)) {
    passwordHint.classList.add("d-none");
  } else {
    passwordHint.classList.remove("d-none");
  }
});

// Validate password match and show success modal on submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (signupForm.password.value !== signupForm["confirm-password"].value) {
    alert("Passwords do not match!");
  } else if (!passwordRegex.test(signupForm.password.value)) {
    alert("Password does not meet the required criteria!");
  } else {
    successModal.show();
  }
});
