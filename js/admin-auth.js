/* ==========================================================================
   admin-auth.js — placeholder submit handler for admin-login.html
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admin-login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: replace with a real API call (fetch POST to /api/admin/login).
    // Only redirect once the backend confirms valid admin credentials.
    console.log("TODO: connect admin login form to backend/auth API");
    window.location.href = "admin-dashboard.html";
  });
});
