"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { X, FileText, Download, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_CONFIG } from "@/config/contact";

const leadSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
});

type LeadFormData = zod.infer<typeof leadSchema>;

export default function CostGuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSuccess(false);
      setErrorMsg(null);
      setHoneypot("");
      setTurnstileToken(null);
    };
    window.addEventListener("open-cost-guide", handleOpen);
    return () => window.removeEventListener("open-cost-guide", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      let checkTurnstile = setInterval(() => {
        if ((window as any).turnstile) {
          clearInterval(checkTurnstile);
          try {
            (window as any).turnstile.render("#turnstile-guide", {
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
    }
  }, [isOpen]);

  const onSubmit = async (data: LeadFormData) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "lead_magnet",
          message: "Requested Free Hyderabad Construction Cost Guide",
          website: honeypot,
          turnstileToken: turnstileToken,
        }),
      });

      const resData = await response.json();

      if (resData.success) {
        setSuccess(true);
        
        const link = document.createElement("a");
        link.href = CONTACT_CONFIG.brochures.costGuide;
        link.download = "MGR-Construction-Cost-Guide-2026.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          setIsOpen(false);
          reset();
        }, 2000);
      } else {
        setErrorMsg(resData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Lead submission failed:", error);
      setErrorMsg("Submission error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-text-main/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg glass-card rounded-3xl p-8 shadow-2xl overflow-hidden border border-border-accent bg-white text-text-main"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-lg bg-primary/50 border border-border-accent flex items-center justify-center text-text-muted hover:bg-gold hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Content */}
            <div className="flex flex-col items-center text-center mt-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 shadow-sm animate-bounce">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-main uppercase tracking-wider font-headings">
                Get Free Pricing Guide
              </h3>
              <p className="text-xs text-text-muted mt-2 max-w-sm font-sans font-light">
                Unlock our detailed Hyderabad material specifications checklist and actual home building cost estimates for 2026.
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center py-6 font-sans"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                  <Download className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-emerald-600 font-bold uppercase tracking-wider text-xs font-headings">
                  Download Initiated!
                </h4>
                <p className="text-xs text-text-muted mt-2 font-light">
                  Your PDF guide is downloading. Thank you for connecting with MGR.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left text-xs">
                {/* Name */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    {...register("name")}
                    className="w-full px-4 py-3 bg-primary border border-border-accent rounded-lg text-text-main focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-500 mt-0.5">{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@email.com"
                    {...register("email")}
                    className="w-full px-4 py-3 bg-primary border border-border-accent rounded-lg text-text-main focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-500 mt-0.5">{errors.email.message}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-text-muted font-bold">+91</span>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="98765 43210"
                      maxLength={10}
                      {...register("phone")}
                      className="w-full pl-12 pr-4 py-3 bg-primary border border-border-accent rounded-lg text-text-main focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[10px] text-red-500 mt-0.5">{errors.phone.message}</span>
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
                  <div id="turnstile-guide"></div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[11px] font-medium leading-relaxed">
                    {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gold text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-text-main transition-all duration-300 shadow-md hover:shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Preparing Document...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Get Free Guide Now
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
