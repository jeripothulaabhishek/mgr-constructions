"use client";

import { useState } from "react";
import { MessageSquare, Phone, Calculator, Calendar, FileDown, Layers, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/config/company";
import { CONTACT_CONFIG } from "@/config/contact";

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const triggerEvent = (eventName: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(eventName));
    }
    setIsOpen(false);
  };

  const actions = [
    {
      label: "Cost Calculator",
      icon: Calculator,
      color: "bg-white text-text-main hover:bg-gold hover:text-white border border-border-accent",
      onClick: () => triggerEvent("open-calculator"),
    },
    {
      label: "Download Guide",
      icon: FileDown,
      color: "bg-white text-text-main hover:bg-gold hover:text-white border border-border-accent",
      onClick: () => triggerEvent("open-cost-guide"),
    },
    {
      label: "Site Visit Schedule",
      icon: Calendar,
      color: "bg-white text-text-main hover:bg-gold hover:text-white border border-border-accent",
      onClick: () => triggerEvent("open-site-visit"),
    },
    {
      label: "WhatsApp Chat",
      icon: MessageSquare,
      color: "bg-emerald-600 text-white hover:bg-emerald-500",
      onClick: () => window.open(CONTACT_CONFIG.whatsapp.url, "_blank"),
    },
    {
      label: "Call Support",
      icon: Phone,
      color: "bg-gold text-white hover:bg-text-main",
      onClick: () => window.open(`tel:${COMPANY.phoneRaw}`, "_self"),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-4 font-sans">
      {/* Expanding Buttons Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col space-y-3 mb-2"
          >
            {actions.map((act) => (
              <div key={act.label} className="flex items-center space-x-3 group justify-end">
                {/* Tooltip Badge */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-bold tracking-widest text-text-main uppercase px-3 py-1.5 glass-panel rounded-lg shadow-sm border border-border-accent pointer-events-none select-none whitespace-nowrap">
                  {act.label}
                </span>
                {/* Circular Action Button */}
                <button
                  onClick={act.onClick}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all duration-300 transform hover:scale-110 cursor-pointer ${act.color}`}
                  aria-label={act.label}
                >
                  <act.icon className="w-4.5 h-4.5" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gold hover:bg-text-main text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-500 hover:shadow-gold/15 transform hover:scale-105 group relative cursor-pointer"
        aria-label="Toggle floating quick links"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="layers"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Layers className="w-5 h-5" />
              {/* Notification Badge */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-primary animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
