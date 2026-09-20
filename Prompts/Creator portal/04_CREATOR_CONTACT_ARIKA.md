# PAGE 4 — CONTACT ARIKA

## Route

`/contact`

## Objective

Create the authenticated creator support/contact page.

Use the supplied Contact image as the visual reference.

The page should feel like a premium support and opportunity-contact workspace, not a generic contact form.

## Visual direction

Dominant:

- Cream White
- Warm Ivory
- Pure White
- Sand Beige
- Charcoal
- Signature Gold

Use Soft Rose/Rose Gold only as a very small secondary accent.

Do not use a large pink panel.

## Header

Eyebrow:

`CREATOR PORTAL`

Heading:

`Contact Arika`

Subtitle:

`We’re here to help. Reach out to the Arika team for support, questions or opportunities.`

## Intro banner

Use a warm ivory/peach-tinted but mostly neutral banner:

`Let’s Grow Together`

Supporting text:

`Have a question, need support, or want to discuss a new opportunity?`

Mention expected response time where appropriate.

## Main contact areas

Use two clear sections.

### General Inquiry

Purpose:

- support;
- account questions;
- collaboration questions;
- general requests.

Fields:

- Subject
- Message
- Optional attachment

CTA:

`Send Message →`

### Opportunity Inquiry

Purpose:

- express interest in collaboration opportunities;
- provide information about a potential opportunity;
- communicate availability/preferences.

Fields:

- Opportunity Type
- Brief Details
- Expected Timeline
- Budget/Rate Range where relevant
- Optional portfolio/media-kit attachment

CTA:

`Send Inquiry →`

## Important business rule

Creators do NOT directly collaborate with brands through this interface.

Do not create:

- direct brand chat;
- brand contact details for private outreach;
- direct campaign negotiation interface.

Arika remains the intermediary.

## Quick Contact card

Include:

- support email;
- Instagram contact;
- expected response time.

Use actual configured values when the project provides them. Otherwise use placeholders clearly marked for replacement.

## FAQ section

Include expandable FAQ rows such as:

- How do I get selected for campaigns?
- What type of creators does Arika work with?
- How are collaborations managed?
- When will I receive payment?
- Can I suggest a brand for collaboration?

Keep FAQ data separate from presentation.

## Success state

After successful submission:

- show a clear confirmation;
- provide inquiry/reference identifier if backend supports it;
- prevent accidental duplicate submission;
- allow returning to dashboard.

## Validation

Implement:

- required fields;
- character limits;
- safe file type restrictions;
- maximum file size;
- accessible error messages.

Do not trust client-side validation alone.

## API contract

Prepare for endpoints such as:

`POST /api/creator/inquiries`

and, if needed:

`GET /api/creator/inquiries`

The exact API contract will be finalized in the backend phase.

## Security

- authenticated creator required;
- creator can see only their own private inquiries if inquiry history is provided;
- sanitize/validate input;
- do not expose internal admin notes.

## Acceptance criteria

- matches Contact reference;
- neutral cream/gold visual dominance;
- minimal pink;
- responsive;
- accessible;
- validation;
- success/error states;
- no direct brand-to-creator communication;
- tests/build pass.
