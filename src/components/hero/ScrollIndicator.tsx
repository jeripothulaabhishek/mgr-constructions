"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  const scrollDown = () => {
    if (typeof window === "undefined") return;
    const nextSection = document.getElementById("main-scroll-track");
    if (nextSection) {
      // Scroll down by 80% viewport height to start displaying next section content
      window.scrollTo({
        top: window.innerHeight * 0.85,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      onClick={scrollDown}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-gold cursor-pointer transition-colors duration-300 z-30 outline-none"
      aria-label="Scroll down to explore"
    >
      <span className="text-[9px] uppercase tracking-[0.2em] font-bold font-sans">
        Scroll to Explore
      </span>
      <div className="w-5 h-8 rounded-full border border-border-accent flex items-start justify-center p-1.5 hover:border-gold transition-colors duration-300">
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1 h-1.5 rounded-full bg-gold"
        />
      </div>
    </motion.button>
  );
}
