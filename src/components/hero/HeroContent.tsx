"use client";

import { motion } from "framer-motion";

export default function HeroContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // Apple-like easeOutExpo
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col space-y-4 text-left max-w-xl z-30"
    >
      {/* Subtitle / Kicker */}
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <span className="h-[1.5px] w-6 bg-gold" />
        <span className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase font-sans">
          A New Standard of Luxury
        </span>
      </motion.div>

      {/* Main Storytelling Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-[32px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-black tracking-tight leading-[1.08] uppercase text-text-main font-headings"
      >
        Building Landmark Homes <br />
        <span className="relative inline-block mt-0.5">
          <span className="gold-gradient-text">For Modern Hyderabad</span>
        </span>
      </motion.h1>

      {/* Intro Description */}
      <motion.p
        variants={itemVariants}
        className="text-text-muted text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed font-light font-sans max-w-lg"
      >
        Thoughtfully planned residences combining architectural precision, Vastu compliance, and unmatched connectivity in {"Hyderabad's"} premier locations.
      </motion.p>
    </motion.div>
  );
}
