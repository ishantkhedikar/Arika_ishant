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

  // Placeholder submit handlers — replace with real API calls later
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: replace with a real API call (fetch POST to /api/login).
    // Once the backend confirms valid credentials, THEN redirect.
    console.log("TODO: connect login form to backend/auth API");
    window.location.href = "dashboard.html";
  });

  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("TODO: connect register form to backend/auth API");
  });
});
