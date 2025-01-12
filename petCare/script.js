document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.style.display = "none";
  successMessage.textContent =
    "Thank you! Your message has been sent successfully.";
  contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset previous validation states
    resetValidationStates();

    // Get form fields
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Validate fields
    let isValid = true;

    if (!name.value.trim()) {
      showError(name, "Please enter your name");
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, "Please enter your email");
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, "Please enter a valid email address");
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, "Please enter your message");
      isValid = false;
    }

    if (isValid) {
      // Show success message
      successMessage.style.display = "block";

      // Clear form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    }
  });

  function showError(input, message) {
    input.classList.add("is-invalid");
    const feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    feedback.textContent = message;
    input.parentNode.appendChild(feedback);
  }

  function resetValidationStates() {
    const inputs = contactForm.querySelectorAll(".form-control");
    inputs.forEach((input) => {
      input.classList.remove("is-invalid");
      const feedback = input.parentNode.querySelector(".invalid-feedback");
      if (feedback) {
        feedback.remove();
      }
    });
    successMessage.style.display = "none";
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Add input event listeners for real-time validation
  contactForm.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        const feedback = this.parentNode.querySelector(".invalid-feedback");
        if (feedback) {
          feedback.remove();
        }
        this.classList.remove("is-invalid");
      }
    });
  });
});
