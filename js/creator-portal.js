/* ==========================================================================
   CREATOR PORTAL — Shared Shell JS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Mobile sidebar toggle ---- */
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("open");
    });
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
    });
  }

  /* ---- Account dropdown ---- */
  const userChip = document.querySelector(".user-chip");
  const dropdown = document.querySelector(".user-dropdown");
  if (userChip && dropdown) {
    userChip.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
    document.addEventListener("click", () => dropdown.classList.remove("open"));
  }

  /* ---- Notification bell placeholder ---- */
  const notifBtn = document.querySelector(".icon-btn[aria-label='Notifications']");
  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      console.log("TODO: notifications panel");
    });
  }

  /* ---- Dynamic greeting ---- */
  const greetEl = document.querySelector("[data-greeting]");
  if (greetEl) {
    const h = new Date().getHours();
    const period = h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
    greetEl.textContent = greetEl.textContent.replace("{period}", period);
  }

  /* ---- Action menus ---- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".action-menu-btn");
    document.querySelectorAll(".action-menu.open").forEach(m => {
      if (!btn || m !== btn.nextElementSibling) m.classList.remove("open");
    });
    if (btn) {
      btn.nextElementSibling.classList.toggle("open");
      e.stopPropagation();
    }
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  /* ---- Preference cards (multi-select) ---- */
  document.querySelectorAll(".pref-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("selected");
      const cb = card.querySelector("input[type='checkbox']");
      if (cb) cb.checked = card.classList.contains("selected");
    });
  });

  /* ---- Content category chips ---- */
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => chip.classList.toggle("selected"));
  });

  /* ---- Profile tabs ---- */
  document.querySelectorAll(".profile-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".profile-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  /* ---- Contact form tabs ---- */
  document.querySelectorAll(".contact-form-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".contact-form-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".contact-tab-panel").forEach(p => {
        p.classList.remove("active");
        p.style.display = "none";
      });
      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.tab);
      if (target) { target.classList.add("active"); target.style.display = ""; }
    });
  });

  /* ---- Availability date field toggle ---- */
  const availSelect = document.getElementById("availability");
  const availDateWrap = document.getElementById("available-from-wrap");
  if (availSelect && availDateWrap) {
    const toggle = () => {
      availDateWrap.style.display = availSelect.value === "available-from" ? "block" : "none";
    };
    availSelect.addEventListener("change", toggle);
    toggle();
  }

  /* ---- Char counter ---- */
  document.querySelectorAll("[data-maxlength]").forEach(el => {
    const max = parseInt(el.dataset.maxlength);
    const counter = el.parentElement.querySelector(".char-count");
    if (!counter) return;
    const update = () => { counter.textContent = `${el.value.length} / ${max}`; };
    el.addEventListener("input", update);
    update();
  });

  /* ---- File upload label ---- */
  document.querySelectorAll(".file-upload-label input[type='file']").forEach(input => {
    input.addEventListener("change", () => {
      const label = input.closest(".file-upload-label");
      const nameEl = label.parentElement.querySelector(".file-name");
      if (nameEl) nameEl.textContent = input.files[0] ? input.files[0].name : "";
    });
  });

});
