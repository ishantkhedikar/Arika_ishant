/* ==========================================================================
   contact.js — toggles between the Creator form and Brand form
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const tabCreator = document.getElementById("tab-creator");
  const tabBrand = document.getElementById("tab-brand");
  const formCreator = document.getElementById("form-creator");
  const formBrand = document.getElementById("form-brand");

  // Guard: this page may only have the shared .two-col-form submit behavior
  // (e.g. profile.html) without the Creator/Brand toggle elements at all.
  if (tabCreator && tabBrand && formCreator && formBrand) {
    function showCreator() {
      tabCreator.classList.add("active");
      tabBrand.classList.remove("active");
      formCreator.classList.add("active");
      formBrand.classList.remove("active");
    }

    function showBrand() {
      tabBrand.classList.add("active");
      tabCreator.classList.remove("active");
      formBrand.classList.add("active");
      formCreator.classList.remove("active");
    }

    tabCreator.addEventListener("click", showCreator);
    tabBrand.addEventListener("click", showBrand);
  }

  // Placeholder submit handlers — replace with real API calls later
  document.querySelectorAll(".two-col-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("TODO: send form data to backend");
      alert("Saved! (demo only — not yet connected to a backend).");
    });
  });
});
