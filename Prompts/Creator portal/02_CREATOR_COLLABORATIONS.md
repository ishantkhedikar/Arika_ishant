# PAGE 2 — CREATOR COLLABORATIONS

## Route

`/collaborations`

## Objective

Create the complete collaboration-management page for an authenticated creator.

Use the supplied Collaborations image as the primary visual reference.

## Visual direction

Maintain the same Creator Portal shell.

Dominant colors:

- Cream White
- Warm Ivory
- Sand Beige
- Signature Gold
- Charcoal Black

Do NOT make filter tabs, cards or backgrounds pink.

Use status colors only where meaningful.

## Header

Eyebrow:

`CREATOR PORTAL`

Heading:

`Collaborations`

Subtitle:

`All your brand collaborations in one place.`

## Status filter tabs

Create:

- All
- Active
- Upcoming
- Under Review
- Completed
- Cancelled

Each tab should display a count where useful.

Active/selected tab uses a soft gold/beige background.

Do not use pink as the active tab color.

## Search and filters

Include:

### Search

Placeholder:

`Search campaigns, brands or content type...`

### Platform filter

Instagram should be the primary platform because Arika currently focuses on Instagram promotions.

### Status filter

Reusable status selector.

### Sort

Support:

- Deadline
- Newest
- Oldest
- Status

Make the architecture extensible.

## Collaboration table/list

Columns:

- Campaign / Brand
- Content Type
- Platform
- Deadline
- Status
- Actions

Each row should contain:

- thumbnail;
- campaign name;
- brand name;
- content type;
- content/deliverable subtype;
- Instagram indicator;
- deadline;
- status;
- action menu.

Use realistic fixture data only for UI development.

## Pagination

Implement:

- previous;
- next;
- current page;
- rows per page.

Keep pagination component reusable.

## Action menu

Possible actions:

- View Details
- Contact Arika

Do not add unauthorized creator capabilities such as:

- changing campaign payment;
- changing assigned creator;
- editing admin-only campaign fields.

## Responsive

On mobile, transform the table into stacked collaboration cards or a carefully designed horizontal-scroll table.

Do not allow the entire page to overflow horizontally.

## Loading

Use skeleton rows.

## Empty state

Example:

`No collaborations found`

With contextual text and a clear action to reset filters.

## API contract

Prepare for:

`GET /api/creator/collaborations`

Query parameters should eventually support:

- page;
- page_size;
- search;
- status;
- platform;
- sort.

## Security

The API must return only collaborations belonging to the authenticated creator.

Never send a creator ID from the browser as the authorization mechanism.

## Acceptance criteria

- matches reference structure;
- same portal shell;
- low-pink/high-neutral/gold palette;
- functional filtering UI;
- pagination UI;
- responsive;
- accessible;
- no broken links;
- tests/build pass.
