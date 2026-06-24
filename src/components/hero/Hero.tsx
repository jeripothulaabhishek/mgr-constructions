"use client";

import { motion } from "framer-motion";

const TRUST_ITEMS = [
  { value: "15+", label: "Years Legacy" },
  { value: "500+", label: "Happy Families" },
  { value: "20+", label: "Projects Done" },
  { value: "100%", label: "Vastu Compliant" },
  { value: "HMDA", label: "Approved Zoning" },
  { value: "Prime", label: "Locations Only" },
];

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen flex flex-col justify-between bg-transparent overflow-hidden px-6 pt-36 pb-12"
    >
      {/* 1. Massive Depth Typography Layer (Behind the centerpiece island) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center flex flex-col items-center justify-center"
        >
          <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[12rem] font-black tracking-tighter leading-none text-border-accent/15 font-headings uppercase select-none">
            CREATING
          </span>
          <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[12rem] font-black tracking-tighter leading-none text-border-accent/15 font-headings uppercase select-none -mt-3 sm:-mt-6">
            LIVING
          </span>
          <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[12rem] font-black tracking-tighter leading-none text-border-accent/15 font-headings uppercase select-none -mt-3 sm:-mt-6">
            SPACES
          </span>
        </motion.div>
      </div>

      {/* 2. Above-Fold Editorial Headline & Subheadline (Z-30, reads clearly in front of centerpiece background) */}
      <div className="w-full max-w-5xl mx-auto text-center z-30 relative mb-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col space-y-4"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold">
            A New Standard of Living
          </span>
          
          <h1 className="luxury-hero text-text-main font-headings uppercase">
            Building Legacy Homes<br />
            <span className="gold-gradient-text">For Hyderabad Families</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-text-muted mt-6 luxury-paragraph font-light">
            Thoughtfully planned residences combining premium construction, Vastu principles, and strategic connectivity across Hyderabad's fastest-growing neighborhoods.
          </p>
        </motion.div>
      </div>

      {/* 3. Watch-Face Subtle Information Layer (4 Corners Overlay, Extremely Subtle) */}
      <div className="absolute inset-0 pointer-events-none z-30 select-none hidden md:block">
        {/* Top Left */}
        <div className="absolute left-8 top-32 flex flex-col space-y-1 text-left">
          <span className="text-[9px] font-mono tracking-[0.2em] text-gold/80 uppercase">01 / BRAND</span>
          <span className="text-[11px] font-bold tracking-widest text-text-main uppercase">HYDERABAD • MANIKONDA</span>
        </div>
        {/* Top Right */}
        <div className="absolute right-8 top-32 flex flex-col space-y-1 text-right">
          <span className="text-[9px] font-mono tracking-[0.2em] text-gold/80 uppercase">02 / LEGACY</span>
          <span className="text-[11px] font-bold tracking-widest text-text-main uppercase">15+ YEARS OF TRUST</span>
        </div>
        {/* Bottom Left */}
        <div className="absolute left-8 bottom-36 flex flex-col space-y-1 text-left">
          <span className="text-[9px] font-mono tracking-[0.2em] text-gold/80 uppercase">03 / APPROVAL</span>
          <span className="text-[11px] font-bold tracking-widest text-text-main uppercase">HMDA APPROVED HOMES</span>
        </div>
        {/* Bottom Right */}
        <div className="absolute right-8 bottom-36 flex flex-col space-y-1 text-right">
          <span className="text-[9px] font-mono tracking-[0.2em] text-gold/80 uppercase">04 / CUSTOMERS</span>
          <span className="text-[11px] font-bold tracking-widest text-text-main uppercase">500+ HAPPY FAMILIES</span>
        </div>
      </div>

      {/* 4. Luxury Trust Ribbon (Static grid, animates on mount/viewport entry) */}
      <div className="w-full max-w-6xl mx-auto z-30 mt-auto pt-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 border-t border-border-accent/40 pt-8"
        >
          {TRUST_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col items-center text-center px-2 group"
            >
              <span className="text-2xl md:text-3xl font-black text-text-main font-headings tracking-tight transition-transform duration-300 group-hover:scale-105">
                {item.value}
              </span>
              <span className="text-[10px] font-bold tracking-[0.1em] text-text-muted uppercase mt-1 font-sans">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
