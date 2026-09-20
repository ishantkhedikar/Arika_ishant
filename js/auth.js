/* ==========================================================================
   auth.js — tab switching + password visibility for login.html / register.html
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".auth-tab");
  const forms = document.querySelectorAll(".auth-form");

  function switchTo(tabName) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tabName));
    forms.forEach((f) => f.classList.toggle("active", f.id === `${tabName}-form`));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTo(tab.dataset.tab));
  });

  // "Register here" / "Login here" links inside each form
  document.querySelectorAll("[data-switch-to]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      switchTo(link.dataset.switchTo);
    });
  });

  // If the page was opened as login.html#register, open the Register tab
  // immediately (this is what makes the homepage "Register" button work).
  if (window.location.hash === "#register") {
    switchTo("register");
  }

  // Show/hide password
  const toggleBtn = document.querySelector(".toggle-password");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const input = document.getElementById("login-password");
      input.type = input.type === "password" ? "text" : "password";
    });
  }

  // ============ ACCOUNT TYPE SELECTOR ============
  const roleButtons = document.querySelectorAll(".account-type-btn");
  const roleInput = document.getElementById("login-account-type");
  const loginTitle = document.getElementById("login-title");
  const loginSubtitle = document.getElementById("login-subtitle");
  const errorAlert = document.getElementById("login-error-alert");
  const errorText = document.getElementById("login-error-text");

  function setRole(role) {
    if (roleInput) roleInput.value = role;
    roleButtons.forEach(btn => {
      const isActive = btn.dataset.role === role;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-checked", isActive ? "true" : "false");
    });

    if (role === "admin") {
      if (loginTitle) loginTitle.textContent = "Welcome back, Admin";
      if (loginSubtitle) loginSubtitle.textContent = "Log in to access the Private Admin Portal.";
    } else {
      if (loginTitle) loginTitle.textContent = "Welcome back, Creator";
      if (loginSubtitle) loginSubtitle.textContent = "Log in to access your dashboard.";
    }

    // Hide any previous error when switching roles
    hideError();
  }

  roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      setRole(btn.dataset.role);
    });
  });

  function showError(message) {
    if (!errorAlert || !errorText) return;
    errorText.textContent = message;
    errorAlert.classList.add("visible");
  }

  function hideError() {
    if (!errorAlert) return;
    errorAlert.classList.remove("visible");
  }

  // Check URL parameters for errors or pre-selected role
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("error") === "unauthorized") {
    showError("Access denied: Please log in with valid admin credentials.");
    setRole("admin");
  } else if (urlParams.get("role") === "admin") {
    setRole("admin");
  }

  // ============ ROLE-BASED LOGIN SUBMISSION ============
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideError();

      const identifier = (document.getElementById("login-email")?.value || "").trim();
      const password = (document.getElementById("login-password")?.value || "").trim();
      const selectedRole = roleInput ? roleInput.value : "user";

      if (!identifier || !password) {
        showError("Please enter your email/username and password.");
        return;
      }

      // Validate through the centralized authentication service
      if (window.ArikaAuth) {
        const authResult = window.ArikaAuth.login(identifier, password, selectedRole);

        if (authResult.success) {
          // Route based strictly on validated role
          if (authResult.role === "admin") {
            window.location.href = "/Admin/";
          } else {
            window.location.href = "creator/dashboard.html";
          }
        } else {
          // Display specific error according to requirements
          showError(authResult.error || "Invalid credentials.");
        }
      } else {
        // Fallback if auth config failed to load
        if (selectedRole === "admin") {
          if (identifier.toLowerCase() === "admin@arikacollabs.com" && password === "admin123") {
            window.location.href = "/Admin/";
          } else {
            showError("Invalid admin credentials.");
          }
        } else {
          if (identifier.toLowerCase() === "user@arikacollabs.com" && password === "user123") {
            window.location.href = "creator/dashboard.html";
          } else {
            showError("Invalid user credentials.");
          }
        }
      }
    });
  }

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Registration submitted! For development testing, please use the provided demo accounts.");
    });
  }
});
