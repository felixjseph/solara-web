import { describe, expect, it } from "vitest";
import { leadSchema } from "@/lib/lead-schema";

const validLead = {
  fullName: "Ana Santos",
  mobile: "+63 917 123 4567",
  email: "",
  location: "Cebu City",
  propertyType: "Residential",
  billRange: "₱5,000–₱15,000",
  solution: "Not sure",
  contactMethod: "Call",
  message: "I would like to understand my options.",
  consent: true,
  company: "",
  sourcePage: "/",
} as const;

describe("leadSchema", () => {
  it("accepts a complete assessment request", () => {
    expect(leadSchema.safeParse(validLead).success).toBe(true);
  });

  it("requires email when email is the preferred contact method", () => {
    const result = leadSchema.safeParse({ ...validLead, contactMethod: "Email" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.email?.[0]).toMatch(/required/i);
  });

  it("requires inquiry consent", () => {
    const result = leadSchema.safeParse({ ...validLead, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.consent?.[0]).toMatch(/required/i);
  });

  it("rejects unexpected bill range values", () => {
    expect(leadSchema.safeParse({ ...validLead, billRange: "Exact amount" }).success).toBe(false);
  });
});
