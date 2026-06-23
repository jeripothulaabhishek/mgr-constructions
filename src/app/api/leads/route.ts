import { NextResponse } from "next/server";
import { submitLead, LeadData } from "@/lib/leads";

// Sliding window memory cache for simple API rate limiting
const ipCache = new Map<string, { count: number; lastReset: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown-ip";
    const now = Date.now();
    const limit = 5; // 5 submissions per minute maximum per IP
    const windowMs = 60 * 1000;

    // Rate limiter check
    const rateData = ipCache.get(ip) || { count: 0, lastReset: now };
    if (now - rateData.lastReset > windowMs) {
      rateData.count = 0;
      rateData.lastReset = now;
    }

    if (rateData.count >= limit) {
      console.warn(`[Leads API] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Please wait 60 seconds before resubmitting." },
        { status: 429 }
      );
    }

    rateData.count++;
    ipCache.set(ip, rateData);

    const body = await request.json();

    // 1. Honeypot check
    // If the hidden 'website' field is populated, we suspect a bot and ignore/simulate success.
    if (body.website && body.website.trim() !== "") {
      console.warn(`[Leads API] Honeypot triggered by bot submission.`);
      return NextResponse.json({ success: true, message: "Inquiry registered successfully (sandbox mode)." });
    }

    // 2. Turnstile Verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    const turnstileToken = body.turnstileToken;

    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json(
          { success: false, error: "Security validation token is missing." },
          { status: 400 }
        );
      }

      try {
        const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: turnstileToken,
          }),
        });

        const verifyData = await verifyResponse.json();
        if (!verifyData.success) {
          console.warn(`[Leads API] Turnstile validation failed:`, verifyData["error-codes"]);
          return NextResponse.json(
            { success: false, error: "Security validation check failed. Please refresh and try again." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("[Leads API] Turnstile fetch error:", err);
        // Fallback: let the request through if the Cloudflare API is physically down, to prevent losing genuine leads
      }
    }

    // Basic Input Validation
    const { name, email, phone, source } = body;
    if (!name || !email || !phone || !source) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, email, phone, source)" },
        { status: 400 }
      );
    }

    // Input sanitization: Strip basic HTML tags to block content script injections
    const sanitize = (val: string) => val.replace(/<\/?[^>]+(>|$)/g, "").trim();

    const leadData: LeadData = {
      name: sanitize(name),
      email: sanitize(email).toLowerCase(),
      phone: sanitize(phone),
      message: body.message ? sanitize(body.message) : "",
      source,
      metadata: body.metadata || {},
    };

    const result = await submitLead(leadData);

    if (result.success) {
      return NextResponse.json({ success: true, message: result.message });
    } else {
      return NextResponse.json({ success: false, error: result.message }, { status: 500 });
    }
  } catch (error: any) {
    console.error("[Leads API Router Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
