"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LuxuryLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2000); // 2 seconds duration

    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 w-full h-full bg-primary z-[9999] flex flex-col items-center justify-center font-sans select-none"
        >
          {/* Subtle architectural grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.03),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 parallax-grid-bg opacity-30 pointer-events-none" />
          
          <div className="text-center flex flex-col items-center justify-center max-w-lg px-6 z-10">
            {/* Logo Mark MGR */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-6xl font-black tracking-[0.2em] text-text-main font-headings uppercase">
                MGR
              </h1>
              <span className="text-[10px] tracking-[0.4em] text-gold font-bold uppercase mt-2">
                DEVELOPERS
              </span>
            </motion.div>

            {/* Separator Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
              className="h-[1px] bg-border-accent/60 my-6"
            />

            {/* Premium tag line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-xs md:text-sm tracking-widest text-text-muted uppercase font-light leading-relaxed text-center"
            >
              Luxury Residences For Hyderabad Families
            </motion.p>
          </div>

          {/* Bottom branding detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-12 text-[9px] tracking-widest text-text-muted uppercase font-mono"
          >
            Est. 2011 • HMDA APPROVED PROPERTIES
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
