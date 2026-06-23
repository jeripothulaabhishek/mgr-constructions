"use client";

import { Calculator, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function CostCalculator() {
  const launchEstimator = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-calculator"));
    }
  };

  const specifications = [
    "Vastu-compliant layouts",
    "Premium materials spec sheet",
    "Detailed component estimates",
    "No hidden escalation clauses",
  ];

  return (
    <section className="py-24 bg-white border-t border-border-accent relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-border-accent shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-left bg-white">
          
          {/* Blueprint style grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Left panel */}
          <div className="flex-1 space-y-6 z-10">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold shadow-sm">
              <Calculator className="w-5 h-5" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold block font-sans">
                INSTANT VALUATIONS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-text-main font-headings uppercase">
                Construction Cost Estimator
              </h2>
              <p className="text-xs text-text-muted leading-relaxed font-sans font-light">
                Plan your family villa or residential project in Hyderabad. Get immediate budget allocations based on current materials rates.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] text-text-muted font-bold uppercase tracking-wider">
              {specifications.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right panel */}
          <div className="w-full md:w-auto shrink-0 z-10 font-sans">
            <button
              onClick={launchEstimator}
              className="w-full md:w-auto px-8 py-5 bg-gold text-white hover:bg-text-main rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-gold/10 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Estimate Build Cost
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <span className="text-[9px] uppercase tracking-widest text-text-muted/40 text-center block mt-3 font-semibold">
              Takes Less than 60 Seconds
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
