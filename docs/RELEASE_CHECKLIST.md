# Solara MVP Release Checklist

## Current release status

The website build is deployment-ready and all local automated gates pass. Production launch remains blocked until the final domain and email-provider environment variables are configured, a real deployed form submission is received successfully, and the client confirms the privacy identity/contact/retention items below.

## Automated release gates

- [x] Reproducible dependency install succeeds with `npm ci`.
- [x] `npm run lint` passes, including the content-truth audit.
- [x] `npm run typecheck` passes.
- [x] `npm test` passes.
- [x] `npm run build` passes.
- [x] `npm run test:e2e` passes at mobile, tablet, and desktop widths.

## Deployment configuration

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
- [ ] Set `LEAD_RECIPIENT_EMAIL` to the approved recipient.
- [ ] Set `LEAD_FROM_EMAIL` to a sender verified by the email provider.
- [ ] Set `EMAIL_PROVIDER_API_KEY` in the hosting platform; never commit it.
- [ ] Leave `NEXT_PUBLIC_ANALYTICS_ID` empty unless analytics and the privacy disclosure are approved.
- [ ] Submit a real assessment from the deployment and confirm receipt, formatting, and reply details.

## Client confirmations before production launch

- [ ] Confirm the legal business identity that should appear in the privacy notice.
- [ ] Confirm the formal privacy contact.
- [ ] Approve a precise inquiry-data retention schedule.
- [ ] Confirm final production domain and ownership.
- [ ] Confirm product-brand spellings and permission to display any future logo artwork.

## Manual launch review

- [x] Test the header, anchors, form, privacy link, phone links, email link, and Facebook link in mobile browser emulation.
- [x] Test keyboard navigation, visible focus, form errors, and reduced-motion behavior.
- [x] Check production-like Lighthouse results against the stated targets.
- [ ] Verify sitemap, robots, canonical URL, social metadata, and structured data on the final domain.
- [ ] Confirm no personal lead data appears in hosting logs.

## Deployment and rollback

Create a preview deployment from the verified commit, configure preview environment variables, and run the full checks against that URL. Promote only that verified build to production. To roll back, use the host's deployment history to restore the last known-good immutable deployment, then repeat the real form-delivery check.

## First post-launch review

Within the first operating review, confirm form delivery, mobile behavior, search indexing, lead quality, and any delivery errors. Keep analytics disabled until explicitly approved.
