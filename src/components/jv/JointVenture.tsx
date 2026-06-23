"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { motion } from "framer-motion";
import { FileCheck, Users, TrendingUp, Landmark, Loader2, ArrowRight } from "lucide-react";

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

  const benefits = [
    {
      title: "Transparent JDAs",
      desc: "Vetted Joint Development Agreements protecting landowner rights with transparent legal terms.",
      icon: Landmark,
    },
    {
      title: "Optimal Equity Ratios",
      desc: "Earn high Area-Sharing and Revenue-Sharing percentages based on competitive Hyderabad market rates.",
      icon: TrendingUp,
    },
    {
      title: "End-to-End Handling",
      desc: "We manage and finance all TS-bPASS municipal approvals, RERA registrations, and connections.",
      icon: FileCheck,
    },
    {
      title: "Proven Timeline Execution",
      desc: "Supported by a professional engineering team delivering landmarks on or ahead of contract dates.",
      icon: Users,
    },
  ];

  return (
    <section id="jv" className="py-24 bg-primary relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left: copy content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-8 text-left"
        >
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
              LAND COLLABORATION
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main font-headings uppercase leading-tight">
              Partner With Confidence
            </h2>
            <p className="text-sm text-text-muted leading-relaxed font-light mt-2">
              Transform your clear-titled prime plots in Hyderabad into premium residential landmarks. We finance, build, and market the entire development, securing maximum valuation for your asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold mt-0.5 shrink-0 shadow-sm">
                  <b.icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">{b.title}</span>
                  <span className="text-[11px] text-text-muted leading-relaxed font-light">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <div className="glass-card rounded-2xl p-8 border border-border-accent shadow-lg relative bg-white">
            <h3 className="text-base font-bold text-text-main uppercase tracking-wider mb-6 font-headings">
              Book JV Consultation
            </h3>

            {success ? (
              <div className="py-12 flex flex-col items-center justify-center text-center font-sans">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 shadow-sm animate-pulse">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h4 className="text-emerald-500 font-bold uppercase tracking-wider text-xs font-headings">
                  Request Transmitted!
                </h4>
                <p className="text-xs text-text-muted mt-2 max-w-xs leading-relaxed font-light">
                  Thank you. Our land collaboration department will contact you to arrange a valuation audit.
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
