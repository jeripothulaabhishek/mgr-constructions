"use client";

import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroContent from "./HeroContent";
import HeroCTA from "./HeroCTA";
import HeroStats from "./HeroStats";
import FloatingIsland from "./FloatingIsland";
import ScrollIndicator from "./ScrollIndicator";
import { useMouseParallax } from "./hooks/useMouseParallax";

export default function Hero() {
  // Shared mouse tracking coordinates for background grid parallax alignment
  const { rotateX, rotateY } = useMouseParallax(6);

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[calc(100vh-88px)] flex flex-col justify-center bg-transparent overflow-hidden px-6 sm:px-12 lg:px-20 xl:px-28 py-8 lg:py-12"
    >
      {/* Layers 1, 2, 3, 5: Radial Gradient, Blueprint Grid, Noise Texture, Ambient Backlight */}
      <HeroBackground rotateX={rotateX} rotateY={rotateY} />

      {/* Layer 4: Interactive Floating Canvas Gold Particles */}
      <HeroParticles />

      {/* Layer 6: Main Centerpiece Floating Building (Fixed overlay with scroll mapping) */}
      <FloatingIsland />

      {/* Layout grid containing Text, CTAs, and trust metrics */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-30 pointer-events-none">
        
        {/* Left Column (Spans 7 Columns): Text and Actions (pointer-events-auto for clicks) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 lg:space-y-7 items-start pointer-events-auto">
          {/* Layer 7: Storytelling Headline */}
          <HeroContent />
          
          {/* Layer 8: Primary & Secondary CTAs */}
          <HeroCTA />

          {/* Layer 6 (badges): Luxury trust stats */}
          <HeroStats />
        </div>

        {/* Right Column (Spans 5 Columns): Blank workspace to receive the floating centerpiece */}
        <div className="lg:col-span-5 h-[240px] sm:h-[320px] lg:h-[480px] w-full pointer-events-none select-none" />

      </div>

      {/* Layer 9: Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
