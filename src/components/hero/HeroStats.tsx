"use client";

import { motion } from "framer-motion";
import { Award, Shield, Users, Star, LucideIcon } from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

const STATS_DATA: StatItem[] = [
  { icon: Award, value: "15+ Years", label: "Legacy of Trust" },
  { icon: Users, value: "500+", label: "Happy Families" },
  { icon: Shield, value: "35+ Projects", label: "Delivered" },
  { icon: Star, value: "98%", label: "Satisfaction" },
];

export default function HeroStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl z-30"
    >
      {STATS_DATA.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="flex items-center gap-2.5 p-3 rounded-xl glass-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227]/50 hover:shadow-[0_15px_30px_-15px_rgba(201,162,39,0.15)] group"
          >
            {/* Round Icon Container */}
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
              <IconComponent className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-text-main font-headings tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-semibold mt-0.5 font-sans">
                {stat.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
