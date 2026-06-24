"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Mail, Phone, MapPin, Send, Loader2, FileCheck, Calendar, FileDown, MessageSquare } from "lucide-react";
import { COMPANY } from "@/config/company";
import { CONTACT_CONFIG } from "@/config/contact";

function MagneticButton({ children, onClick, className, type = "button" }: { children: React.ReactNode; onClick?: () => void; className?: string; type?: "button" | "submit" }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
      }}
      className={className}
    >
      {children}
    </button>
  );
}

const contactSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  message: zod.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = zod.infer<typeof contactSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    let checkTurnstile = setInterval(() => {
      if ((window as any).turnstile) {
        clearInterval(checkTurnstile);
        try {
          (window as any).turnstile.render("#turnstile-contact", {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "contact",
          website: honeypot,
          turnstileToken: turnstileToken,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setSuccess(true);
        setHoneypot("");
        setTurnstileToken(null);
        setTimeout(() => {
          setSuccess(false);
          reset();
          if ((window as any).turnstile) {
            (window as any).turnstile.reset("#turnstile-contact");
          }
        }, 3000);
      } else {
        setErrorMsg(resData.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Contact submission error:", error);
      setErrorMsg("Submission error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-transparent relative overflow-hidden z-30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="luxury-label text-gold block">
            Direct Communication Desk
          </span>
          <h2 className="luxury-title text-text-main mt-3 font-headings uppercase">
            Connect With Our Desk
          </h2>
          <p className="luxury-paragraph text-text-muted mt-4 font-light">
            Instantly download pricing brochures, schedule VIP site drives, or chat directly with our sales directors.
          </p>
        </div>

        {/* Premium CTA Quick Links (Visible Immediately) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 z-30 relative">
          {/* Site Visit */}
          <MagneticButton
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-site-visit"));
              }
            }}
            className="flex items-center justify-center gap-3 p-5 bg-white border border-border-accent/60 rounded-2xl hover:border-gold/50 cursor-pointer transition-all duration-300 shadow-md group text-left w-full btn-luxury-shimmer"
          >
            <Calendar className="w-5 h-5 text-gold shrink-0 animate-[pulse-slow_3s_infinite]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted/60">Site Tour</span>
              <span className="text-[11px] font-extrabold uppercase font-headings text-text-main">Book Site Visit</span>
            </div>
          </MagneticButton>
          
          {/* WhatsApp */}
          <a
            href={CONTACT_CONFIG.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-5 bg-white border border-border-accent/60 rounded-2xl hover:border-emerald-600/50 transition-all duration-300 shadow-md group text-left w-full decoration-none btn-luxury-shimmer"
          >
            <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted/60">Instant Chat</span>
              <span className="text-[11px] font-extrabold uppercase font-headings text-text-main">WhatsApp</span>
            </div>
          </a>

          {/* Call Support */}
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center justify-center gap-3 p-5 bg-white border border-border-accent/60 rounded-2xl hover:border-gold/50 transition-all duration-300 shadow-md group text-left w-full decoration-none btn-luxury-shimmer"
          >
            <Phone className="w-5 h-5 text-gold shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted/60">Direct Line</span>
              <span className="text-[11px] font-extrabold uppercase font-headings text-text-main">Call Sales Team</span>
            </div>
          </a>

          {/* Brochure Download */}
          <MagneticButton
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-cost-guide"));
              }
            }}
            className="flex items-center justify-center gap-3 p-5 bg-white border border-border-accent/60 rounded-2xl hover:border-gold/50 cursor-pointer transition-all duration-300 shadow-md group text-left w-full btn-luxury-shimmer"
          >
            <FileDown className="w-5 h-5 text-gold shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted/60">PDF Guide</span>
              <span className="text-[11px] font-extrabold uppercase font-headings text-text-main">Download Brochure</span>
            </div>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-5 z-30">
            <div className="glass-card rounded-3xl p-8 md:p-10 border border-border-accent shadow-lg relative h-full bg-white/40 backdrop-blur-md">
              <div className="text-left mb-8">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold block font-sans">
                  COMMUNICATION DESK
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-text-main mt-2 font-headings uppercase">
                  Schedule Site Tour
                </h2>
              </div>

              {success ? (
                <div className="py-16 flex flex-col items-center justify-center text-center font-sans">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4 shadow-sm animate-pulse">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-emerald-500 font-bold uppercase tracking-wider text-xs font-headings">
                    Inquiry Recorded!
                  </h4>
                  <p className="text-xs text-text-muted mt-2 max-w-xs leading-relaxed font-light">
                    Thank you. We have recorded your submission. Our customer desk will reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left text-xs">
                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      placeholder="e.g., Gopal Reddy"
                      {...register("name")}
                      className="w-full px-4 py-3 bg-white/50 border border-border-accent/80 rounded-lg text-text-main focus:outline-none focus:border-gold focus:bg-white/80 transition-all duration-300"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 mt-0.5">{errors.name.message}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="contact-phone" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        placeholder="10-digit number"
                        maxLength={10}
                        {...register("phone")}
                        className="w-full px-4 py-3 bg-white/50 border border-border-accent/80 rounded-lg text-text-main focus:outline-none focus:border-gold focus:bg-white/80 transition-all duration-300"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-500 mt-0.5">{errors.phone.message}</span>
                      )}
                    </div>
                    {/* Email */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        placeholder="name@email.com"
                        {...register("email")}
                        className="w-full px-4 py-3 bg-white/50 border border-border-accent/80 rounded-lg text-text-main focus:outline-none focus:border-gold focus:bg-white/80 transition-all duration-300"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 mt-0.5">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Inquiry Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Write your home layout preferences, Vastu configurations, or site tour dates..."
                      {...register("message")}
                      className="w-full px-4 py-3 bg-white/50 border border-border-accent/80 rounded-lg text-text-main focus:outline-none focus:border-gold focus:bg-white/80 transition-all duration-300 resize-none"
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-500 mt-0.5">{errors.message.message}</span>
                    )}
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
                  <div className="flex justify-center py-1">
                    <div id="turnstile-contact"></div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[11px] font-medium leading-relaxed">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gold text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-text-main transition-all duration-300 shadow-md hover:shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting Message...
                      </>
                    ) : (
                      <>
                        Transmit Query
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Central Spacer (opens space for centered floating island) */}
          <div className="hidden lg:block lg:col-span-2 pointer-events-none select-none" />

          {/* Right Column: Details & Bright Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 z-30">
            <div className="glass-card rounded-3xl p-8 border border-border-accent text-left font-sans space-y-6 bg-white/40 backdrop-blur-md shadow-lg">
              <h3 className="text-base font-bold text-text-main uppercase tracking-wider font-headings border-b border-border-accent pb-4">
                Office Information
              </h3>
              
              <div className="flex items-start gap-4 text-xs">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-text-muted/40 block">Corporate Address</span>
                  <span className="text-text-main/80 leading-relaxed block mt-1">{COMPANY.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-text-muted/40 block">Direct Telephone</span>
                  <a href={`tel:${COMPANY.phoneRaw}`} className="text-text-main/80 hover:text-gold block mt-1 transition-colors">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-text-muted/40 block">Email Desk</span>
                  <a href={`mailto:${COMPANY.email}`} className="text-text-main/80 hover:text-gold block mt-1 transition-colors">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Standard bright Google Maps embed */}
            <div className="flex-1 rounded-3xl overflow-hidden border border-border-accent min-h-[250px] relative shadow-lg bg-white/45 backdrop-blur-md">
              <iframe
                src={COMPANY.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="MGR Office Location Map"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
