"use client";

import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_CONFIG } from "@/config/contact";

export default function CalendlyModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-site-visit", handleOpen);
    return () => window.removeEventListener("open-site-visit", handleOpen);
  }, []);

  // Listen to Calendly iframe booking success events
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event === "calendly.event_scheduled") {
        console.log("[Calendly Link] Successful Site Visit scheduled event captured.");
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "site_visit_booked", {
            event_category: "leads",
            event_label: "calendly_embed",
          });
        }
      }
    };
    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, []);

  // Prevent scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-primary/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl h-[85vh] glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-charcoal-dark">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white uppercase tracking-wider text-sm font-headings">
                    Schedule a VIP Site Visit
                  </h3>
                  <p className="text-xs text-white/50 font-sans mt-0.5">
                    Select a convenient date & time to tour our premium residences in Hyderabad.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/75 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendly Inline Widget Iframe */}
            <div className="flex-1 bg-white relative">
              <iframe
                src={`${CONTACT_CONFIG.calendly.url}?embed_type=InlineEmbed&embed_domain=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : ""
                )}&background_color=121315&text_color=ffffff&primary_color=d4af37`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Site Visit Scheduler"
                className="w-full h-full bg-[#121315]"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
