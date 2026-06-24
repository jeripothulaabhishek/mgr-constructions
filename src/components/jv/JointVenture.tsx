"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { motion } from "framer-motion";
import { FileCheck, TrendingUp, Landmark, Loader2, ArrowRight, Compass, ShieldAlert } from "lucide-react";

const jvSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  location: zod.string().min(3, "Land location is required"),
  size: zod.string().min(2, "Land size (e.g., 500 Sq.Yds) is required"),
});

type JVFormData = zod.infer<typeof jvSchema>;

export default function JointVenture() {
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
          (window as any).turnstile.render("#turnstile-jv", {
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
  } = useForm<JVFormData>({
    resolver: zodResolver(jvSchema),
  });

  const onSubmit = async (data: JVFormData) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          source: "jv_consultation",
          message: `Joint Venture Inquiry: Land in ${data.location}, size ${data.size}`,
          website: honeypot,
          turnstileToken: turnstileToken,
          metadata: {
            landLocation: data.location,
            landSize: data.size,
          },
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
            (window as any).turnstile.reset("#turnstile-jv");
          }
        }, 3000);
      } else {
        setErrorMsg(resData.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("JV submission error:", error);
      setErrorMsg("Submission error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="jv-section" 
      className="py-32 bg-transparent relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left: landowner content & rising infographic parcels */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-8 text-left z-30"
        >
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
              Land Collaboration Partnerships
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text-main font-headings uppercase leading-tight">
              Unlock Maximum Plot Valuations
            </h2>
            <p className="text-sm text-text-muted leading-relaxed font-light mt-2 max-w-xl">
              Partner with MGR to transform your clear-titled prime plots into premium residential complexes. We fully finance, construct, and manage approvals and sales, securing optimal equity and area-sharing terms for you.
            </p>
          </div>

          {/* Premium Infographic: Rising JDA Area Share Breakdown */}
          <div className="p-6 glass-panel rounded-2xl border border-gold/20 flex flex-col space-y-6 max-w-lg shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold">JDAs Sharing Allocation Diagram</span>
              <Compass className="w-4 h-4 text-gold" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Landowner Share rising block */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="origin-bottom bg-gradient-to-t from-gold/5 to-gold/20 border border-gold/30 rounded-xl p-5 flex flex-col justify-end min-h-[160px] text-left"
              >
                <span className="text-3xl font-black text-gold font-headings leading-none">50%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-main mt-2 block">Landowner Share</span>
                <span className="text-[9px] text-text-muted mt-1 leading-normal font-light">Direct area allotment or profit sharing.</span>
              </motion.div>

              {/* Developer Share block */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="origin-bottom bg-gradient-to-t from-text-main/5 to-text-main/15 border border-border-accent rounded-xl p-5 flex flex-col justify-end min-h-[160px] text-left"
              >
                <span className="text-3xl font-black text-text-main font-headings leading-none">50%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-main mt-2 block">Developer Share</span>
                <span className="text-[9px] text-text-muted mt-1 leading-normal font-light">MGR finances 100% of construction & clearances.</span>
              </motion.div>
            </div>

            <div className="flex gap-3 text-[10px] text-text-muted font-bold uppercase tracking-wider items-start">
              <ShieldAlert className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>Full legal security, certified escrow management, and bank guarantees provided to landowners.</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Form card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 z-30"
        >
          <div className="glass-card rounded-2xl p-8 border border-border-accent shadow-lg relative bg-white/90">
            <h3 className="text-base font-bold text-text-main uppercase tracking-wider mb-6 font-headings">
              Book JDA Consultation
            </h3>

            {success ? (
              <div className="py-12 flex flex-col items-center justify-center text-center font-sans">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 shadow-sm animate-pulse">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h4 className="text-emerald-500 font-bold uppercase tracking-wider text-xs font-headings">
                  Inquiry Transmitted!
                </h4>
                <p className="text-xs text-text-muted mt-2 max-w-xs leading-relaxed font-light">
                  Thank you. Our partnership audit team will contact you to set up a site evaluation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left text-xs">
                {/* Name */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="jv-name" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Landowner Name
                  </label>
                  <input
                    type="text"
                    id="jv-name"
                    placeholder="Enter name"
                    {...register("name")}
                    className="w-full px-4 py-3 bg-white border border-border-accent rounded-lg text-text-main focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-500 mt-0.5">{errors.name.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="jv-phone" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="jv-phone"
                      placeholder="10-digit number"
                      maxLength={10}
                      {...register("phone")}
                      className="w-full px-4 py-3 bg-white border border-border-accent rounded-lg text-text-main focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-500 mt-0.5">{errors.phone.message}</span>
                    )}
                  </div>
                  {/* Email */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="jv-email" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="jv-email"
                      placeholder="email@address.com"
                      {...register("email")}
                      className="w-full px-4 py-3 bg-white border border-border-accent rounded-lg text-text-main focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 mt-0.5">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Plot Location */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="jv-location" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Land Location
                    </label>
                    <input
                      type="text"
                      id="jv-location"
                      placeholder="e.g., Manikonda, Tarnaka"
                      {...register("location")}
                      className="w-full px-4 py-3 bg-white border border-border-accent rounded-lg text-text-main focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.location && (
                      <span className="text-[10px] text-red-500 mt-0.5">{errors.location.message}</span>
                    )}
                  </div>
                  {/* Plot Size */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="jv-size" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Land Dimensions
                    </label>
                    <input
                      type="text"
                      id="jv-size"
                      placeholder="e.g., 600 Sq.Yards"
                      {...register("size")}
                      className="w-full px-4 py-3 bg-white border border-border-accent rounded-lg text-text-main focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.size && (
                      <span className="text-[10px] text-red-500 mt-0.5">{errors.size.message}</span>
                    )}
                  </div>
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
                  <div id="turnstile-jv"></div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[11px] font-medium leading-relaxed">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gold text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-text-main transition-all duration-300 shadow-md hover:shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registering Plot...
                    </>
                  ) : (
                    <>
                      Submit JV Request
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
