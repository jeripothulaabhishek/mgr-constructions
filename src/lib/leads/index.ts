import { LeadData, LeadSubmitResponse } from "@/types";

export type { LeadData, LeadSubmitResponse };

/**
 * Handles lead submission and routes to configured provider.
 * Supports environment configurations:
 * - LEAD_PROVIDER: 'console' | 'webhook' | 'resend'
 * - LEAD_WEBHOOK_URL: Webhook destination URL for CRM / Automation integrations
 */
export async function submitLead(data: LeadData): Promise<LeadSubmitResponse> {
  const provider = (process.env.LEAD_PROVIDER || "console").toLowerCase();
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const timestamp = new Date().toISOString();

  // Always log structured lead entries on the server
  console.log(`[Lead Service] [${timestamp}] Source: "${data.source}" | Name: "${data.name}" | Email: "${data.email}" | Phone: "${data.phone}"`);

  // Webhook routing if configured
  if (provider === "webhook" || webhookUrl) {
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, submittedAt: timestamp }),
        });

        if (!response.ok) {
          console.error(`[Lead Service] Webhook dispatch failed with status: ${response.status}`);
          return {
            success: false,
            message: "Failed to transmit lead to external CRM endpoint.",
          };
        }
      } catch (error) {
        console.error("[Lead Service] Webhook fetch error:", error);
        return {
          success: false,
          message: "Lead submission service temporary error.",
        };
      }
    }
  }

  return {
    success: true,
    message: "Thank you for contacting Prime Estates. Your inquiry has been registered successfully.",
  };
}

