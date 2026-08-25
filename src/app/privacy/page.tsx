import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Solara handles information submitted through the solar assessment inquiry form.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page">
      <div className="container legal-layout">
        <aside className="legal-aside">
          <span className="eyebrow">Inquiry privacy</span>
          <h1>Privacy notice</h1>
          <p>Operational draft for Solara’s solar assessment and quotation inquiry form.</p>
          <Link className="text-link" href="/#contact">Return to the assessment form</Link>
        </aside>
        <article className="legal-content">
          <p className="legal-updated">Effective for the website MVP • Last updated August 25, 2026</p>
          <section>
            <h2>What this notice covers</h2>
            <p>This notice explains how Solara receives and uses the information you choose to submit through the website’s solar assessment form. The form is for inquiries and quotations; it is separate from any future marketing consent.</p>
          </section>
          <section>
            <h2>Information collected</h2>
            <p>The form collects your name, mobile number, optional email address, Cebu city or municipality, property type, broad electricity-bill range, solution interest, preferred contact method, and any message you add. Email becomes required only when you choose email as your preferred contact method.</p>
            <p>Please do not submit a full street address, utility account number, government ID, payment information, or other sensitive information through this form.</p>
          </section>
          <section>
            <h2>Why Solara uses it</h2>
            <p>Solara uses the information to understand your inquiry, contact you using your selected method, discuss a possible assessment, prepare or follow up on a quotation, maintain legitimate business records, and meet applicable legal obligations.</p>
          </section>
          <section>
            <h2>How it is received and who may access it</h2>
            <p>The website validates the form and sends the inquiry to Solara through a configured email-delivery provider. Authorized Solara team members who handle inquiries, assessments, quotations, and support may access it. Technical providers involved in website hosting or email delivery may process the information only as needed to provide those services and under their applicable terms.</p>
          </section>
          <section>
            <h2>Retention</h2>
            <p>Inquiry information is retained only as needed to respond, prepare and follow up on an assessment or quotation, maintain legitimate business records, and comply with legal obligations. Solara must approve a precise retention schedule before production launch.</p>
          </section>
          <section>
            <h2>Your choices and privacy rights</h2>
            <p>You may ask about the information Solara holds about your inquiry, request correction, object to or restrict certain processing, or request deletion where applicable. Some information may need to be retained when required by law or for legitimate records. Applicable rights can depend on the circumstances and Philippine privacy law.</p>
          </section>
          <section>
            <h2>Cookies and analytics</h2>
            <p>The MVP does not enable marketing cookies, advertising pixels, session replay, or invasive tracking. Analytics remains disabled unless Solara approves a configuration and updates this notice accordingly.</p>
          </section>
          <section>
            <h2>Contact about privacy</h2>
            <p>For a privacy question or request, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Solara will confirm the formal legal business identity, privacy contact, and exact retention schedule before production launch.</p>
          </section>
          <aside className="legal-note"><strong>Important:</strong> This plain-language notice is an operational draft for the MVP and is not presented as legal advice or proof of legal review.</aside>
        </article>
      </div>
    </main>
  );
}
