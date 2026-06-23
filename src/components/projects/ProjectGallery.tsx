"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Home, Eye, Sparkles } from "lucide-react";
import { ProjectGallery as GalleryType } from "@/types";

interface ProjectGalleryProps {
  images: GalleryType;
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [activeTab, setActiveTab] = useState<keyof GalleryType>("exterior");

  const tabs = [
    { key: "exterior", label: "Exterior View", icon: Eye, description: "Elegant contemporary front elevation design." },
    { key: "interior", label: "Interior Spaces", icon: Home, description: "Spacious sun-lit family lounges and bedrooms." },
    { key: "floorPlan", label: "Floor Plans", icon: Compass, description: "HMDA-approved spatial dimension layouts." },
    { key: "amenities", label: "Luxury Perks", icon: Sparkles, description: "Fitness hub and children play park concepts." },
  ];

  const getTabDetails = (tab: keyof GalleryType) => {
    switch (tab) {
      case "exterior":
        return {
          title: "Timeless Elevation",
          specs: ["Double-glazed acoustic window walls", "Premium wood paneling finishes", "Lush architectural lighting layers"],
        };
      case "interior":
        return {
          title: "Refined Family Interiors",
          specs: ["Italian marble flooring options", "Custom modular wardrobes pre-wire", "Generous double-height ceiling plans"],
        };
      case "floorPlan":
        return {
          title: "Vastu Area Layouts",
          specs: ["Zero space wastage column structures", "Cross-ventilated dual balcony decks", "Optimal privacy margin boundaries"],
        };
      case "amenities":
        return {
          title: "Community Amenities",
          specs: ["Infinity deck family swimming pool", "Rooftop landscaping garden area", "24/7 CCTV surveillance checkpoints"],
        };
    }
  };

  const activeDetails = getTabDetails(activeTab);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
      {/* Left 8 columns: Viewer */}
      <div className="lg:col-span-8 flex flex-col space-y-4">
        <div className="relative h-[300px] md:h-[480px] bg-primary border border-border-accent rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
          
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,rgba(250,248,244,1)_100%)] pointer-events-none" />

          {/* Rendering Active View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 p-6 flex flex-col justify-between"
            >
              {/* Image renderer */}
              {images[activeTab] && !images[activeTab].includes("placeholder") && !images[activeTab].includes("interior") && !images[activeTab].includes("floorplan") && !images[activeTab].includes("amenity") ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={images[activeTab]}
                    alt={`${projectTitle} ${tabs.find((t) => t.key === activeTab)?.label}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                </div>
              ) : null}

              <div className="flex justify-between items-center z-10 pointer-events-none">
                <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 border rounded-lg shadow-sm ${
                  images[activeTab] && !images[activeTab].includes("placeholder") && !images[activeTab].includes("interior") && !images[activeTab].includes("floorplan") && !images[activeTab].includes("amenity")
                    ? "bg-black/40 border-white/10 text-white"
                    : "bg-white border-border-accent text-gold"
                }`}>
                  {tabs.find((t) => t.key === activeTab)?.label}
                </span>
                <span className={`text-[9px] font-mono ${
                  images[activeTab] && !images[activeTab].includes("placeholder") && !images[activeTab].includes("interior") && !images[activeTab].includes("floorplan") && !images[activeTab].includes("amenity")
                    ? "text-white/40"
                    : "text-text-muted/40"
                }`}>MODEL: MGR-{activeTab.toUpperCase()}</span>
              </div>

              {/* Vector house outline placeholder fallback if no image */}
              {(!images[activeTab] || images[activeTab].includes("placeholder") || images[activeTab].includes("interior") || images[activeTab].includes("floorplan") || images[activeTab].includes("amenity")) && (
                <div className="flex-1 flex flex-col items-center justify-center opacity-30 select-none pointer-events-none my-6">
                  <Home className="w-16 h-16 text-gold animate-float" />
                  <span className="text-[9px] text-text-main uppercase tracking-widest font-mono font-bold mt-4 block">
                    {projectTitle} Layout View
                  </span>
                </div>
              )}

              {/* Spacing push */}
              {images[activeTab] && !images[activeTab].includes("placeholder") && !images[activeTab].includes("interior") && !images[activeTab].includes("floorplan") && !images[activeTab].includes("amenity") && (
                <div className="flex-1" />
              )}

              <div className={`z-10 p-4 rounded-xl border text-left max-w-md pointer-events-none shadow-sm ${
                images[activeTab] && !images[activeTab].includes("placeholder") && !images[activeTab].includes("interior") && !images[activeTab].includes("floorplan") && !images[activeTab].includes("amenity")
                  ? "bg-white/95 border-border-accent"
                  : "bg-white border-border-accent"
              }`}>
                <span className="text-xs font-bold text-text-main font-headings uppercase block">
                  {activeDetails.title}
                </span>
                <span className="text-[10px] text-text-muted mt-1 block font-light leading-relaxed">
                  {tabs.find((t) => t.key === activeTab)?.description}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between h-20 transition-all cursor-pointer shadow-sm ${
                  isActive
                    ? "bg-gold/10 border-gold text-gold"
                    : "bg-white border-border-accent text-text-muted hover:border-gold hover:text-gold"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider block mt-2">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right 4 columns: Specs panel */}
      <div className="lg:col-span-4 glass-card rounded-2xl p-6 border border-border-accent flex flex-col justify-between text-left bg-white shadow-md">
        <div className="space-y-6">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-gold font-bold">
              TIMELINES & BRANDS
            </span>
            <h3 className="text-base font-bold text-text-main uppercase tracking-wider font-headings mt-1">
              Finishes Matrix
            </h3>
            <p className="text-xs text-text-muted leading-relaxed mt-2 font-light">
              Toggle options on the left to verify design specs and materials setup for {projectTitle}.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-border-accent">
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted/50 block">
              Configured Details
            </span>
            <ul className="space-y-3">
              {activeDetails.specs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-text-muted font-light">
                  <span className="w-4.5 h-4.5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("open-site-visit"));
            }
          }}
          className="w-full py-4 bg-gold text-white hover:bg-text-main rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer mt-8"
        >
          Book Site Visit
        </button>
      </div>
    </div>
  );
}
