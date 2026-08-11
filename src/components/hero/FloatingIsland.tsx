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
    if (!element) return;

    // Clear existing ScrollTriggers to prevent leaks
    ScrollTrigger.getAll().forEach(t => t.kill());

    const mm = gsap.matchMedia();

    // Desktop Viewports (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      gsap.set(element, { x: "18vw", scale: 0.9, opacity: 1 });

      // 1. Hero -> About Prime Estates
      gsap.to(element, {
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
        x: "18vw",
        scale: 0.85,
        opacity: 1,
        ease: "power2.inOut",
      });

      // 2. About -> Why Choose Prime Estates
      gsap.to(element, {
        scrollTrigger: {
          trigger: "#choose-section",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
        x: "-18vw",
        scale: 0.65,
        opacity: 0.25,
        ease: "power2.inOut",
      });

      // 3. Why Choose Prime Estates -> Construction Philosophy
      gsap.to(element, {
        scrollTrigger: {
          trigger: "#philosophy-section",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
        x: "18vw",
        scale: 0.85,
        opacity: 1,
        ease: "power2.inOut",
      });

      // 4. Philosophy -> Amenities
      gsap.to(element, {
        scrollTrigger: {
          trigger: "#amenities-section",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
        x: "0vw",
        scale: 0.55,
        opacity: 0.25,
        ease: "power2.inOut",
      });

      // 5. Amenities -> Location
      gsap.to(element, {
        scrollTrigger: {
          trigger: "#location-section",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
        x: "0vw",
        scale: 0.85,
        rotation: 6,
        opacity: 1,
        ease: "power2.inOut",
      });

      // 6. Location -> Projects (Hide COMPLETELY so project cards & text have 0 overlap and 0 lag)
      gsap.to(element, {
        scrollTrigger: {
          trigger: "#projects-section",
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
        x: "0vw",
        scale: 0.4,
        rotation: 0,
        opacity: 0,
        ease: "power2.inOut",
      });

      // 7. Projects -> Testimonials (Re-appear gracefully in orbit circle)
      gsap.to(element, {
        scrollTrigger: {
          trigger: "#testimonials-section",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
        x: "0vw",
        scale: 0.85,
        rotation: -4,
        opacity: 1,
        ease: "power2.inOut",
      });

      // 8. Testimonials -> Contact
      gsap.to(element, {
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
        x: "0vw",
        scale: 0.75,
        rotation: 0,
        opacity: 1,
        ease: "power2.inOut",
      });
    });

    // Mobile / Tablet Viewports (< 1024px)
    mm.add("(max-width: 1023px)", () => {
      gsap.set(element, { x: "0vw", y: "0vh", scale: 0.65, opacity: 0.85 });

      gsap.to(element, {
        scrollTrigger: { trigger: "#about-section", start: "top bottom", end: "top top", scrub: 1 },
        scale: 0.55, opacity: 0.35, ease: "power2.inOut"
      });
      gsap.to(element, {
        scrollTrigger: { trigger: "#choose-section", start: "top bottom", end: "top top", scrub: 1 },
        scale: 0.5, opacity: 0.2, ease: "power2.inOut"
      });
      gsap.to(element, {
        scrollTrigger: { trigger: "#philosophy-section", start: "top bottom", end: "top top", scrub: 1 },
        scale: 0.55, opacity: 0.35, ease: "power2.inOut"
      });
      gsap.to(element, {
        scrollTrigger: { trigger: "#amenities-section", start: "top bottom", end: "top top", scrub: 1 },
        scale: 0.5, opacity: 0.2, ease: "power2.inOut"
      });
      gsap.to(element, {
        scrollTrigger: { trigger: "#location-section", start: "top bottom", end: "top top", scrub: 1 },
        scale: 0.7, opacity: 0.85, ease: "power2.inOut"
      });
      gsap.to(element, {
        scrollTrigger: { trigger: "#projects-section", start: "top bottom", end: "top center", scrub: 1 },
        scale: 0.4, opacity: 0, ease: "power2.inOut"
      });
      gsap.to(element, {
        scrollTrigger: { trigger: "#testimonials-section", start: "top bottom", end: "top top", scrub: 1 },
        scale: 0.65, opacity: 0.75, ease: "power2.inOut"
      });
      gsap.to(element, {
        scrollTrigger: { trigger: "#contact", start: "top bottom", end: "top top", scrub: 1 },
        scale: 0.55, opacity: 0.4, ease: "power2.inOut"
      });
    });

    return () => {
      mm.revert();
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
              src="/a9674561-d997-4bcf-86ad-eecbfd3afdbc.png"
              alt="Luxury Prime Estates Residential Floating Oasis"
              fill
              priority
              unoptimized
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 660px"
              className="object-contain drop-shadow-[0_30px_60px_rgba(201,162,39,0.16)] select-none pointer-events-none filter transform-gpu"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
