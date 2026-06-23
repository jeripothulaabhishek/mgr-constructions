"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Sparkles, Clock } from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      title: "Generational Quality",
      desc: "Every home is crafted using premium, certified materials, ensuring structural safety and long-term value.",
      icon: ShieldCheck,
    },
    {
      title: "Timely Handover",
      desc: "We respect your family's planning. Our project execution strictly adheres to delivery schedules.",
      icon: Clock,
    },
  ];

  return (
    <section id="about" className="py-24 bg-primary relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Image Card Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative w-full h-[480px]"
        >
          <div className="absolute -inset-4 border border-gold/10 rounded-2xl pointer-events-none rotate-2" />
          
          <div className="absolute inset-0 bg-white border border-border-accent rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between p-8 group">
            {/* Grid line background overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] uppercase font-bold tracking-widest text-gold font-sans bg-primary px-2 py-1 rounded border border-border-accent">
                Family & Legacy
              </span>
              <span className="text-[10px] font-mono text-text-muted/40">ESTD. 2021</span>
            </div>

            <div className="flex flex-col space-y-4 z-10 text-left">
              <h3 className="text-2xl font-bold text-text-main font-headings uppercase">
                Designed for <br />
                Beautiful Living
              </h3>
              <p className="text-xs text-text-muted leading-relaxed font-light">
                We believe a home is where memories are created and legacies are built. Our layout plans prioritize natural light, cross-ventilation, and spatial comfort for families to thrive.
              </p>
            </div>

            {/* Satisfaction Progress Check */}
            <div className="space-y-2 z-10 bg-primary/70 p-4 rounded-xl border border-border-accent">
              <div className="flex justify-between text-[9px] text-text-main font-bold uppercase tracking-wider">
                <span>Customer Care Index</span>
                <span className="text-gold">100% Satisfaction</span>
              </div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-border-accent">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="h-full bg-gold rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Content Stories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col space-y-8 text-left"
        >
          <div className="flex flex-col space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
              MGR DEVELOPERS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main font-headings uppercase leading-tight">
              Building Homes That <br />Last Generations
            </h2>
            <p className="text-sm text-text-muted leading-relaxed font-light mt-2">
              At MGR, we don't just build apartments; we craft high-quality residential sanctuaries where families find absolute peace. Under the leadership of M. Gopal Reddy, we combine timeless architectural principles with premium brand finishes to create premium communities in Hyderabad.
            </p>
          </div>

          {/* Mission & Vision cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-5 bg-white border border-border-accent rounded-xl flex flex-col space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider">Family Comfort</h4>
              <p className="text-[11px] text-text-muted leading-relaxed font-light">
                Providing layouts focusing on privacy, modern convenience, and children's safety.
              </p>
            </div>

            <div className="p-5 bg-white border border-border-accent rounded-xl flex flex-col space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-text-main uppercase tracking-wider">Timeless Architecture</h4>
              <p className="text-[11px] text-text-muted leading-relaxed font-light">
                Blending aesthetics with Vastu integrity and high resale valuations.
              </p>
            </div>
          </div>

          {/* Core values list */}
          <div className="space-y-4 pt-4 border-t border-border-accent">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 items-start">
                <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-1 shrink-0">
                  <v.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">{v.title}</span>
                  <span className="text-xs text-text-muted leading-relaxed font-light">{v.desc}</span>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
