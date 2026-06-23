"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQS } from "@/content/faqs";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-primary relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
            INFORMATION HUB
          </span>
          <h2 className="text-3xl font-bold text-text-main mt-3 font-headings uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-text-muted mt-3 font-light">
            Find answers regarding Vastu standards, government approvals, and joint venture documentation.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-xl border border-border-accent overflow-hidden transition-all duration-300 bg-white"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-text-main group-hover:text-gold transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-text-muted shrink-0 border border-border-accent">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Animated expandable body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-60 border-t border-border-accent" : "max-h-0"
                  }`}
                >
                  <div className="p-5 text-xs leading-relaxed text-text-muted font-light bg-primary/30">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
