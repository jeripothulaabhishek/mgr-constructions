"use client";

import { motion, MotionValue } from "framer-motion";

export default function HeroBackground({ rotateX, rotateY }: { rotateX: MotionValue<number>; rotateY: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#FAF8F4]">
      {/* Layer 1: Radial gradient (Primary light cream base with gold ambient dispersion) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(201,162,39,0.08)_0%,rgba(250,248,244,0)_60%)]" />

      {/* Layer 2: Architectural blueprint grid with delicate parallax shifting */}
      <motion.div
        style={{
          x: rotateY,
          y: rotateX,
        }}
        className="absolute inset-[-40px] opacity-[0.25] pointer-events-none"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(rgba(201,162,39,0.12) 1.5px, transparent 1.5px),
              linear-gradient(rgba(231,223,208,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(231,223,208,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px, 60px 60px, 60px 60px",
            backgroundPosition: "30px 30px, center center, center center",
          }}
        />
      </motion.div>

      {/* Layer 3: SVG Noise Texture Overlay for premium textured paper feel */}
      <svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none mix-blend-overlay"
      >
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Layer 4: Soft ambient gold radial spotlight centered behind the building location */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none animate-pulse-slow" />
    </div>
  );
}
