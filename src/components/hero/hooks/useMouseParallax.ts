"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMouseParallax(maxTiltRange = 6) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 90, mass: 0.6 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize position between -0.5 and 0.5 relative to screen center
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      // Set the motion values
      mouseX.set(x * maxTiltRange);
      mouseY.set(-y * maxTiltRange);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, maxTiltRange]);

  return { rotateX, rotateY };
}
