# Arika Collabs — Website Build (Complete Prototype)

Every page from the sitemap PDF now exists and is linked together. This is a
static HTML/CSS/JS prototype — no real backend/database yet (see "What's
NOT real yet" below).

## How to run this locally

`fetch()` (used to load the shared header/footer on public pages) is blocked
on `file://` paths by browsers. Use a local server:

**VS Code (easiest):** Install the **"Live Server"** extension, right-click
`index.html`, choose **"Open with Live Server"**.

**No extension:**
```
python3 -m http.server 5500
```
Then open `http://localhost:5500`.

---

## Full page list (all connected)

### Public marketing pages (light theme, shared header/footer)
| Page | File |
|---|---|
| Home | index.html |
| About | about.html |
| Our Work (filterable campaign grid) | our-work.html |
| Instagram (filterable post grid) | instagram.html |
| Contact (Creator/Brand toggle forms) | contact.html |
| Privacy Policy | privacy-policy.html |
| Terms of Use | terms-of-use.html |
| Creator Guide | creator-guide.html |
| Support (FAQ accordion) | support.html |

### Auth pages (dark split-screen, full-screen, no header/footer)
| Page | File |
|---|---|
| Creator Login + Register (tabs) | login.html |
| Forgot Password | forgot-password.html |
| Admin Login | admin-login.html |

### Creator Portal (sidebar shell, reachable only after login)
| Page | File |
|---|---|
| Dashboard | dashboard.html |
| Collaborations | collaborations.html |
| Profile | profile.html |

### Admin Portal (sidebar shell, reachable only after admin login)
| Page | File |
|---|---|
| Dashboard | admin-dashboard.html |
| Influencers | admin-influencers.html |
| Campaigns | admin-campaigns.html |
| Collaborations | admin-collaborations.html |
| Inquiries | admin-inquiries.html |
| Content | admin-content.html |

## How everything connects (click-through paths)

```
Home -> Login -> Dashboard (Creator Portal)
Home -> Register (opens login.html#register tab) -> Dashboard
Home -> footer "Admin Portal" link -> Admin Login -> Admin Dashboard
Dashboard sidebar -> Collaborations / Profile / Contact Arika
Admin Dashboard sidebar -> Influencers / Campaigns / Collaborations / Inquiries / Content
Any public page footer -> About / Our Work / Instagram / Contact / Privacy / Terms / Creator Guide / Support
Login page -> "Forgot password?" -> Forgot Password page
```

Every internal link across all pages has been checked and resolves to a real
file — nothing points to a page that doesn't exist.

## What's NOT real yet (important before going live)

- **No real authentication.** Login/Register/Admin Login forms accept
  anything and redirect regardless of what you type. Each has a `TODO`
  comment in its JS file marking exactly where a real API call needs to go.
- **No real data.** All names, stats, and collaborations (Priya Sharma,
  Velvet Luxe, 103 influencers, etc.) are placeholder content matching your
  PDF mockups — swap in real data once you have a backend/database.
- **No real images.** Placeholder colored boxes stand in for photos —
  drop real images into `assets/images/` and swap the CSS `background`
  properties or `<img>` `src` attributes.
- **No page-guarding.** Anyone can type `dashboard.html` or
  `admin-dashboard.html` directly, since there's no session check yet.
- **`logout.html`** doesn't exist — all Logout buttons currently just send
  you back to the relevant login page, which is fine until real sessions
  exist (then Logout should actually clear the session/token).

## Four page-layout patterns (copy these for anything new)

1. **Marketing** (index.html, about.html, our-work.html, instagram.html, contact.html) — light theme, shared header/footer via js/main.js, content in `.section` blocks.
2. **Auth** (login.html, forgot-password.html, admin-login.html) — dark split-screen, full-screen, no header/footer.
3. **Creator/Admin Portal** (dashboard.html, collaborations.html, profile.html, admin-*.html) — sidebar + topbar shell, no public header/footer.
4. **Simple content pages** (privacy-policy.html, terms-of-use.html, creator-guide.html, support.html) — marketing pattern + css/pages/legal.css for plain prose/FAQ layout.

## Folder structure

```
arika-collabs/
├── index.html, about.html, our-work.html, instagram.html, contact.html
├── login.html, forgot-password.html, admin-login.html
├── dashboard.html, collaborations.html, profile.html
├── admin-dashboard.html, admin-influencers.html, admin-campaigns.html,
│   admin-collaborations.html, admin-inquiries.html, admin-content.html
├── privacy-policy.html, terms-of-use.html, creator-guide.html, support.html
├── _page-template.html          <- copy this for any NEW marketing page
├── css/
│   ├── variables.css            <- color palette, single source of truth
│   ├── base.css                 <- resets, buttons, cards, forms, badges
│   ├── header-footer.css        <- public nav + footer
│   └── pages/                   <- one file per page/pattern
│       ├── home.css, about.css, our-work.css, instagram.css, contact.css
│       ├── auth.css              (shared by login/admin-login/forgot-password)
│       ├── dashboard.css         (shared by all portal pages)
│       └── legal.css             (shared by privacy/terms/guide/support)
├── partials/
│   ├── header.html               (logged-out public nav)
│   ├── header-loggedin.html      (logged-in creator nav)
│   └── footer.html
├── js/
│   ├── main.js        <- injects header/footer + active-link highlight
│   ├── auth.js          (login/register tabs, password toggle)
│   ├── admin-auth.js    (admin login redirect)
│   ├── forgot-password.js
│   ├── dashboard.js     (topbar icon placeholders, shared by all portal pages)
│   ├── contact.js       (creator/brand toggle + form submit placeholder)
│   ├── our-work.js       (generic filter-tab logic, reused by instagram.html)
│   └── support.js        (FAQ accordion)
└── assets/
    ├── images/
    └── icons/
```

## Suggested next steps

1. Drop real photography into `assets/images/` and swap placeholder
   background colors / `<img>` tags for real images.
2. Fill in real copy where placeholder text exists.
3. Build a backend (Node/Express, Firebase, etc.) and replace every `TODO`
   in the JS files with real API calls.
4. Add page-guarding so dashboard.html / admin-*.html redirect to login
   if there's no valid session.

## Git workflow (recommended for two people)

```bash
git init
git add .
git commit -m "Complete connected prototype: all pages built and linked"
git remote add origin <your-repo-url>
git push -u origin main
```

**Golden rule:** if you ever need to change variables.css, base.css, or
header-footer.css, tell your collaborator first — every page depends on
these three files.
