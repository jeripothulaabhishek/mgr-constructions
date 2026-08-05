"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "primary" | "secondary";
}

function MagneticButton({ children, onClick, className = "", variant = "primary" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // Limit tracking distance (max 12px)
    setCoords({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles = "relative px-7 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden cursor-pointer select-none outline-none font-sans";
  const variants = {
    primary: "bg-[#1A1C1E] text-white border border-[#C9A227]/40 shadow-lg btn-luxury-shimmer",
    secondary: "bg-transparent text-[#1A1C1E] border border-border-accent/80 hover:bg-[#FAF8F4] hover:border-[#C9A227]/40 shadow-sm",
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: coords.x, y: coords.y }}
      transition={!isHovered ? { type: "spring", stiffness: 150, damping: 15, mass: 0.6 } : { type: "tween", ease: "linear", duration: 0.05 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Ripple/Glow effect on primary button */}
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

export default function HeroCTA() {
  const triggerSiteVisit = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-site-visit"));
    }
  };

  const scrollToResidences = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("projects-featured");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex flex-col sm:flex-row items-center gap-4 z-35"
    >
      <MagneticButton variant="primary" onClick={triggerSiteVisit}>
        Book Site Visit
        <svg className="w-3.5 h-3.5 ml-1.5 fill-current" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </MagneticButton>

      <MagneticButton variant="secondary" onClick={scrollToResidences}>
        Explore Residences
      </MagneticButton>
      
      {/* Subtle Consultation Hook */}
      <span className="text-[10px] text-text-muted font-medium tracking-wider uppercase font-sans mt-2 sm:mt-0 sm:ml-2 opacity-80 animate-[pulse-slow_3s_ease-in-out_infinite]">
        • Site Visit in 24 Hours
      </span>
    </motion.div>
  );
}
