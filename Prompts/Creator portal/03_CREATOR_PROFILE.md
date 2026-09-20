# PAGE 3 — CREATOR PROFILE AND COLLABORATION PREFERENCES

## Route

`/profile`

## Objective

Build the creator's complete profile-management page.

Use the supplied Profile image as the primary visual reference.

This page is more than basic personal information. It must allow a creator to tell Arika:

- whether they are currently available;
- which types of opportunities they want;
- which content categories they prefer;
- relevant social/audience information;
- portfolio information;
- security/account settings.

## Critical requirement

Creator preferences must be first-class product data.

The creator should be able to select:

### Availability

At minimum:

- Currently Available
- Currently Unavailable
- Available From a Future Date

If `Available From a Future Date` is selected, show a date field.

### Collaboration interests

Allow independent selection of:

- Brand Collaborations
- Instagram Paid Promotions
- Product Reviews
- Public Appearances
- Long-term Partnerships

Do not assume these are mutually exclusive.

A creator can select multiple preferences.

Example:

`Brand Collaborations + Instagram Paid Promotions`

### Content preferences

Allow categories such as:

- Fashion
- Beauty
- Lifestyle
- Travel
- Food & Beverage
- Fitness & Wellness
- Technology
- Other

Make this extensible.

## Page structure

### Header

Eyebrow:

`CREATOR PORTAL`

Heading:

`My Profile`

Subtitle:

`Manage your profile, preferences and collaboration settings.`

### Profile summary card

Display:

- profile photo;
- full name;
- verification/approval indicator where appropriate;
- creator categories;
- location;
- Instagram handle;
- email;
- bio;
- Edit Photo action.

### Profile completion

Show a percentage/progress indicator.

Do not hardcode the percentage permanently.

It should eventually be derived from completed profile fields.

### Account status

Display:

- Pending
- Approved
- Rejected
- Suspended

Use semantic colors.

Approved should use Sage Green.

Pending should use Amber.

Do not use pink for account status.

### Tabs

Create:

- Personal Info
- Preferences
- Social & Audience
- Portfolio
- Security

If the implementation initially shows Personal Info and Preferences together, keep the architecture ready for the other tabs.

## Personal Information

Fields:

- Full Name
- Email
- Phone Number
- Location
- Bio

Email may be read-only if controlled by authentication.

Use validation and character limits.

## Collaboration Preferences

Include:

### Availability Status

Dropdown/select.

### Interested In

Checkbox/card selection.

Options:

- Brand Collaborations
- Instagram Paid Promotions
- Product Reviews
- Public Appearances
- Long-term Partnerships

Each option should have a short explanation.

### Content Preferences

Multi-select checkboxes.

### Additional Notes

Textarea with character count.

## Social & Audience

Prepare UI for:

- Instagram handle;
- follower range;
- engagement range;
- audience demographics;
- audience location;
- primary languages.

Do not invent exact metrics if they are not available.

## Portfolio

Prepare a creator-controlled portfolio area for:

- selected work;
- Instagram URLs;
- campaign examples;
- media-kit link/upload where appropriate.

## Security

Provide a separate security area for:

- password/authentication management;
- active sessions if supported;
- logout from other sessions if supported by the authentication provider.

Never implement password storage manually.

## Save behavior

Use:

`Save Changes`

Show:

- saving;
- success;
- validation error;
- server error.

Avoid silent saves unless explicitly designed.

## Data model expectation

Preferences should eventually map to backend fields/tables rather than a single uncontrolled text field.

Conceptually:

```text
creator_profile
creator_preferences
creator_content_preferences
```

The exact normalized database model will be finalized during backend design.

## Security

Creators may edit only their own profile.

The server must enforce this.

## Acceptance criteria

- supplied Profile design is faithfully reflected;
- preference controls are prominent and usable;
- low-pink/high-neutral/gold palette;
- multi-select preferences work;
- responsive;
- accessible;
- validation works;
- no unauthorized editable fields;
- tests/build pass.
