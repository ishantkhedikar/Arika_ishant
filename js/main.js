/* ==========================================================================
   ARIKA COLLABS — main.js
   Loads the shared header + footer into every page so you only maintain
   the navbar/footer HTML in ONE place (partials/header.html, footer.html).

   REQUIRES a local server (fetch() does not work on file:// URLs).
   In VS Code: install the "Live Server" extension, right-click any .html
   file → "Open with Live Server".
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("header-placeholder", getHeaderPartial());
  loadPartial("footer-placeholder", "partials/footer.html");
});

function getHeaderPartial() {
  // Add data-header="loggedin" on <body> for pages viewed by a logged-in creator
  const isLoggedIn = document.body.dataset.header === "loggedin";
  return isLoggedIn ? "partials/header-loggedin.html" : "partials/header.html";
}

function loadPartial(placeholderId, filePath) {
  const el = document.getElementById(placeholderId);
  if (!el) return;

  fetch(filePath)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${filePath}`);
      return res.text();
    })
    .then((html) => {
      el.innerHTML = html;
      if (placeholderId === "header-placeholder") highlightActiveNavLink();
    })
    .catch((err) => console.error(err));
}

function highlightActiveNavLink() {
  // Set data-page="home" | "about" | "our-work" | "instagram" | "contact"
  // on the <body> tag of each page to auto-underline the right nav link.
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  const link = document.querySelector(`.main-nav a[data-page="${currentPage}"]`);
  if (link) link.classList.add("active");
}
