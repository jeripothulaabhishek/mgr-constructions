"use client";

import { motion } from "framer-motion";
import { Wind, Sun, Shield, Eye, TrendingUp } from "lucide-react";

export default function ConstructionPhilosophy() {
  const pillars = [
    {
      title: "Natural Ventilation",
      desc: "Dual-aspect balconies and wide floor plates to facilitate natural cross-ventilation and clean air flow.",
      icon: Wind,
    },
    {
      title: "Maximum Daylight",
      desc: "Oriented for optimal solar paths, guaranteeing over 85% of interior rooms receive bright natural daytime illumination.",
      icon: Sun,
    },
    {
      title: "Structural Integrity",
      desc: "Built using certified high-strength Fe550 steel, custom RCC frameworks, and earthquake-resistant designs.",
      icon: Shield,
    },
    {
      title: "Vastu Compliance",
      desc: "Every residence is designed with strict adherence to Vastu principles, optimizing positive energy flow.",
      icon: Eye,
    },
    {
      title: "Long-Term Value Appreciation",
      desc: "Located in premium West Hyderabad growth corridors, securing solid wealth creation and asset value growth.",
      icon: TrendingUp,
    },
  ];

  return (
    <section 
      id="philosophy-section" 
      className="py-32 bg-transparent relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left: Text detail layout (Spans 6 Columns) */}
        <div className="lg:col-span-6 flex flex-col space-y-12 text-left z-30">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="luxury-label text-gold block">
              Architectural Standard
            </span>
            <h2 className="luxury-title text-text-main font-headings uppercase leading-none tracking-tight">
              The MGR Way
            </h2>
            <p className="luxury-paragraph text-text-muted font-light mt-4 max-w-xl">
              We design homes around human biology, family dynamics, and structural reliability. Our architectural choices optimize space, environment, and investment security.
            </p>
          </motion.div>

          {/* Pillars List */}
          <div className="flex flex-col space-y-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                   key={item.title}
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: idx * 0.08 }}
                   className="flex items-start gap-5 p-4 rounded-2xl hover:bg-white/30 hover:backdrop-blur-sm border border-transparent hover:border-border-accent/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold shrink-0 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-text-main uppercase tracking-wider font-headings">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-text-muted leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Right: Left open for centerpiece island (Spans 6 Columns) */}
        <div className="lg:col-span-6 relative w-full h-[400px] lg:h-[600px] pointer-events-none select-none flex items-center justify-center z-10" />

      </div>
    </section>
  );
}
