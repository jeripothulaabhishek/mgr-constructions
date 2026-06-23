"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { X, Calculator, ArrowRight, CheckCircle2, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const calculatorLeadSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  phone: zod.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
});

type CalculatorLeadData = zod.infer<typeof calculatorLeadSchema>;

export default function CostCalculatorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Inputs, 2: Lead Gate, 3: Results
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const [area, setArea] = useState<number>(1800);
  const [unit, setUnit] = useState<"sqft" | "sqyd">("sqft");
  const [quality, setQuality] = useState<"classic" | "premium" | "luxury">("premium");
  const [type, setType] = useState<"villa" | "apartment" | "commercial">("villa");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CalculatorLeadData>({
    resolver: zodResolver(calculatorLeadSchema),
  });

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setErrorMsg(null);
      setHoneypot("");
      setTurnstileToken(null);
    };
    window.addEventListener("open-calculator", handleOpen);
    return () => window.removeEventListener("open-calculator", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 2 && isOpen) {
      let checkTurnstile = setInterval(() => {
        if ((window as any).turnstile) {
          clearInterval(checkTurnstile);
          try {
            (window as any).turnstile.render("#turnstile-calc", {
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
  }, [step, isOpen]);

  const handleNextStep = () => {
    setStep(2);
  };

  const handleFormSubmit = async (data: CalculatorLeadData) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const areaInSqFt = unit === "sqyd" ? area * 9 : area;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "cost_calculator",
          message: `Calculated construction cost estimate for ${area} ${unit} using ${quality} quality level for ${type}.`,
          website: honeypot,
          turnstileToken: turnstileToken,
          metadata: {
            inputArea: area,
            unitType: unit,
            qualityLevel: quality,
            structureType: type,
            areaInSqFt,
          },
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setStep(3);
      } else {
        setErrorMsg(resData.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      setErrorMsg("Submission error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const areaInSqFt = unit === "sqyd" ? area * 9 : area;
  
  const qualityRates = {
    classic: 2000,
    premium: 2500,
    luxury: 3300,
  };
  
  const typeMultipliers = {
    villa: 1.0,
    apartment: 0.95,
    commercial: 0.75,
  };

  const baseRate = qualityRates[quality];
  const multiplier = typeMultipliers[type];
  const ratePerSqFt = baseRate * multiplier;
  const totalCost = areaInSqFt * ratePerSqFt;

  const breakdown = [
    { label: "Steel & Cement (Core Frame)", percentage: 35, value: totalCost * 0.35 },
    { label: "Premium Finishing & Floorings", percentage: 25, value: totalCost * 0.25 },
    { label: "Plumbing, Electrical & Paint", percentage: 15, value: totalCost * 0.15 },
    { label: "Wood Panelings & Teak Carpentry", percentage: 15, value: totalCost * 0.15 },
    { label: "Architectural Plans & Clearances", percentage: 10, value: totalCost * 0.10 },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
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
            className="relative w-full max-w-2xl glass-card rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden border border-border-accent bg-white text-text-main"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-lg bg-primary/50 border border-border-accent flex items-center justify-center text-text-muted hover:bg-gold hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-3 mb-6 text-left">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shadow-sm">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-text-main uppercase tracking-wider text-sm font-headings">
                  Cost Estimation Worksheet
                </h3>
                <p className="text-xs text-text-muted font-sans mt-0.5">
                  Calculate initial structural budget estimates based on premium Hyderabad rates.
                </p>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center space-x-2 mb-8 border-b border-border-accent pb-4 font-sans text-xs">
              <span className={`font-bold uppercase tracking-wider ${step >= 1 ? "text-gold" : "text-text-muted/40"}`}>
                1. Specifications
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-text-muted/20" />
              <span className={`font-bold uppercase tracking-wider ${step >= 2 ? "text-gold" : "text-text-muted/40"}`}>
                2. Owner Verification
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-text-muted/20" />
              <span className={`font-bold uppercase tracking-wider ${step >= 3 ? "text-gold" : "text-text-muted/40"}`}>
                3. Worksheet
              </span>
            </div>

            {/* STEP 1: specifications */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 font-sans text-left"
              >
                {/* Area Input */}
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Land Area Size
                    </label>
                    <div className="flex bg-primary rounded-lg p-0.5 border border-border-accent">
                      <button
                        onClick={() => setUnit("sqft")}
                        className={`px-3 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer ${
                          unit === "sqft" ? "bg-gold text-white" : "text-text-muted hover:text-text-main"
                        }`}
                      >
                        Sq.Ft.
                      </button>
                      <button
                        onClick={() => setUnit("sqyd")}
                        className={`px-3 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer ${
                          unit === "sqyd" ? "bg-gold text-white" : "text-text-muted hover:text-text-main"
                        }`}
                      >
                        Sq.Yds.
                      </button>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={area}
                    min={100}
                    max={100000}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-primary border border-border-accent rounded-lg text-sm text-text-main focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Structure Type */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Residence Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: "villa", label: "Luxury Villa" },
                      { key: "apartment", label: "Apartment Unit" },
                      { key: "commercial", label: "Commercial Shell" },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setType(item.key as any)}
                        className={`p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          type === item.key
                            ? "bg-gold/10 border-gold text-gold"
                            : "bg-primary border-border-accent text-text-muted hover:border-gold hover:text-gold"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Standard */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Finishing Quality
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        key: "classic",
                        label: "Classic Finish",
                        desc: "Tata steel, Hindware fittings, modular wardrobes.",
                      },
                      {
                        key: "premium",
                        label: "Premium Finish",
                        desc: "Vizag steel, Jaquar fittings, vitrified flooring.",
                      },
                      {
                        key: "luxury",
                        label: "Ultra-Luxury Finish",
                        desc: "Premium steel, Kohler fittings, Italian marble.",
                      },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setQuality(item.key as any)}
                        className={`p-4 rounded-lg border text-left flex flex-col justify-between h-28 transition-all cursor-pointer ${
                          quality === item.key
                            ? "bg-gold/10 border-gold text-gold"
                            : "bg-primary border-border-accent text-text-muted hover:border-gold hover:text-gold"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wide">{item.label}</span>
                        <span className="text-[10px] leading-relaxed text-text-muted/60 font-normal mt-1 block">
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleNextStep}
                  className="w-full py-4 bg-gold text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-text-main transition-all duration-300 shadow-md hover:shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer mt-8"
                >
                  Configure Estimate
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: Lead Gate */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 text-left"
              >
                <div className="text-center max-w-md mx-auto mb-6 font-sans">
                  <h4 className="text-text-main font-bold uppercase tracking-wider text-sm font-headings">
                    Unlock Cost Breakdown Sheet
                  </h4>
                  <p className="text-xs text-text-muted mt-2">
                    Submit your details to view the detailed structural estimates. A copy will also be dispatched to your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 font-sans">
                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="calc-name" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="calc-name"
                      placeholder="Enter name"
                      {...register("name")}
                      className="w-full px-4 py-3 bg-primary border border-border-accent rounded-lg text-xs text-text-main focus:outline-none focus:border-gold"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 mt-0.5">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="calc-email" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="calc-email"
                      placeholder="name@email.com"
                      {...register("email")}
                      className="w-full px-4 py-3 bg-primary border border-border-accent rounded-lg text-xs text-text-main focus:outline-none focus:border-gold"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 mt-0.5">{errors.email.message}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="calc-phone" className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-xs text-text-muted font-bold">+91</span>
                      <input
                        type="tel"
                        id="calc-phone"
                        placeholder="98765 43210"
                        maxLength={10}
                        {...register("phone")}
                        className="w-full pl-12 pr-4 py-3 bg-primary border border-border-accent rounded-lg text-xs text-text-main focus:outline-none focus:border-gold"
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
                    <div id="turnstile-calc"></div>
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
                        Generating Sheet...
                      </>
                    ) : (
                      <>
                        Reveal Estimate Worksheet
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: Results */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 font-sans text-left"
              >
                {/* Success alert */}
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-4 text-emerald-700">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span className="text-[11px] font-semibold leading-relaxed">
                    Estimates compiled successfully using current Hyderabad real estate parameters.
                  </span>
                </div>

                {/* Summary card */}
                <div className="grid grid-cols-2 gap-4 bg-primary p-5 rounded-xl border border-border-accent shadow-sm">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-text-muted block font-bold">
                      Configured Size
                    </span>
                    <span className="text-base font-bold text-text-main mt-1 block">
                      {areaInSqFt.toLocaleString()} Sq.Ft.
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-text-muted block font-bold">
                      Calculated Value
                    </span>
                    <span className="text-lg font-bold text-gold mt-1 block font-headings">
                      {formatCurrency(totalCost)}
                    </span>
                  </div>
                </div>

                {/* Breakdown table */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-main">
                    Estimated Component Allotments
                  </h4>
                  <div className="border border-border-accent rounded-xl overflow-hidden text-xs shadow-sm bg-white">
                    <div className="grid grid-cols-12 bg-primary border-b border-border-accent p-3 text-text-muted font-bold uppercase tracking-wider text-[10px]">
                      <div className="col-span-7">Resource Item</div>
                      <div className="col-span-2 text-center">Share</div>
                      <div className="col-span-3 text-right">Value</div>
                    </div>
                    <div className="divide-y divide-border-accent">
                      {breakdown.map((row) => (
                        <div key={row.label} className="grid grid-cols-12 p-3 items-center">
                          <div className="col-span-7 font-semibold text-text-main/80">{row.label}</div>
                          <div className="col-span-2 text-center text-text-muted/60 font-medium">{row.percentage}%</div>
                          <div className="col-span-3 text-right text-gold font-bold">
                            {formatCurrency(row.value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[9px] text-text-muted/40 leading-relaxed italic text-center">
                  *Disclaimer: These calculations represent approximate benchmark averages. Final configurations will vary depending on structural planning and soil mechanics.
                </p>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        setIsOpen(false);
                        window.dispatchEvent(new CustomEvent("open-site-visit"));
                      }
                    }}
                    className="flex-1 py-3.5 bg-gold text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-text-main transition-all duration-300 cursor-pointer shadow-md"
                  >
                    Request Technical Consultation
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-3.5 border border-border-accent hover:border-gold hover:text-gold rounded-lg font-bold text-xs uppercase tracking-widest text-text-main transition-all flex items-center gap-2 cursor-pointer bg-white"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
