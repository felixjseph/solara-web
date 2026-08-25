import { EmailConfigurationError, EmailDeliveryError } from "./types";
import type { LeadEmailAdapter, LeadNotification } from "./types";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function line(label: string, value?: string | boolean) {
  const safeValue = typeof value === "boolean" ? (value ? "Yes" : "No") : value || "Not provided";
  return `<tr><th align="left" style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(safeValue)}</td></tr>`;
}

export class ResendLeadEmailAdapter implements LeadEmailAdapter {
  async sendLead({ lead, submittedAt }: LeadNotification) {
    const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
    const from = process.env.LEAD_FROM_EMAIL;
    const to = process.env.LEAD_RECIPIENT_EMAIL || "solara.energy26@gmail.com";

    if (!apiKey || !from) {
      throw new EmailConfigurationError("Lead email delivery is not configured.");
    }

    const html = `
      <h1 style="font-family:Arial,sans-serif;color:#2f2f2f">New Solara assessment request</h1>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px">
        ${line("Submitted", submittedAt)}
        ${line("Source page", lead.sourcePage)}
        ${line("Full name", lead.fullName)}
        ${line("Mobile", lead.mobile)}
        ${line("Email", lead.email)}
        ${line("Cebu location", lead.location)}
        ${line("Property type", lead.propertyType)}
        ${line("Monthly bill range", lead.billRange)}
        ${line("Interested solution", lead.solution)}
        ${line("Preferred contact", lead.contactMethod)}
        ${line("Message", lead.message)}
        ${line("Inquiry consent", lead.consent)}
      </table>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email || undefined,
        subject: `Solar assessment request — ${lead.propertyType}`,
        html,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new EmailDeliveryError("The email provider rejected the lead notification.");
    }
  }
}
