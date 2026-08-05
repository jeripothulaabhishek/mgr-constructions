"use client";

export function useFloatingAnimation(duration = 6, yOffset = 10, rotateOffset = 1) {
  return {
    y: {
      animate: {
        y: [-yOffset, yOffset, -yOffset],
      },
      transition: {
        duration,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    },
    rotate: {
      animate: {
        rotate: [-rotateOffset, rotateOffset, -rotateOffset],
      },
      transition: {
        duration: duration * 1.2, // Slightly offset timing for natural feel
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };
}
