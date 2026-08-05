"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      glowColor: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 1.8 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.alpha = Math.random() * 0.25 + 0.1;
        this.decay = Math.random() * 0.0008 + 0.0003;
        this.glowColor = "#C9A227"; // Luxury gold dust
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;

        // Reset particle if off-screen or faded out
        if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.x = Math.random() * width;
          this.y = height + Math.random() * 20;
          this.size = Math.random() * 1.8 + 0.5;
          this.speedX = Math.random() * 0.3 - 0.15;
          this.speedY = -(Math.random() * 0.4 + 0.1);
          this.alpha = Math.random() * 0.25 + 0.1;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.glowColor;
        c.shadowBlur = 8;
        c.shadowColor = "#E2C364";
        c.fill();
        c.restore();
      }
    }

    // Keep particles light to preserve 60 FPS performance
    const particleCount = 20;
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30 mix-blend-screen"
    />
  );
}
