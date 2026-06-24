"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FloatingIslandCenterpiece() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Motion values for smooth cursor parallax tilting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring physics configuration
  const springConfig = { damping: 30, stiffness: 90, mass: 0.6 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Canvas Gold Particle Emitter
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let animationFrameId: number;
      let width = (canvas.width = canvas.offsetWidth);
      let height = (canvas.height = canvas.offsetHeight);

      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      };
      window.addEventListener("resize", handleResize);

      // Particle class
      class Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        alpha: number;
        decay: number;

        constructor() {
          this.x = Math.random() * width;
          this.y = height + Math.random() * 50;
          this.size = Math.random() * 1.5 + 0.5;
          this.speedX = Math.random() * 0.2 - 0.1;
          this.speedY = -(Math.random() * 0.2 + 0.1);
          this.alpha = Math.random() * 0.2 + 0.1;
          this.decay = Math.random() * 0.001 + 0.0005;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.alpha -= this.decay;
          
          if (this.alpha <= 0 || this.y < 0) {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 20;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = -(Math.random() * 0.2 + 0.1);
            this.alpha = Math.random() * 0.2 + 0.1;
          }
        }

        draw(c: CanvasRenderingContext2D) {
          c.save();
          c.globalAlpha = this.alpha;
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          // Gold dust color
          c.fillStyle = "#C9A227";
          c.shadowBlur = 10;
          c.shadowColor = "#E2C364";
          c.fill();
          c.restore();
        }
      }

      const particles: Particle[] = Array.from({ length: 25 }, () => new Particle());

      const animateParticles = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.update();
          p.draw(ctx);
        });
        animationFrameId = requestAnimationFrame(animateParticles);
      };

      animateParticles();

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Track mouse move for interactive parallax tilt
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Map positions relative to center screen (-0.5 to 0.5)
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      // Limit tilt to 8 degrees max for v2.0 subtle premium feel
      mouseX.set(x * 8);
      mouseY.set(-y * 8);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // GSAP ScrollTrigger mapping centerpiece animations across 9 sections (8 steps)
    const element = containerRef.current;
    if (element) {
      ScrollTrigger.getAll().forEach(t => t.kill());

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#main-scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrolling scrub binding
        }
      });

      // GSAP Timeline coordinates the camera transitions through the sections
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
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
      {/* 5. Parallax Grid Background (Layer 5 - Extremely subtle, moves slightly with cursor) */}
      <motion.div
        style={{
          x: rotateY,
          y: rotateX,
        }}
        className="absolute inset-[-40px] parallax-grid-bg opacity-[0.06] pointer-events-none z-0"
      />

      {/* 2. Atmospheric Layer: Volumetric Sun Rays (Sits behind the centerpiece) */}
      <div 
        className="absolute w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.03)_0%,transparent_60%)] mix-blend-screen animate-pulse-slow pointer-events-none z-0" 
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, rgba(201,162,39,0) 0deg, rgba(201,162,39,0.02) 90deg, rgba(201,162,39,0) 180deg, rgba(201,162,39,0.02) 270deg, rgba(201,162,39,0) 360deg)",
          animation: "spin 120s linear infinite",
        }}
      />

      {/* 3. Atmospheric Layer: Gold Dust Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40"
      />

      {/* 4. Atmospheric Layer: Animated Birds flying in looping paths */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Bird 1 */}
          <path d="M-10,30 Q30,10 70,25 T110,15" fill="none" id="bird-path-1" />
          {/* Bird 2 */}
          <path d="M-10,50 Q40,30 60,60 T110,45" fill="none" id="bird-path-2" />
        </svg>

        {/* CSS-Animated Bird Silhouettes */}
        <div className="absolute w-3.5 h-1.5 text-text-muted/8 animate-[fly-bird-1_45s_linear_infinite]" style={{ left: "-5%", top: "30%" }}>
          <svg viewBox="0 0 24 12" fill="currentColor">
            <path d="M0,0 Q6,6 12,0 Q18,6 24,0 Q12,12 0,0" />
          </svg>
        </div>
        <div className="absolute w-2.5 h-1 text-text-muted/6 animate-[fly-bird-2_60s_linear_infinite]" style={{ left: "-5%", top: "50%", animationDelay: "12s" }}>
          <svg viewBox="0 0 24 12" fill="currentColor">
            <path d="M0,0 Q6,6 12,0 Q18,6 24,0 Q12,12 0,0" />
          </svg>
        </div>
      </div>

      {/* Scroll animation target wrapper (GSAP) - Reduced by 20-30% on viewports */}
      <div 
        ref={containerRef}
        className="relative w-[280px] sm:w-[380px] md:w-[460px] lg:w-[560px] xl:w-[640px] h-[280px] sm:h-[380px] md:h-[460px] lg:h-[560px] xl:h-[640px] flex items-center justify-center transition-all duration-300"
      >
        {/* Parallax tilting wrapper (Framer Motion) */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {/* Continuous floating & soft breathing scale animation wrapper (CSS Keyframes) */}
          <div className="w-full h-full relative animate-island-float flex items-center justify-center">
            {/* Terrain Shadow Layer (Pulsing out of phase with height float) */}
            <div className="absolute bottom-[22%] w-[42%] h-[5%] bg-black rounded-full pointer-events-none animate-[shadow-breathe_7s_ease-in-out_infinite]" />

            <Image
              src="/uploads/hero/floating-island.webp"
              alt="Luxury Residential Ecosystem Centerpiece - MGR Constructions"
              fill
              priority
              className="object-contain drop-shadow-[0_35px_50px_rgba(201,162,39,0.18)] filter"
            />
          </div>
        </motion.div>
      </div>

      {/* CSS Animations Injector for spin, birds, and shadow */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fly-bird-1 {
          0% { left: -5%; top: 30%; transform: scale(1) rotate(5deg); }
          50% { left: 50%; top: 22%; transform: scale(0.8) rotate(-5deg); }
          100% { left: 105%; top: 15%; transform: scale(0.6) rotate(5deg); }
        }
        @keyframes fly-bird-2 {
          0% { left: -5%; top: 52%; transform: scale(0.8) rotate(3deg); }
          50% { left: 45%; top: 40%; transform: scale(0.6) rotate(-2deg); }
          100% { left: 105%; top: 48%; transform: scale(0.5) rotate(3deg); }
        }
        @keyframes shadow-breathe {
          0%, 100% {
            transform: scale(1.05);
            opacity: 0.16;
            filter: blur(12px);
          }
          50% {
            transform: scale(0.82);
            opacity: 0.06;
            filter: blur(20px);
          }
        }
      `}</style>
    </div>
  );
}

