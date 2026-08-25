# Solara Website MVP

A production-oriented Next.js website for Solara's Cebu solar assessment journey. The MVP includes a complete responsive landing page, plain-language privacy notice, server-validated inquiry form, truthful SEO data, automated quality gates, and deployment documentation.

## Local development

Requirements: Node.js 20.9 or newer and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Direct call, email, and Facebook links work without provider configuration. The inquiry form intentionally returns an honest delivery error until the email variables below are configured.

## Environment variables

| Variable | Purpose | Required for production |
| --- | --- | --- |
| `LEAD_RECIPIENT_EMAIL` | Receives new assessment requests; defaults to Solara's confirmed email | Yes |
| `LEAD_FROM_EMAIL` | Sender verified with the transactional email provider | Yes |
| `EMAIL_PROVIDER_API_KEY` | Server-only Resend API credential | Yes |
| `NEXT_PUBLIC_SITE_URL` | Final HTTPS origin for canonical, sitemap, robots, and structured data | Yes |
| `NEXT_PUBLIC_ANALYTICS_ID` | Reserved; analytics is not implemented or enabled | No |

Never commit `.env.local` or provider credentials. The lead adapter is isolated under `src/lib/email` so another provider can replace Resend without changing the form.

## Quality commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

`npm run lint` also runs a public-copy audit for prohibited claims. End-to-end tests expect a production build and cover mobile, tablet, and desktop browser sizes.

## Deployment

Deploy to a Node-compatible Next.js host such as Vercel using `npm run build` as the build command. Configure all required variables in the host's preview environment first. Verify the preview with the full command set and submit a real assessment; confirm that the message arrives at the approved recipient before promoting the same immutable build to production.

The in-memory rate limiter is practical for the MVP but applies per running instance. A distributed rate-limit service is the appropriate next step if traffic volume or abuse requires enforcement across multiple serverless instances.

## Rollback

Use the hosting provider's deployment history to restore the previous known-good immutable deployment. Re-check direct links and submit a real assessment after rollback. Do not roll back by deleting source files or overwriting the main branch.

## Project references

- Primary specification: [`docs/solara-mvp-build-prompt.md`](docs/solara-mvp-build-prompt.md)
- Condensed acceptance criteria: [`docs/MVP_SPEC.md`](docs/MVP_SPEC.md)
- Public-copy constraints: [`docs/CONTENT_TRUTH.md`](docs/CONTENT_TRUTH.md)
- Release and launch requirements: [`docs/RELEASE_CHECKLIST.md`](docs/RELEASE_CHECKLIST.md)
