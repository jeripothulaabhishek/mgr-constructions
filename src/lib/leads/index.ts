export interface LeadData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: 'cost_calculator' | 'contact' | 'site_visit' | 'jv_consultation' | 'lead_magnet' | 'newsletter';
  metadata?: Record<string, any>;
}

export async function submitLead(data: LeadData): Promise<{ success: boolean; message: string }> {
  console.log(`[Lead Service] Processing new lead from source "${data.source}":`, data);

  const sheetsUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
  const resendKey = process.env.RESEND_API_KEY;

  const results: string[] = [];
  let sheetsSuccess = true;
  let resendAdminSuccess = true;
  let resendCustomerSuccess = true;

  // 1. Append to Google Sheets Webhook
  if (sheetsUrl) {
    try {
      const success = await submitToGoogleSheets(sheetsUrl, data);
      if (success) {
        results.push("Google Sheets synced");
      } else {
        sheetsSuccess = false;
        results.push("Google Sheets webhook rejected submission");
      }
    } catch (err: any) {
      sheetsSuccess = false;
      console.error("[Lead Service] Google Sheets error:", err);
      results.push(`Google Sheets failed (${err.message || err})`);
    }
  } else {
    console.log("[Lead Service Sandbox] GOOGLE_SHEETS_SCRIPT_URL missing, logging sheets append locally.");
    results.push("Google Sheets simulated");
  }

  // 2. Dispatch Admin Notification & Customer Confirmation via Resend
  if (resendKey) {
    // Admin Alert Email
    try {
      await sendAdminEmail(resendKey, data);
      results.push("Admin notified via Resend");
    } catch (err: any) {
      resendAdminSuccess = false;
      console.error("[Lead Service] Resend Admin notification error:", err);
      results.push(`Admin email failed (${err.message || err})`);
    }

    // Customer Confirmation Email
    try {
      await sendCustomerEmail(resendKey, data);
      results.push("Customer welcomed via Resend");
    } catch (err: any) {
      resendCustomerSuccess = false;
      console.error("[Lead Service] Resend Customer confirmation error:", err);
      results.push(`Customer email failed (${err.message || err})`);
    }
  } else {
    console.log("[Lead Service Sandbox] RESEND_API_KEY missing, logging email alerts locally.");
    results.push("Resend notifications simulated");
  }

  // Overall success determination (allow local simulation to succeed)
  const isOk = sheetsSuccess && resendAdminSuccess && resendCustomerSuccess;

  return {
    success: isOk,
    message: results.join(", ") + (isOk ? " successfully." : " with partial failures."),
  };
}

// Helper: Post payload to Google Apps Script Webhook
async function submitToGoogleSheets(webhookUrl: string, data: LeadData): Promise<boolean> {
  const payload = {
    date: new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }) + " " + new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
    name: data.name,
    email: data.email,
    phone: data.phone,
    source: data.source,
    message: data.message || "",
    metadata: data.metadata ? JSON.stringify(data.metadata) : "",
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.ok;
}

// Helper: Dispatch Resend Admin Alert
async function sendAdminEmail(apiKey: string, data: LeadData) {
  const toEmail = process.env.NOTIFICATION_EMAIL || "info@mgrconstructions.in";
  const dateStr = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }) + " " + new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "MGR Leads <leads@mgrconstructions.in>",
      to: [toEmail],
      subject: `New Lead: [${data.source.toUpperCase()}] - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1c1e; max-width: 600px; margin: 0 auto; border: 1px solid #e7dfd0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="background-color: #FAF8F4; padding: 24px; border-bottom: 1px solid #e7dfd0; text-align: center;">
            <h2 style="color: #c9a227; margin: 0; font-size: 20px; letter-spacing: 1px; text-transform: uppercase;">MGR Constructions</h2>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #606468; text-transform: uppercase; font-weight: bold; letter-spacing: 1.5px;">New Inquiry Received</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #606468; width: 130px; border-bottom: 1px solid #FAF8F4;">Name</td>
                <td style="padding: 8px 0; color: #1a1c1e; border-bottom: 1px solid #FAF8F4;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #606468; border-bottom: 1px solid #FAF8F4;">Phone</td>
                <td style="padding: 8px 0; color: #1a1c1e; border-bottom: 1px solid #FAF8F4;"><a href="tel:${data.phone}" style="color: #c9a227; text-decoration: none;">${data.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #606468; border-bottom: 1px solid #FAF8F4;">Email</td>
                <td style="padding: 8px 0; color: #1a1c1e; border-bottom: 1px solid #FAF8F4;"><a href="mailto:${data.email}" style="color: #c9a227; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #606468; border-bottom: 1px solid #FAF8F4;">Lead Source</td>
                <td style="padding: 8px 0; color: #1a1c1e; border-bottom: 1px solid #FAF8F4; text-transform: uppercase; font-weight: bold; font-size: 11px; color: #c9a227;">${data.source.replace("_", " ")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #606468; border-bottom: 1px solid #FAF8F4;">Message</td>
                <td style="padding: 8px 0; color: #1a1c1e; border-bottom: 1px solid #FAF8F4;">${data.message || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #606468; border-bottom: 1px solid #FAF8F4;">Date & Time</td>
                <td style="padding: 8px 0; color: #1a1c1e; border-bottom: 1px solid #FAF8F4; font-family: monospace;">${dateStr}</td>
              </tr>
              ${data.metadata ? `
              <tr>
                <td style="padding: 12px 0 8px 0; font-weight: bold; color: #606468; vertical-align: top;">Metadata Specs</td>
                <td style="padding: 12px 0 8px 0; color: #606468; font-size: 11px;">
                  <pre style="margin: 0; background-color: #FAF8F4; padding: 10px; border-radius: 4px; border: 1px solid #e7dfd0; font-family: monospace;">${JSON.stringify(data.metadata, null, 2)}</pre>
                </td>
              </tr>` : ""}
            </table>
          </div>
          <div style="background-color: #FAF8F4; padding: 16px; border-top: 1px solid #e7dfd0; text-align: center; font-size: 10px; color: #606468;">
            Sent automatically from MGR Constructions lead portal.
          </div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend Admin API error: ${errText}`);
  }
}

