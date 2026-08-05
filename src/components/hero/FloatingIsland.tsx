"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMouseParallax } from "./hooks/useMouseParallax";
import { useFloatingAnimation } from "./hooks/useFloatingAnimation";

export default function FloatingIsland() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup mouse parallax tilting (max 6 degrees as per spec)
  const { rotateX, rotateY } = useMouseParallax(6);

  // Setup gentle continuous float (yOffset: 12px, rotateOffset: 1deg)
  const floatAnim = useFloatingAnimation(6, 12, 1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const element = containerRef.current;
    if (element) {
      // Clear existing ScrollTriggers to prevent leaks
      ScrollTrigger.getAll().forEach(t => t.kill());

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#main-scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrolling scrub binding
        }
      });

      // GSAP Timeline coordinates the centerpiece positions across sections
      tl.to(element, {
        // Step 1: Hero to About MGR (shifts right, opens left for stats)
        x: "15vw",
        scale: 0.8,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(element, {
        // Step 2: About to Why Choose MGR (shifts left for cards on right)
        x: "-15vw",
        scale: 0.85,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(element, {
        // Step 3: Why Choose MGR to Construction Philosophy (shifts right for text on left)
        x: "16vw",
        scale: 0.8,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(element, {
        // Step 4: Philosophy to Amenities (centers for floating modules)
        x: "0vw",
        scale: 0.72,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(element, {
        // Step 5: Amenities to Location (centers, scales up, lines animate)
        x: "0vw",
        scale: 0.85,
        rotation: 8,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(element, {
        // Step 6: Location to Projects (centers, scales up backdrop)
        x: "0vw",
        scale: 1.1,
        rotation: 0,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(element, {
        // Step 7: Projects to Testimonials (orbit cards overlay)
        x: "0vw",
        scale: 0.9,
        rotation: -4,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(element, {
        // Step 8: Testimonials to Contact (settles in center for action desk)
        x: "0vw",
        scale: 0.8,
        rotation: 0,
        duration: 1,
        ease: "power2.inOut"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
      {/* GSAP scroll animation container */}
      <div
        ref={containerRef}
        className="relative w-[280px] sm:w-[380px] md:w-[460px] lg:w-[580px] xl:w-[660px] h-[280px] sm:h-[380px] md:h-[460px] lg:h-[580px] xl:h-[660px] flex items-center justify-center transition-all duration-300"
      >
        {/* Soft breathing shadow/glow beneath the building */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[20%] w-[50%] h-[5%] bg-black/20 rounded-full blur-xl pointer-events-none"
        />

        {/* Ambient Backlight Glow centered behind the building */}
        <div 
          className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none animate-pulse-slow"
          style={{ animationDuration: "5s" }}
        />

        {/* Continuous floating & soft breathing scale animation wrapper */}
        <motion.div
          animate={floatAnim.y.animate}
          transition={floatAnim.y.transition}
          className="w-full h-full flex items-center justify-center"
        >
          {/* Parallax tilting wrapper (Framer Motion spring physics) */}
          <motion.div
            animate={floatAnim.rotate.animate}
            transition={floatAnim.rotate.transition}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[85%] sm:w-[75%] md:w-[65%] lg:w-[92%] xl:w-[85%] aspect-square flex items-center justify-center transform-gpu will-change-transform"
          >
            <Image
              src="/uploads/hero/floating-island-3d.png"
              alt="Luxury MGR Residential Floating Oasis"
              fill
              priority
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 660px"
              className="object-contain drop-shadow-[0_30px_60px_rgba(201,162,39,0.16)] select-none pointer-events-none filter transform-gpu"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
