# Arika Collabs — React.js & Vite Platform

A modern, production-ready React.js application connecting brands with Instagram creators to create authentic content, drive high engagement, and deliver measurable campaign ROI.

The project has been migrated from vanilla HTML/CSS/JS to a component-based React SPA powered by Vite and React Router, while preserving 100% of the visual identity, luxury styling, design tokens, color palette, and interactive workflows.

---

## 1. Quick Start & Development

### Installation

```bash
npm install
```

### Development Server

Start the full development server powered by Vite:

```bash
npm run dev
```

The application and proxy endpoints are served at `http://localhost:3000`.

### Production Build & Launch

```bash
npm run build
npm start
```

---

## 2. Technology Stack

- **Frontend Core:** React 19, Vite 8, JavaScript (ESM)
- **Routing:** React Router DOM (v7)
- **State & Context:** React Context API (`AuthContext`), persistent session handling (`arika_auth_session` via `localStorage`)
- **Backend API & Middleware:** Express.js, Node.js `crypto`, SheetJS (`xlsx`) for OpenXML spreadsheet generation
- **Styling:** CSS variables, design token system, responsive typography, glassmorphism, gold accents, Playfair Display & Plus Jakarta Sans typography

---

## 3. Project Architecture

```text
arika-collabs/
│
├── public/
│   └── assets/
│       └── images/               # Creator headshots, campaign mockups, logos
│
├── server/
│   └── apiRouter.js              # Express REST router for settings, team, reports, OTP
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx            # Shared navigation with dynamic auth chips
│   │   ├── Footer.jsx            # Shared site footer
│   │   ├── CreatorCollage.jsx    # Auto-rotating 4-card hero collage
│   │   ├── CreatorModal.jsx      # Creator profile card preview popup
│   │   └── PerformanceChart.jsx  # SVG cubic-bezier performance curve
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx      # Public header, outlet, footer
│   │   ├── CreatorLayout.jsx     # Creator dashboard shell with sidebar & mobile overlay
│   │   └── AdminLayout.jsx       # Admin portal shell with ambient glows & top navigation
│   │
│   ├── pages/
│   │   ├── Home.jsx              # Landing page with hero, collage, features, previews
│   │   ├── About.jsx             # Mission, values, steps, stats
│   │   ├── OurWork.jsx           # Case studies with category filters & sort
│   │   ├── Instagram.jsx         # 12-tile Instagram grid with categories
│   │   ├── Contact.jsx           # Controlled creator & brand inquiry forms
│   │   ├── Login.jsx             # Split-screen login & register with role switch
│   │   ├── ForgotPassword.jsx    # Reset password request form
│   │   ├── CreatorGuide.jsx      # 4-step collaboration workflow guide
│   │   ├── PrivacyPolicy.jsx     # Privacy terms & disclosures
│   │   ├── TermsOfUse.jsx        # Platform terms of use
│   │   ├── Support.jsx           # Interactive FAQ accordion & contact link
│   │   │
│   │   ├── creator/
│   │   │   ├── Dashboard.jsx     # Creator metrics, recent campaigns, quick actions
│   │   │   ├── Collaborations.jsx# Campaign deliverables list & draft upload modal
│   │   │   ├── Profile.jsx       # Media kit, niches, availability, and contact info
│   │   │   └── Contact.jsx       # Agency messaging & creator FAQs
│   │   │
│   │   └── admin/
│   │       ├── Dashboard.jsx     # Live metrics, applications review, performance chart
│   │       ├── Influencers.jsx   # Roster table, search, category filter, status actions
│   │       ├── Campaigns.jsx     # Initiative management, budget tracking, create modal
│   │       ├── Collaborations.jsx# Deliverables supervisor, review states, status modals
│   │       ├── Inquiries.jsx     # Brand/Creator message inbox with reply dialog
│   │       ├── Content.jsx       # Published reel/carousel catalog & engagement stats
│   │       ├── Analytics.jsx     # Niche benchmarks & monthly growth trajectory
│   │       └── Settings.jsx      # 6 tabs: General, Team, Alerts, Data, Platform, Security
│   │
│   ├── services/
│   │   ├── api.js                # Client API requests for settings, backups, reports
│   │   ├── authService.js        # Authentication credentials, session management
│   │   ├── portalData.js         # Central models for influencers, campaigns, content
│   │   └── creatorService.js     # Creator profile, dashboard, and collaborations
│   │
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication state, login, logout, role guards
│   │
│   ├── styles/                   # Ported design token CSS stylesheets
│   ├── App.jsx                   # Central route registry & role-protected routes
│   ├── main.jsx                  # React application entry point
│   └── index.css                 # Master style bundle
│
├── Admin/services/
│   └── settingsBackend.js        # Backend store, Excel exporter, single-use OTP
│
├── index.html                    # Vite HTML entry point with fonts & metadata
├── vite.config.js                # Vite config with embedded Express API plugin
├── server.js                     # Fullstack production server
├── package.json
└── README.md
```