// Helper: Dispatch Resend Customer welcome verification
async function sendCustomerEmail(apiKey: string, data: LeadData) {
  const customerName = data.name;
  const customerEmail = data.email;

  let headerTitle = "Thank You For Reaching Out";
  let greetingText = `Thank you for contacting MGR Constructions. We have successfully received your inquiry regarding our premium developments in Hyderabad.`;
  let nextStepsHtml = "";

  if (data.source === "newsletter") {
    headerTitle = "Welcome to Our Private Registry";
    greetingText = `Thank you for subscribing to the MGR Constructions private registry. You will now receive priority updates regarding launching gated communities, pricing worksheets, and Joint Venture availability.`;
  } else if (data.source === "cost_calculator") {
    headerTitle = "Your Construction Estimate Report";
    greetingText = `Thank you for using the MGR Cost Estimator. Your primary structural worksheet has been compiled. Below is a summary of the calculations for your upcoming residential build.`;
    
    const meta = data.metadata || {};
    const cost = meta.areaInSqFt * (meta.qualityLevel === "classic" ? 2000 : meta.qualityLevel === "premium" ? 2500 : 3300) * (meta.structureType === "villa" ? 1.0 : meta.structureType === "apartment" ? 0.95 : 0.75);

    nextStepsHtml = `
      <div style="background-color: #FAF8F4; border: 1px solid #e7dfd0; border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 13px;">
        <h4 style="margin: 0 0 10px 0; color: #c9a227; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;">Estimation Summary</h4>
        <p style="margin: 4px 0;"><strong>Structure Type:</strong> ${meta.structureType ? meta.structureType.toUpperCase() : "N/A"}</p>
        <p style="margin: 4px 0;"><strong>Quality Spec Level:</strong> ${meta.qualityLevel ? meta.qualityLevel.toUpperCase() : "N/A"}</p>
        <p style="margin: 4px 0;"><strong>Calculated Area:</strong> ${meta.inputArea ? meta.inputArea.toLocaleString() : "N/A"} ${meta.unitType || "Sq.Ft."}</p>
        <p style="margin: 8px 0 0 0; border-top: 1px dashed #e7dfd0; padding-top: 8px; font-size: 14px; color: #1a1c1e;"><strong>Estimated Budget:</strong> <span style="color: #c9a227; font-weight: bold;">₹${Math.round(cost || 0).toLocaleString("en-IN")}</span></p>
      </div>
    `;
  } else if (data.source === "lead_magnet") {
    headerTitle = "Your Valuation Guide Download";
    greetingText = `Thank you for requesting the MGR Hyderabad Construction Cost Guide. We have initiated the download on your browser. Please find a summary of the guide attached below for your reference.`;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "MGR Customer Support <support@mgrconstructions.in>",
      to: [customerEmail],
      subject: `Thank You For Contacting MGR Constructions`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1c1e; max-width: 600px; margin: 0 auto; border: 1px solid #e7dfd0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="background-color: #FAF8F4; padding: 32px 24px; border-bottom: 1px solid #e7dfd0; text-align: center;">
            <span style="font-size: 9px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #c9a227; display: block; margin-bottom: 8px;">MGR Developers</span>
            <h2 style="color: #1a1c1e; margin: 0; font-size: 22px; text-transform: uppercase; font-family: Georgia, serif; letter-spacing: 0.5px;">${headerTitle}</h2>
          </div>
          <div style="padding: 32px 24px; background-color: #ffffff; font-size: 13px; color: #606468;">
            <p style="margin-top: 0; font-size: 14px; color: #1a1c1e;">Dear ${customerName},</p>
            <p>${greetingText}</p>
            
            ${nextStepsHtml}

            <p style="margin-bottom: 24px;">Our communication desk is vetting your specifications and we will assign a dedicated real estate consultant to contact you within 24 hours.</p>
            
            <div style="border-top: 1px solid #FAF8F4; padding-top: 20px; margin-top: 24px;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #1a1c1e; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Quick Actions</p>
              <table style="width: 100%;">
                <tr>
                  <td style="width: 50%; padding-right: 8px;">
                    <a href="https://wa.me/917569664945?text=Hi%20MGR%20Constructions,%20I'm%20interested%20in%20a%20site%20visit." target="_blank" style="display: block; text-align: center; background-color: #25d366; color: #ffffff; text-decoration: none; padding: 12px 16px; border-radius: 6px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Chat on WhatsApp</a>
                  </td>
                  <td style="width: 50%; padding-left: 8px;">
                    <a href="tel:+917569664945" style="display: block; text-align: center; background-color: #c9a227; color: #ffffff; text-decoration: none; padding: 12px 16px; border-radius: 6px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Call Support</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div style="background-color: #FAF8F4; padding: 24px; border-top: 1px solid #e7dfd0; text-align: center; font-size: 11px; color: #606468;">
            <p style="margin: 0 0 4px 0; font-weight: bold; color: #1a1c1e; text-transform: uppercase;">MGR Constructions Private Limited</p>
            <p style="margin: 0; font-size: 10px; color: #606468;">Plot No. 42, 3rd Floor, Golden Heights Colony, Manikonda, Hyderabad, 500089</p>
          </div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend Customer API error: ${errText}`);
  }
}
