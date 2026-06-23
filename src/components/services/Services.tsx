"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SERVICES } from "@/content/services";

// Helper component to resolve Lucide icons dynamically
const ServiceIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white border-t border-border-accent relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
            OUR COMPETENCY
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mt-3 font-headings uppercase">
            Luxury Real Estate Curation
          </h2>
          <p className="text-sm text-text-muted mt-3 leading-relaxed font-light">
            We guide you from initial floor plan drafts to structural clearances, delivering Vastu-harmonized luxury homes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between h-[360px] text-left relative overflow-hidden group cursor-pointer"
            >
              {/* Radial gradient glow on card hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-6">
                {/* Gold Circle Icon Wrapper */}
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300 transform group-hover:scale-105 shadow-sm">
                  <ServiceIcon name={srv.iconName} className="w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-text-main group-hover:text-gold transition-colors font-headings uppercase">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-sans font-light">
                    {srv.description}
                  </p>
                </div>
              </div>

              {/* Bullet Features Checklist */}
              <ul className="space-y-2 pt-4 border-t border-border-accent mt-4 text-[10px] text-text-muted/60 font-sans group-hover:text-text-main transition-colors">
                {srv.features.slice(0, 2).map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
