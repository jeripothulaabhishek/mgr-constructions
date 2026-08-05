export interface LeadData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: 'cost_calculator' | 'contact' | 'site_visit' | 'jv_consultation' | 'lead_magnet' | 'newsletter';
  metadata?: Record<string, any>;
}

export async function submitLead(data: LeadData): Promise<{ success: boolean; message: string }> {
  console.log(`[Lead Service Prototype] Demo inquiry recorded from source "${data.source}":`, data);
  
  // Instant demo response for client portfolio showcase
  return {
    success: true,
    message: "Inquiry recorded in demo registry. Thank you for contacting Prime Estates.",
  };
}
