"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight, FileText, ChevronRight } from "lucide-react";

export default function Hero() {
  const triggerEvent = (eventName: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(eventName));
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-88px)] flex items-center bg-primary overflow-hidden py-16">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,162,39,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(245,239,228,0.4)_0%,transparent_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full z-10">
        
        {/* Left Column: Headline copy, Lead magnet */}
        <div className="lg:col-span-6 flex flex-col space-y-8 text-left">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 w-max px-3 py-1.5 rounded-full bg-white border border-border-accent shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[9px] uppercase font-bold tracking-widest text-gold font-sans">
              HMDA & RERA Approved Developments
            </span>
          </motion.div>

          {/* Headline & Paragraph */}
          <div className="flex flex-col space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-[1.08] font-headings uppercase"
            >
              Crafting Landmark <br />
              <span className="gold-gradient-text">Homes</span> for Modern <br />
              Hyderabad Families
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-text-muted max-w-lg leading-relaxed font-sans font-light"
            >
              Experience thoughtfully designed residences built with timeless architecture, premium amenities, and long-term investment value in Hyderabad's premier neighborhoods.
            </motion.p>
          </div>

          {/* Primary Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-max font-sans"
          >
            <button
              onClick={() => triggerEvent("open-site-visit")}
              className="px-6 py-4 bg-gold text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-text-main transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-gold/10 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Schedule Site Visit
            </button>
            <a
              href="/projects"
              className="px-6 py-4 border border-border-accent hover:border-gold hover:text-gold text-text-main bg-white/50 font-bold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 group"
            >
              Explore Projects
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Cost Guide Lead Magnet Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => triggerEvent("open-cost-guide")}
            className="p-5 border border-gold/30 rounded-xl bg-white hover:bg-secondary/80 transition-all cursor-pointer flex items-center justify-between group max-w-lg shadow-sm border-dashed"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left font-sans">
                <span className="text-[9px] uppercase font-bold tracking-widest text-gold font-bold">
                  Free Valuation Guide
                </span>
                <span className="text-xs font-bold text-text-main mt-0.5 font-headings uppercase">
                  Get Free Hyderabad Construction Cost Guide (PDF)
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </motion.div>

        </div>

        {/* Right Column: Luxury Static Render Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="lg:col-span-6 h-[400px] lg:h-[520px] w-full relative"
        >
          {/* Decorative outline frames */}
          <div className="absolute -inset-4 border border-gold/10 rounded-3xl pointer-events-none rotate-2" />
          
          <div className="absolute inset-0 bg-white border border-border-accent rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between p-8 group">
            {/* Visual rendering main elevation */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/uploads/hero/hero-main.png"
                alt="Contemporary luxury villa elevation designed by MGR Constructions"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            </div>

            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] uppercase font-bold tracking-widest text-gold font-sans bg-white px-2.5 py-1 rounded-md border border-border-accent">
                Villa Elevation Config.01
              </span>
              <span className="text-[10px] font-mono text-white/50">MGR HOMES</span>
            </div>

            {/* Empty center spacing to let the image show */}
            <div className="flex-1" />

            {/* Description overlay */}
            <div className="z-10 bg-white/95 backdrop-blur-sm p-4.5 rounded-xl border border-border-accent text-left max-w-sm shadow-md">
              <span className="text-xs font-bold text-text-main font-headings uppercase block">
                Signature Living Spaces
              </span>
              <span className="text-[10px] text-text-muted mt-1 block font-light leading-relaxed">
                Render mockup representing modern landscaping, large floor plates, and structural design harmony.
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
