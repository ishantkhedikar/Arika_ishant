document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forgot-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: connect to real backend to actually send a reset email
    alert("If this email is registered, a reset link has been sent. (demo only)");
  });
});
