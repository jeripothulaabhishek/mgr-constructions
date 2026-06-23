"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, ArrowUp, Check, Loader2 } from "lucide-react";
import { COMPANY } from "@/config/company";
import { FOOTER_QUICK_LINKS, FOOTER_LEGAL_LINKS } from "@/config/navigation";
import { SOCIALS } from "@/config/socials";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let checkTurnstile = setInterval(() => {
      if ((window as any).turnstile) {
        clearInterval(checkTurnstile);
        try {
          (window as any).turnstile.render("#turnstile-newsletter", {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
            callback: (token: string) => {
              setTurnstileToken(token);
            },
          });
        } catch (e) {
          // Already rendered
        }
      }
    }, 500);

    return () => clearInterval(checkTurnstile);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0], // Extract guest name from email prefix
          email: email,
          phone: "9999999999", // Stand-in number for database schema validation
          source: "newsletter",
          website: honeypot,
          turnstileToken: turnstileToken,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setSuccess(true);
        setEmail("");
        setHoneypot("");
        setTurnstileToken(null);
        setTimeout(() => {
          setSuccess(false);
          if ((window as any).turnstile) {
            (window as any).turnstile.reset("#turnstile-newsletter");
          }
        }, 3000);
      } else {
        setErrorMsg(resData.error || "Subscription failed.");
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setErrorMsg("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-alternate border-t border-border-accent pt-20 pb-10 text-text-muted font-sans relative">
      {/* Scroll to Top Circle Button */}
      <button
        onClick={handleScrollToTop}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gold hover:bg-text-main text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
      </button>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Profile */}
        <div className="flex flex-col space-y-5 text-left">
          <Link href="/" className="flex flex-col w-max">
            <span className="text-2xl font-bold tracking-wider text-text-main uppercase font-headings">
              MGR
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-bold">
              DEVELOPERS
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-text-muted">
            {COMPANY.tagline}. Crafting landmark, Vastu-compliant luxury residential spaces in Manikonda, Tarnaka, and premium neighborhoods of Hyderabad.
          </p>
          <div className="flex items-center space-x-3">
            {Object.entries(SOCIALS).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-border-accent flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-all capitalize text-[10px] font-bold"
                aria-label={`Link to ${key}`}
              >
                {key.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="text-left">
          <h3 className="text-xs font-bold text-text-main uppercase tracking-wider mb-6 font-headings">
            Navigation
          </h3>
          <ul className="space-y-3.5">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-text-muted hover:text-gold transition-colors hover:pl-1 duration-200 block font-semibold uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div className="flex flex-col space-y-5 text-left">
          <h3 className="text-xs font-bold text-text-main uppercase tracking-wider mb-1 font-headings">
            Corporate Office
          </h3>
          <ul className="space-y-4 text-xs text-text-muted font-medium">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span className="leading-relaxed">{COMPANY.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-gold transition-colors">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-gold transition-colors">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter subscription */}
        <div className="text-left">
          <h3 className="text-xs font-bold text-text-main uppercase tracking-wider mb-6 font-headings">
            Private Registry
          </h3>
          <p className="text-xs text-text-muted mb-4 leading-relaxed font-light">
            Subscribe to receive exclusive priority updates on launching residences, pricing benchmarks, and joint venture allocations.
          </p>
          {success ? (
            <div className="py-4 flex items-center gap-2 text-emerald-600 text-xs font-semibold">
              <Check className="w-4 h-4 animate-bounce" />
              <span>Added to private registry!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative mt-2 flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 bg-white border border-border-accent rounded-lg text-xs text-text-main placeholder-text-muted/40 focus:outline-none focus:border-gold transition-colors pr-12 font-sans"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1 top-1 w-10 h-10 bg-gold hover:bg-text-main text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Submit newsletter"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Honeypot field for bot filtering */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Cloudflare Turnstile Verification */}
              <div id="turnstile-newsletter" className="flex justify-start scale-75 origin-left h-8 overflow-hidden"></div>

              {errorMsg && (
                <span className="text-[10px] text-red-500 font-medium block mt-0.5">{errorMsg}</span>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border-accent flex flex-col md:flex-row items-center justify-between text-[11px] text-text-muted/60 font-sans gap-4">
        <div className="text-left">
          <p>© {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved.</p>
          <p className="mt-1 text-[10px] text-text-muted/40">{COMPANY.license} | GSTIN: {COMPANY.gstin}</p>
        </div>
        <div className="flex items-center space-x-6 font-semibold uppercase tracking-wider text-[10px]">
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-gold transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
