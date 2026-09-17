/* ==========================================================================
   dashboard.js — placeholder hooks for dashboard interactivity.
   Wire these up to real data once your backend/API is ready.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const notifBtn = document.querySelector(".icon-btn");
  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      console.log("TODO: open notifications dropdown");
    });
  }

  const userChip = document.querySelector(".user-chip");
  if (userChip) {
    userChip.addEventListener("click", () => {
      console.log("TODO: open user menu (profile / logout)");
    });
  }
});
