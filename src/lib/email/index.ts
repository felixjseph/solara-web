import { ResendLeadEmailAdapter } from "./resend-adapter";
import type { LeadEmailAdapter } from "./types";

export function getLeadEmailAdapter(): LeadEmailAdapter {
  return new ResendLeadEmailAdapter();
}

export { EmailConfigurationError, EmailDeliveryError } from "./types";
