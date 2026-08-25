# Solara Website MVP

## Product goal

Launch a trustworthy, responsive website that helps Cebu homeowners and businesses understand Solara's services and request a free solar assessment. The site must educate without making unverified promises and keep direct phone, email, and Facebook contact available at every conversion point.

The complete primary build specification is preserved in [`solara-mvp-build-prompt.md`](./solara-mvp-build-prompt.md).

## Audiences

- Cebu homeowners seeking clearer energy choices, appropriate system sizing, and optional backup.
- Cebu businesses seeking reliable design, installation, maintenance, and support.

## Information architecture

- `/` — landing page with solutions, system types, package starting points, process, values, product brands, FAQ, assessment form, and contact details.
- `/privacy` — plain-language operational privacy notice for inquiries.
- Custom not-found page.
- Machine-readable `/robots.txt` and `/sitemap.xml`.

## Functional requirements

- Responsive, keyboard-operable navigation from 320 px upward.
- Direct `tel:`, `mailto:`, and Facebook links.
- Lead form with client and server validation, conditional email requirement, consent, honeypot, and rate limiting.
- Server-only email adapter. Missing provider credentials must produce an honest failure state with direct contact alternatives.
- Truthful metadata and Organization structured data based only on confirmed business information.
- Secure response headers, no marketing trackers, and no logging of lead payloads.

## Acceptance criteria

- Homepage and privacy route are complete and responsive with no horizontal overflow.
- Confirmed services and grid-tied, hybrid, and off-grid safety wording are present.
- 3 kW, 5 kW, and 10 kW+ cards contain no price, output, savings, household-size, or warranty promises.
- No fake testimonials, metrics, projects, certifications, or partnerships.
- Form validation, success, and failure states are accessible and tested.
- Lint, content audit, type checking, unit tests, end-to-end smoke tests, and production build pass.
- Production email delivery is tested before launch.
- Deployment secrets and the canonical production URL are configured outside source control.
