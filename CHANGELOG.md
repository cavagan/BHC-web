# Changelog

All notable changes to the BurkeHaven Counseling website will be documented in this file.

## [0.1.0] - 2026-10-27

### Added
- Cloudflare Turnstile human verification on the contact form (free widget; preview uses Cloudflare’s always-pass test site key)
- Hidden honeypot field on the contact form
- Placeholder headshot of Sandra Thomas-Tyler, LPC, cropped from the official flyer

### Changed
- Public contact email is now connect@burkehavencounseling.com on the contact page, every footer, and the style guide (HTML and PDF)
- About page philosophy row is a three-column layout: headshot, centered text, cabin logo, aligned to the width of the cards below
- Hero heading and subheading on every page increased by 2pt

### Notes
- The contact form still confirms on the page only. Set `FORM_ENDPOINT` in `script.js` to deliver messages, and replace `TURNSTILE_SITE_KEY` with the practice’s Cloudflare Turnstile site key. Secret-key checks must happen on the server.

## [0.0.1] - 2026-10-19

### Added
- Initial multi-page static website (Home, About, Services, Stories, Contact)
- Official brand rebrand: navy palette, cabin logo, script typography (Great Vibes)
- Accurate practice content from official flyer and materials
- Services including Individual, Family, Couples, Parent Education, Children 0–6, Youth 7–18, PCIT, Circle of Security, TF-CBT, Court Ordered Services, LPC Candidate Supervision
- Contact form with client-side validation, loading state, and success confirmation
- Responsive navigation with mobile menu
- Brand style guide (HTML + PDF)
- Footer with crisis disclaimer (988)
- Corrected practice address: 3810 N. Peniel Avenue, Bethany, OK 73127

### Notes
- Early draft approved for development
- Owned and operated by BurkeHaven Counseling LLC
- Sandra Thomas-Tyler, LPC
