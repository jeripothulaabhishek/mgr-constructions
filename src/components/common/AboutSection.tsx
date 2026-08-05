"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  const stats = [
    {
      value: "15+",
      label: "YEARS",
      desc: "Of architectural legacy and crafting residential spaces.",
    },
    {
      value: "500+",
      label: "FAMILIES",
      desc: "Whose trust and lifestyle aspirations we support.",
    },
    {
      value: "35+",
      label: "PROJECTS",
      desc: "Delivered on schedule across prime growth corridors.",
    },
    {
      value: "98%",
      label: "SATISFACTION",
      desc: "Verified customer approval and clear legal titles.",
    },
  ];

  return (
    <section 
      id="about-section" 
      className="py-32 bg-transparent relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Brand narrative and massive metrics grid (Spans 7 Columns) */}
        <div className="lg:col-span-7 flex flex-col space-y-12 text-left z-30">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-4"
          >
            <span className="luxury-label text-gold block">
              Generational Developer
            </span>
            <h2 className="luxury-title text-text-main font-headings uppercase leading-none tracking-tight">
              Building Legacy Homes<br />For Modern Living
            </h2>
            <p className="luxury-paragraph text-text-muted leading-relaxed font-light mt-4 max-w-xl">
              At Prime Estates, we construct luxury family sanctuaries. We blend timeless architectural principles with premium engineering to create residences that appreciate across generations.
            </p>
          </motion.div>

          {/* Massive Editorial Stats Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-16 pt-12 border-t border-border-accent/40">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="flex flex-col text-left group"
              >
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-gold font-headings tracking-tighter leading-none group-hover:scale-105 transition-transform duration-500 origin-left">
                  {stat.value}
                </span>
                <span className="luxury-label text-text-main uppercase mt-3">
                  {stat.label}
                </span>
                <span className="text-xs text-text-muted mt-1 leading-normal font-light max-w-[200px]">
                  {stat.desc}
                </span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Column: Left empty for the centerpiece island (Spans 5 Columns) */}
        <div className="lg:col-span-5 relative w-full h-[400px] lg:h-[600px] flex items-center justify-center z-10 pointer-events-none select-none">
          {/* Subtle architectural circular rings highlighting the floating centerpiece */}
          <div className="absolute w-[240px] h-[240px] border border-gold/10 rounded-full animate-[spin_80s_linear_infinite]" style={{ borderStyle: "dashed" }} />
          <div className="absolute w-[360px] h-[360px] border border-gold/5 rounded-full animate-[spin_120s_linear_infinite]" />
        </div>

      </div>
    </section>
  );
}
