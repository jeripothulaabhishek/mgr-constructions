"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { TESTIMONIALS } from "@/content/testimonials";

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="py-24 bg-primary border-t border-border-accent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-xl mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
            CLIENT SATISFACTION
          </span>
          <h2 className="text-3xl font-bold text-text-main mt-3 font-headings uppercase">
            Stories from Our Homeowners
          </h2>
        </div>

        {/* Slider Card */}
        <div className="w-full relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-8 md:p-12 border border-border-accent shadow-lg relative w-full text-left font-sans flex flex-col justify-between bg-white"
            >
              <div className="absolute top-8 right-8 text-gold/5 pointer-events-none">
                <MessageSquare className="w-20 h-20" />
              </div>

              <div className="space-y-6 z-10">
                {/* Stars */}
                <div className="flex items-center space-x-1 text-gold">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm md:text-base text-text-main/90 leading-relaxed font-light italic">
                  "{active.feedback}"
                </p>
              </div>

              {/* Author Details */}
              <div className="flex justify-between items-end border-t border-border-accent pt-6 mt-8 z-10">
                <div>
                  <h4 className="text-xs font-bold text-text-main uppercase tracking-wider font-headings">
                    {active.name}
                  </h4>
                  <span className="text-[10px] text-text-muted block mt-0.5">{active.role}</span>
                </div>
                <span className="text-[10px] text-text-muted/40 font-mono">{active.date}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6 mt-8 z-10 font-sans">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-lg bg-white hover:bg-primary border border-border-accent text-text-main flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs text-text-muted font-mono">
            {index + 1} / {TESTIMONIALS.length}
          </span>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-lg bg-white hover:bg-primary border border-border-accent text-text-main flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
