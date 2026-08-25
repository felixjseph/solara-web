import { z } from "zod";

export const propertyTypes = [
  "Residential",
  "Commercial",
  "Industrial",
  "Agricultural",
  "Other",
] as const;

export const billRanges = [
  "Below ₱5,000",
  "₱5,000–₱15,000",
  "₱15,000–₱30,000",
  "₱30,000–₱60,000",
  "Above ₱60,000",
] as const;

export const solutionInterests = [
  "Not sure",
  "Grid-tied",
  "Hybrid",
  "Off-grid",
  "Battery backup",
  "Maintenance or repair",
  "Net-metering assistance",
] as const;

export const contactMethods = ["Call", "SMS", "Email", "Facebook Messenger"] as const;

const optionalEmail = z
  .string()
  .trim()
  .max(254, "Email is too long.")
  .refine((value) => !value || z.email().safeParse(value).success, "Enter a valid email address.");

export const leadSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name.").max(100),
    mobile: z
      .string()
      .trim()
      .min(7, "Enter a valid mobile number.")
      .max(30)
      .regex(/^[+\d][\d\s()-]+$/, "Enter a valid mobile number."),
    email: optionalEmail,
    location: z.string().trim().min(2, "Enter your Cebu city or municipality.").max(100),
    propertyType: z.enum(propertyTypes, { error: "Choose a property type." }),
    billRange: z.enum(billRanges, { error: "Choose an electricity-bill range." }),
    solution: z.enum(solutionInterests).optional().or(z.literal("")),
    contactMethod: z.enum(contactMethods, { error: "Choose a preferred contact method." }),
    message: z.string().trim().max(1000, "Keep your message under 1,000 characters.").optional(),
    consent: z.literal(true, { error: "Consent is required to submit this request." }),
    company: z.string().max(0).optional(),
    sourcePage: z.string().trim().max(120).startsWith("/").default("/"),
  })
  .superRefine((data, context) => {
    if (data.contactMethod === "Email" && !data.email) {
      context.addIssue({
        code: "custom",
        path: ["email"],
        message: "Email is required when email is your preferred contact method.",
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;

export function leadInputFromFormData(formData: FormData) {
  return {
    fullName: formData.get("fullName"),
    mobile: formData.get("mobile"),
    email: formData.get("email") || "",
    location: formData.get("location"),
    propertyType: formData.get("propertyType"),
    billRange: formData.get("billRange"),
    solution: formData.get("solution") || "",
    contactMethod: formData.get("contactMethod"),
    message: formData.get("message") || "",
    consent: formData.get("consent") === "true",
    company: formData.get("company") || "",
    sourcePage: formData.get("sourcePage") || "/",
  };
}