---

## 4. Application Routes

### Public Pages
- `/` — Homepage (Hero, Creator Collage, Services, Instagram Preview)
- `/about` — About Arika (Agency philosophy, purpose, values, how we work)
- `/our-work` (or `/work`) — Campaign Portfolio (Category filters, sorting, case study modal)
- `/instagram` — Curated Instagram Feed (Tile categories & post showcase)
- `/contact` — Contact & Proposals (Creator application / Brand inquiry tabs)
- `/creator-guide` — Creator Guide (Step-by-step onboarding walkthrough)
- `/privacy-policy` — Privacy Policy
- `/terms-of-use` — Terms of Use
- `/support` — FAQ & Support Center

### Authentication
- `/login` — Login screen (Creator vs Admin account selector, demo accounts helper)
- `/register` — Register tab redirect
- `/forgot-password` — Password reset request

### Creator Portal (Protected: Creator Role)
- `/creator/dashboard` — Creator Dashboard overview, metrics, deliverables list
- `/creator/collaborations` — Campaign deliverables, filtering, draft submission modal
- `/creator/profile` — Media kit profile, niches, follower tier, availability
- `/creator/contact` — Agency team message dispatcher and creator FAQ

### Admin Portal (Protected: Admin Role)
- `/admin/dashboard` — Admin Command Center, application approval, performance chart
- `/admin/influencers` — Creator talent roster, tier filtering, status actions
- `/admin/campaigns` — Brand campaign manager, budget tracking, campaign creator
- `/admin/collaborations` — Deliverables tracker, status inspector, contract states
- `/admin/inquiries` — Inbound brand proposals & creator pitches with email replies
- `/admin/content` — Published asset library, reel metrics, impressions, shares
- `/admin/analytics` — Audience reach benchmarks, niche breakdown, growth trends
- `/admin/settings` — 6-Tab Admin Settings Suite:
  - `General`: Admin profile, branding, currencies, timezones
  - `Team & Access`: Member directory, role modification, invite modal, audit logs
  - `Notifications`: Granular channel matrix (Email/In-App/Push), test mail tool
  - `Data & Reports`: 1-Click Excel exports, multi-sheet report builder
  - `Platform`: Live feature toggles & maintenance mode
  - `Security`: 2FA, Superuser authorization, 4-step data purge OTP workflow, full snapshot backup/restore

---

## 5. Development Credentials

The platform includes demo accounts configured for instant role testing:

- **Administrator:**
  - Email: `admin@arikacollabs.com`
  - Password: `admin123`
  - Access: Full access to `/admin/*` portal
- **Creator / User:**
  - Email: `user@arikacollabs.com`
  - Password: `user123`
  - Access: Full access to `/creator/*` portal

---

## 6. Backend API Endpoints

- `GET /api/settings` — Retrieve platform configurations
- `POST /api/settings` — Save general and platform settings
- `GET /api/settings/team` — List staff members and access logs
- `POST /api/settings/team/invite` — Send staff invitation
- `POST /api/settings/team/update-role` — Update member role (Administrator / Moderator)
- `DELETE /api/settings/team/:id` — Revoke team member access
- `POST /api/settings/notifications/test` — Dispatch verification email
- `GET /api/settings/data/recent-exports` — Fetch generated report history
- `GET /api/settings/data/export/:dataset` — Download binary OpenXML `.xlsx` dataset export
- `POST /api/settings/data/generate-report` — Generate consolidated multi-sheet workbook
- `GET /api/settings/security/status` — Get 2FA, session timeout and superuser status
- `POST /api/settings/security/request-otp` — Request 5-minute cryptographic single-use OTP
- `POST /api/settings/security/verify-delete` — Verify OTP and execute date-scoped data purge
- `POST /api/settings/security/backup` — Create full platform JSON backup
- `GET /api/settings/security/download-last-backup` — Download last JSON backup snapshot
