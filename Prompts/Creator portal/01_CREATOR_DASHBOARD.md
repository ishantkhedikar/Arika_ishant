# PAGE 1 — CREATOR DASHBOARD

## Route

`/dashboard`

## Objective

Create the authenticated landing page for an approved Arika creator.

The page should immediately communicate:

- current collaboration activity;
- upcoming work;
- completed work;
- recent collaborations;
- useful creator actions.

## Visual reference

Use the supplied Dashboard image as the primary layout reference.

Use the supplied Light Theme Palette as the color reference.

Do not use pink heavily. The dashboard should be predominantly cream, ivory, white, charcoal and gold.

## Layout

### Sidebar

Items:

- Dashboard — active
- Collaborations
- Profile
- Contact Arika
- Logout

### Topbar

Right side:

- Visit Website
- Notification bell
- Creator avatar
- `Hi, {firstName}`
- account dropdown

### Header

Eyebrow:

`CREATOR PORTAL`

Main heading:

`Good morning, {firstName} 👋`

Subtitle:

`Here’s what’s happening with your collaborations.`

Use dynamic greeting data rather than hardcoding the creator name.

## Statistics

Three cards:

### Active Collaborations

Display count.

Icon should use a restrained gold treatment.

### Upcoming

Display count.

Use a subtle beige/gold or restrained warm accent.

### Completed

Display count.

Use Sage Green for the success-oriented icon/state.

Do not use pink simply to differentiate cards.

## Recent Collaborations

Section heading:

`Recent Collaborations`

Right-side action:

`View All →`

Each collaboration row/card contains:

- thumbnail;
- campaign/brand name;
- platform;
- content type;
- deliverable;
- deadline;
- status;
- navigation affordance.

Example structure:

`Velvet Luxe`
`Instagram Reel · Content Creation`
`Due: 18 Sept 2025`
`In Progress`

Use reusable `StatusBadge`.

Suggested semantic status treatments:

- In Progress → Sky Blue or restrained blue
- Under Review → Amber
- Upcoming → Sage Green
- Completed → Sage Green
- Cancelled → Error Red

Status colors must remain subtle.

## Quick Actions

Three actions:

- View Collaborations
- Edit Profile
- Contact Arika

Routes:

- `/collaborations`
- `/profile`
- `/contact`

Use icons and clean bordered cards.

## Promotional section

Include a restrained promotional banner at the bottom similar to the reference:

`Turn Your Influence Into Greater Opportunities`

Supporting copy:

`Stay consistent. Keep creating. We’ll handle the rest.`

Primary CTA:

`Explore New Campaigns →`

Do not invent a public campaign marketplace if the product rules do not support one. The CTA can instead lead to `/collaborations` or an appropriate future opportunity page.

## States

Implement:

- loading skeleton;
- empty collaborations;
- API error;
- missing thumbnail;
- long campaign name.

## Data contract

Prepare the frontend for:

`GET /api/creator/dashboard`

Conceptual response:

```json
{
  "creator": {
    "firstName": "Priya",
    "avatarUrl": null
  },
  "stats": {
    "activeCollaborations": 2,
    "upcomingCollaborations": 1,
    "completedCollaborations": 8
  },
  "recentCollaborations": []
}
```

Do not hardcode these values into presentation components.

## Acceptance criteria

- visually matches supplied dashboard;
- low-pink/high-cream/gold visual balance;
- responsive;
- reusable components;
- navigation works;
- no console errors;
- lint/typecheck/tests/build pass.
