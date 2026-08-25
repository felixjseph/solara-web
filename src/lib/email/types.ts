import type { LeadInput } from "@/lib/lead-schema";

export type LeadNotification = {
  lead: LeadInput;
  submittedAt: string;
};

export interface LeadEmailAdapter {
  sendLead(notification: LeadNotification): Promise<void>;
}

export class EmailConfigurationError extends Error {}
export class EmailDeliveryError extends Error {}
