"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: "hero-section", label: "Home" },
  { id: "about-section", label: "About" },
  { id: "projects-section", label: "Projects" },
  { id: "location-section", label: "Locations" },
  { id: "contact", label: "Contact" },
];

export default function SectionProgress() {
  const [activeSection, setActiveSection] = useState("hero-section");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Detect when section occupies center viewport
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-5 select-none">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group relative flex items-center justify-end p-2 cursor-pointer focus:outline-none"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Tooltip text - luxury branding style */}
            <span className="absolute right-8 text-[10px] font-bold tracking-widest uppercase text-text-muted opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none font-sans bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-border-accent/40 shadow-sm">
              {sec.label}
            </span>

            {/* Inner Dot Indicator */}
            <div
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-500 ease-out ${
                isActive
                  ? "bg-gold border-gold scale-125 shadow-[0_0_8px_rgba(201,162,39,0.6)]"
                  : "bg-transparent border-text-muted/40 hover:border-gold hover:scale-110"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
