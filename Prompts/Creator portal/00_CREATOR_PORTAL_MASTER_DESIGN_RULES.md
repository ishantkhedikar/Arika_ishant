# ARIKA CREATOR PORTAL — MASTER DESIGN RULES

## Objective

Build the authenticated Creator/Influencer Portal for Arika Collabs.

The uploaded reference screens are the visual source of truth for:

- Creator Dashboard
- Collaborations
- My Profile
- Contact Arika

The uploaded Arika Light Theme Palette is the color source of truth.

## Critical visual requirement

DO NOT use pink heavily.

Pink/soft rose is only a secondary accent. The dominant visual language must be:

- Cream White `#FFFDF7`
- Warm Ivory `#F8F4EB`
- Sand Beige `#EADCC8`
- Signature Gold `#D4AF37`
- Gold Light `#EED9A4`
- Charcoal Black `#1A1A1A`
- Dark Gray `#4A4A4A`
- Gray `#777777`
- Light Gray `#C9C9C9`
- Extra Light `#E9E9E9`
- Pure White `#FFFFFF`

Use:

- Signature Gold for primary CTAs, active navigation and important highlights.
- Gold Light for subtle selected backgrounds and hover states.
- Warm Ivory / Cream White for page backgrounds.
- Sand Beige for cards, dividers and muted sections.
- Charcoal Black for major text.
- Dark Gray / Gray for secondary text.
- Sage Green `#8CA77F` for positive/success states.
- Sky Blue `#DE6EF7` ONLY as an informational accent if needed; otherwise keep status colors restrained.
- Amber `#F5A623` for warnings/pending.
- Error Red `#FF5252` only for errors/destructive validation.
- Rose Gold `#DDA291` and Soft Rose `#EBC9B4` sparingly, ideally as tiny accents or subtle decorative gradients.

## Preferred visual ratio

Approximately:

- 70–80% cream/ivory/white neutrals
- 10–15% black/dark text and navigation
- 8–12% gold/beige accents
- very small amount of rose/peach
- status colors only where semantically required

Never make the portal look pink.

## Brand character

The portal must feel:

- premium;
- elegant;
- editorial;
- calm;
- trustworthy;
- modern;
- creator-focused;
- spacious.

Avoid:

- generic purple SaaS dashboards;
- excessive gradients;
- neon colors;
- excessive glass effects;
- excessive rounded pills;
- excessive shadows;
- dense enterprise UI;
- excessive pink.

## Layout

Use the same authenticated shell across all creator pages:

### Sidebar

Persistent desktop sidebar containing:

- Arika Collabs logo
- Dashboard
- Collaborations
- Profile
- Contact Arika
- Logout

The active item uses a light gold/beige background and gold/charcoal emphasis.

### Topbar

Contains:

- Visit Website
- notifications
- creator avatar
- greeting/name
- account dropdown

### Main content

Use a consistent content width, spacing system and page-header structure.

## Typography

Use an elegant serif display face for major page headings where the existing project supports it.

Use a clean sans-serif for:

- navigation;
- labels;
- forms;
- metadata;
- tables;
- buttons.

Headings should be sophisticated but readable.

## Component reuse

Create reusable components instead of copying markup:

- `CreatorLayout`
- `CreatorSidebar`
- `CreatorTopbar`
- `PageHeader`
- `StatCard`
- `StatusBadge`
- `SectionCard`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `PrimaryButton`
- `SecondaryButton`
- `FormField`
- `Avatar`
- `NotificationButton`

## Responsive behavior

Desktop:
- fixed/collapsible sidebar;
- spacious content;
- multi-column cards.

Tablet:
- collapsible sidebar;
- reduced card widths.

Mobile:
- drawer navigation;
- single-column cards;
- stacked forms;
- horizontally scrollable filter tabs only when necessary;
- no horizontal page overflow.

## Accessibility

Implement:

- semantic HTML;
- keyboard navigation;
- visible focus states;
- proper labels;
- accessible buttons;
- accessible form errors;
- sufficient contrast;
- meaningful icon labels/tooltips.

## Data architecture

Frontend components must not contain hardcoded business logic.

Use a service/API abstraction.

During frontend-only implementation, fixture data is acceptable, but it must be isolated so it can later be replaced by FastAPI responses.

Do NOT connect dashboard components directly to Supabase.

The intended architecture is:

`UI → frontend service/API client → FastAPI → service → repository/ORM → Supabase PostgreSQL`

## Security

These pages are private.

Frontend route guards are required for UX, but they are NOT the actual security boundary.

Final authorization will be enforced by FastAPI.

Never:

- expose service-role keys;
- put database credentials in frontend code;
- trust a browser-supplied creator ID;
- trust frontend role checks as authorization.

## Reference images

Use the uploaded screens as visual references:

- Dashboard reference
- Collaborations reference
- Profile reference
- Contact reference
- Light Theme Palette reference

Match their structure and visual hierarchy without blindly reproducing pixel-level mistakes or placeholder data.
