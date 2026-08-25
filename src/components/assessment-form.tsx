"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  billRanges,
  contactMethods,
  leadInputFromFormData,
  leadSchema,
  propertyTypes,
  solutionInterests,
} from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site-config";
import { FacebookIcon, MailIcon, PhoneIcon } from "./icons";

type FieldErrors = Record<string, string[] | undefined>;
type SubmissionState = "idle" | "submitting" | "success" | "error";

function FieldError({ id, errors }: { id: string; errors: FieldErrors }) {
  const message = errors[id]?.[0];
  if (!message) return null;
  return <p id={`${id}-error`} className="field-error">{message}</p>;
}

function describedBy(id: string, errors: FieldErrors, helper?: string) {
  return [helper, errors[id] ? `${id}-error` : undefined].filter(Boolean).join(" ") || undefined;
}

export function AssessmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [propertyType, setPropertyType] = useState("");

  useEffect(() => {
    const requestedProperty = new URLSearchParams(window.location.search).get("property");
    if (propertyTypes.some((item) => item === requestedProperty)) {
      queueMicrotask(() => setPropertyType(requestedProperty || ""));
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const validation = leadSchema.safeParse(leadInputFromFormData(formData));

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      setState("error");
      setMessage("Please check the highlighted fields before sending your request.");
      requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    setErrors({});
    setState("submitting");
    setMessage("Sending your assessment request…");

    try {
      const response = await fetch("/api/leads", { method: "POST", body: formData });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        fields?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.fields || {});
        setState("error");
        setMessage(result.message || "We could not send your request. Please try again or contact Solara directly.");
        return;
      }

      setState("success");
      setMessage(result.message || "Your request was sent. Solara's team will review it and contact you.");
      form.reset();
      setPropertyType("");
    } catch {
      setState("error");
      setMessage("We could not connect to the form service. Your details remain in the form; please try again or contact Solara directly.");
    }
  }

  const invalid = (id: string) => Boolean(errors[id]);

  return (
    <div className="assessment-layout">
      <div className="assessment-intro">
        <span className="eyebrow eyebrow-light">Free solar assessment</span>
        <h2 id="assessment-heading">Let’s find the right starting point.</h2>
        <p>
          Tell us about the property and what you want solar to do. Solara will review the request before recommending a system.
        </p>
        <div className="contact-alternatives">
          <h3>Prefer to talk directly?</h3>
          <a href={siteConfig.phones[0].href}><PhoneIcon />{siteConfig.phones[0].display}</a>
          <a href={`mailto:${siteConfig.email}`}><MailIcon />{siteConfig.email}</a>
          <a href={siteConfig.facebook} target="_blank" rel="noreferrer"><FacebookIcon />Message on Facebook</a>
        </div>
        <p className="assessment-note">No bill upload or full street address is needed for this first conversation.</p>
      </div>

      <form ref={formRef} className="assessment-form" onSubmit={handleSubmit} noValidate aria-labelledby="assessment-heading">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="fullName">Full name <span aria-hidden="true">*</span></label>
            <input id="fullName" name="fullName" autoComplete="name" required aria-invalid={invalid("fullName")} aria-describedby={describedBy("fullName", errors)} />
            <FieldError id="fullName" errors={errors} />
          </div>
          <div className="field">
            <label htmlFor="mobile">Mobile number <span aria-hidden="true">*</span></label>
            <input id="mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={invalid("mobile")} aria-describedby={describedBy("mobile", errors)} />
            <FieldError id="mobile" errors={errors} />
          </div>
          <div className="field">
            <label htmlFor="email">Email <span className="optional">Optional</span></label>
            <input id="email" name="email" type="email" autoComplete="email" aria-invalid={invalid("email")} aria-describedby={describedBy("email", errors, "email-helper")} />
            <p id="email-helper" className="field-helper">Required if you choose email as your contact method.</p>
            <FieldError id="email" errors={errors} />
          </div>
          <div className="field">
            <label htmlFor="location">Cebu city or municipality <span aria-hidden="true">*</span></label>
            <input id="location" name="location" autoComplete="address-level2" required aria-invalid={invalid("location")} aria-describedby={describedBy("location", errors)} />
            <FieldError id="location" errors={errors} />
          </div>
          <div className="field">
            <label htmlFor="propertyType">Property type <span aria-hidden="true">*</span></label>
            <select id="propertyType" name="propertyType" value={propertyType} onChange={(event) => setPropertyType(event.target.value)} required aria-invalid={invalid("propertyType")} aria-describedby={describedBy("propertyType", errors)}>
              <option value="">Choose one</option>
              {propertyTypes.map((option) => <option key={option}>{option}</option>)}
            </select>
            <FieldError id="propertyType" errors={errors} />
          </div>
          <div className="field">
            <label htmlFor="billRange">Average monthly electricity bill <span aria-hidden="true">*</span></label>
            <select id="billRange" name="billRange" defaultValue="" required aria-invalid={invalid("billRange")} aria-describedby={describedBy("billRange", errors)}>
              <option value="">Choose a broad range</option>
              {billRanges.map((option) => <option key={option}>{option}</option>)}
            </select>
            <FieldError id="billRange" errors={errors} />
          </div>
          <div className="field">
            <label htmlFor="solution">Interested solution <span className="optional">Optional</span></label>
            <select id="solution" name="solution" defaultValue="">
              <option value="">Choose one</option>
              {solutionInterests.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="contactMethod">Preferred contact method <span aria-hidden="true">*</span></label>
            <select id="contactMethod" name="contactMethod" defaultValue="" required aria-invalid={invalid("contactMethod")} aria-describedby={describedBy("contactMethod", errors)}>
              <option value="">Choose one</option>
              {contactMethods.map((option) => <option key={option}>{option}</option>)}
            </select>
            <FieldError id="contactMethod" errors={errors} />
          </div>
          <div className="field field-full">
            <label htmlFor="message">What would you like help with? <span className="optional">Optional</span></label>
            <textarea id="message" name="message" rows={4} maxLength={1000} aria-invalid={invalid("message")} aria-describedby={describedBy("message", errors, "message-helper")} />
            <p id="message-helper" className="field-helper">Please do not include utility account numbers or other sensitive information.</p>
            <FieldError id="message" errors={errors} />
          </div>
        </div>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="company">Company website</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="sourcePage" value="/" />

        <div className="consent-field">
          <input id="consent" name="consent" type="checkbox" value="true" required aria-invalid={invalid("consent")} aria-describedby={describedBy("consent", errors, "consent-copy")} />
          <div>
            <label id="consent-copy" htmlFor="consent">
              I agree that Solara may use these details to respond to my inquiry and prepare an assessment or quotation. <span aria-hidden="true">*</span>
            </label>
            <p>Read the <Link href="/privacy">privacy notice</Link>.</p>
            <FieldError id="consent" errors={errors} />
          </div>
        </div>

        {state !== "idle" && (
          <div className={`form-status form-status-${state}`} role={state === "error" ? "alert" : "status"} aria-live="polite">
            <strong>{state === "success" ? "Request sent" : state === "error" ? "Request not sent" : "Sending request"}</strong>
            <p>{message}</p>
            {state === "error" && <p>You can still call, email, or message Solara using the direct options beside this form.</p>}
          </div>
        )}

        <button className="button form-submit" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Request My Free Assessment"}
        </button>
        <p className="required-note"><span aria-hidden="true">*</span> Required fields</p>
      </form>
    </div>
  );
}
