/* ==========================================================================
   CREATOR COLLAGE — rotation + click-to-open popup
   Include on index.html with: <script src="js/creator-collage.js"></script>
   Requires the .creator-collage markup + creator-modal-overlay in index.html
   ========================================================================== */

(function () {
  // Demo roster — swap in real signed creators any time.
  // Each entry needs: id, name, category, avatar (image path), followers, location, bio
  const CREATORS = [
    {
      id: "priya",
      name: "Priya Sharma",
      category: "Fashion",
      avatar: "assets/images/creator-priya.jpg",
      followers: "128K",
      location: "Mumbai, IN",
      bio: "Fashion & styling creator known for editorial-style Reels and street-style lookbooks."
    },
    {
      id: "siya",
      name: "Siya Patel",
      category: "Fashion",
      avatar: "assets/images/creator-siya.jpg",
      followers: "128K",
      location: "Mumbai, IN",
      bio: "Fashion & styling creator known for editorial-style Reels and street-style lookbooks."
    },
    {
      id: "diya",
      name: "Diya Gupta",
      category: "Fashion",
      avatar: "assets/images/creator-diya.jpg",
      followers: "120K",
      location: "Pune, IN",
      bio: "Fashion & styling creator known for editorial-style Reels and street-style lookbooks."
    },
    {
      id: "riya",
      name: "Riya Mehta",
      category: "Beauty",
      avatar: "assets/images/creator-riya.jpg",
      followers: "94K",
      location: "Delhi, IN",
      bio: "Beauty creator specializing in skincare routines and makeup tutorials for everyday looks."
    },
    {
      id: "aman",
      name: "Aman Verma",
      category: "Fitness",
      avatar: "assets/images/creator-aman.jpg",
      followers: "76K",
      location: "Bengaluru, IN",
      bio: "Fitness coach and creator sharing workout breakdowns and healthy lifestyle content."
    },
    {
      id: "rahul",
      name: "Rahul Singh",
      category: "Fitness",
      avatar: "assets/images/creator-rahul.jpg",
      followers: "76K",
      location: "Bengaluru, IN",
      bio: "Fitness coach and creator sharing workout breakdowns and healthy lifestyle content."
    },
    {
      id: "neha",
      name: "Neha Kapoor",
      category: "Lifestyle",
      avatar: "assets/images/creator-neha.jpg",
      followers: "112K",
      location: "Pune, IN",
      bio: "Lifestyle creator covering travel, home aesthetics, and day-in-the-life content."
    }
  ];

  const ROTATE_INTERVAL_MS = 3000; // how often each slot flips to the next creator

  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".creator-card");
    if (!cards.length) return;

    const overlay = document.getElementById("creator-modal-overlay");
    const modal = overlay ? overlay.querySelector(".creator-modal") : null;

    // ---------- build image layers inside each card ----------
    cards.forEach((card, cardIndex) => {
      const media = card.querySelector(".creator-card__media");
      const label = card.querySelector(".creator-card__label");
      const badge = card.querySelector(".creator-card__badge");

      // Stagger starting creator per card so they don't all show the same one
      let activeIndex = cardIndex % CREATORS.length;

      // Pre-render an <img> per creator, toggle visibility for a smooth crossfade
      CREATORS.forEach((creator, i) => {
        const img = document.createElement("img");
        img.src = creator.avatar;
        img.alt = creator.name;
        if (i === activeIndex) img.classList.add("is-active");
        media.appendChild(img);
      });

      function paintLabel(creator) {
        if (label) {
          label.innerHTML = `<strong>${creator.name}</strong><span>${creator.category}</span>`;
        }
        if (badge) badge.textContent = creator.category;
        card.dataset.creatorId = creator.id;
      }

      paintLabel(CREATORS[activeIndex]);

      // Stagger the interval start slightly per card for a livelier feel
      setTimeout(() => {
        setInterval(() => {
          const imgs = media.querySelectorAll("img");
          imgs[activeIndex].classList.remove("is-active");
          activeIndex = (activeIndex + 1) % CREATORS.length;
          imgs[activeIndex].classList.add("is-active");
          paintLabel(CREATORS[activeIndex]);
        }, ROTATE_INTERVAL_MS);
      }, cardIndex * 400);

      // ---------- click / keyboard to open popup ----------
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-haspopup", "dialog");

      function openForCurrentCreator() {
        const creator = CREATORS.find(c => c.id === card.dataset.creatorId);
        if (creator) openModal(creator);
      }

      card.addEventListener("click", openForCurrentCreator);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openForCurrentCreator();
        }
      });
    });

    // ---------- popup modal logic ----------
    function openModal(creator) {
      if (!overlay || !modal) return;

      modal.querySelector(".creator-modal__avatar img").src = creator.avatar;
      modal.querySelector(".creator-modal__avatar img").alt = creator.name;
      modal.querySelector(".creator-modal__name").textContent = creator.name;
      modal.querySelector(".creator-modal__category").textContent = creator.category;
      modal.querySelector(".creator-modal__followers").textContent = creator.followers;
      modal.querySelector(".creator-modal__location").textContent = creator.location;
      modal.querySelector(".creator-modal__bio").textContent = creator.bio;

      const viewProfileBtn = modal.querySelector(".creator-modal__view-profile");
      if (viewProfileBtn) {
        // Point this at a real profile route once creator pages exist
        viewProfileBtn.href = `instagram.html?creator=${encodeURIComponent(creator.id)}`;
      }

      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      modal.querySelector(".creator-modal__close").focus();
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      if (!overlay) return;
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (overlay) {
      overlay.querySelector(".creator-modal__close").addEventListener("click", closeModal);

      // click outside the modal (on the dark overlay) closes it
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
      });

      // Escape key closes it
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
      });
    }
  });
})();
