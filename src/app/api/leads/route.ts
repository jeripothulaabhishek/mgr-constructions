import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";
import { LeadData } from "@/types";

// Sliding window memory cache for simple API rate limiting
const ipCache = new Map<string, { count: number; lastReset: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown-ip";
    const now = Date.now();
    const limit = 5; // 5 submissions per minute maximum per IP
    const windowMs = 60 * 1000;

    // Maintenance cleanup if cache grows large
    if (ipCache.size > 1000) {
      for (const [cachedIp, rateData] of ipCache.entries()) {
        if (now - rateData.lastReset > 5 * 60 * 1000) {
          ipCache.delete(cachedIp);
        }
      }
    }

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
    if (body.website && typeof body.website === "string" && body.website.trim() !== "") {
      console.warn(`[Leads API] Honeypot triggered by bot submission.`);
      return NextResponse.json({ success: true, message: "Inquiry registered successfully." });
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

    // Input sanitization
    const sanitize = (val: string) => String(val).replace(/<\/?[^>]+(>|$)/g, "").trim();

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
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("[Leads API Router Error]:", errMessage);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

