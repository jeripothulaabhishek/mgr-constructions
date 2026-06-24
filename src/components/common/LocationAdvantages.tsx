"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Car } from "lucide-react";

interface PinItem {
  name: string;
  time: number;
  dist: string;
  x: string;
  y: string;
  xPct: number;
  yPct: number;
  delay: number;
}

const PINS_LIST: PinItem[] = [
  {
    name: "Gachibowli (Financial Hub)",
    time: 10,
    dist: "6.0 km",
    x: "-32vw",
    y: "-5vh",
    xPct: 18,
    yPct: 45,
    delay: 0.1,
  },
  {
    name: "Financial District",
    time: 15,
    dist: "9.2 km",
    x: "-24vw",
    y: "16vh",
    xPct: 26,
    yPct: 66,
    delay: 0.3,
  },
  {
    name: "Madhapur (IT Corridor)",
    time: 12,
    dist: "7.5 km",
    x: "-28vw",
    y: "-22vh",
    xPct: 22,
    yPct: 28,
    delay: 0.2,
  },
  {
    name: "Hitech City (IT Center)",
    time: 12,
    dist: "8.0 km",
    x: "24vw",
    y: "-16vh",
    xPct: 74,
    yPct: 34,
    delay: 0.4,
  },
  {
    name: "Elite Schools (Oakridge)",
    time: 8,
    dist: "4.5 km",
    x: "28vw",
    y: "8vh",
    xPct: 78,
    yPct: 58,
    delay: 0.5,
  },
  {
    name: "Continental Hospital",
    time: 9,
    dist: "5.0 km",
    x: "18vw",
    y: "22vh",
    xPct: 68,
    yPct: 72,
    delay: 0.6,
  },
];

export default function LocationAdvantages() {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.section 
      id="location-section" 
      onViewportEnter={() => setIsInView(true)}
      className="relative min-h-screen py-32 bg-transparent overflow-hidden font-sans flex items-center justify-center"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.025),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full text-center relative z-30">
        
        {/* Title Block */}
        <div className="max-w-2xl mx-auto mb-28">
          <span className="luxury-label text-gold block">
            Hyper-Connected Location
          </span>
          <h2 className="luxury-title text-text-main mt-3 font-headings uppercase">
            Location Advantage
          </h2>
          <p className="luxury-paragraph text-text-muted mt-4 font-light">
            Enjoy premium connectivity with West Hyderabad's commercial corridors, elite education, and retail hubs.
          </p>
        </div>

        {/* Dynamic Map and Pins Container */}
        <div className="relative w-full min-h-[500px] flex items-center justify-center">
          
          {/* Central Target Coordinate (Ecosystem Centerpiece sits here) */}
          <div className="w-[150px] md:w-[260px] h-[150px] md:h-[260px] rounded-full flex items-center justify-center pointer-events-none select-none">
            <div className="w-[100px] h-[100px] rounded-full border border-gold/10 bg-gold/5 flex items-center justify-center text-gold animate-pulse">
              <MapPin className="w-5 h-5" />
            </div>
          </div>

          {/* Desktop Overlay Pins with SVG Line Connections */}
          {PINS_LIST.map((pin) => (
            <CounterPin key={pin.name} pin={pin} isInView={isInView} />
          ))}

          {/* Mobile list representation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden w-full max-w-md mx-auto pt-6 text-left">
            {PINS_LIST.map((pin) => (
              <MobileCounterItem key={pin.name} pin={pin} isInView={isInView} />
            ))}
          </div>

        </div>

      </div>
    </motion.section>
  );
}

// Sub-Component to handle single connection line, marker pulse, and odometer
function CounterPin({ pin, isInView }: { pin: PinItem; isInView: boolean }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [showMarker, setShowMarker] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // Line length calculation for SVG stroke offsets
  const dx = pin.xPct - 50;
  const dy = pin.yPct - 50;
  const lineLength = Math.sqrt(dx * dx + dy * dy);

  useEffect(() => {
    if (!isInView) return;

    // 1. Line draws itself (takes 1.0s)
    
    // 2. Pulse marker appears after line reaches target coordinates
    const markerTimeout = setTimeout(() => {
      setShowMarker(true);
    }, 800 + pin.delay * 1000);

    // 3. Time counter rolls up
    const counterTimeout = setTimeout(() => {
      let start = 0;
      const end = pin.time;
      const duration = 800; // rollup speed
      const step = Math.floor(duration / end);

      const timer = setInterval(() => {
        start += 1;
        setCurrentTime(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, step);

      return () => clearInterval(timer);
    }, 1100 + pin.delay * 1000);

    // 4. Frosted glass detail card fades in
    const cardTimeout = setTimeout(() => {
      setShowCard(true);
    }, 1300 + pin.delay * 1000);

    return () => {
      clearTimeout(markerTimeout);
      clearTimeout(counterTimeout);
      clearTimeout(cardTimeout);
    };
  }, [isInView, pin.time, pin.delay]);

  return (
    <>
      {/* SVG line drawing out from centerpiece center (50,50) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.line
          x1="50"
          y1="50"
          x2={pin.xPct}
          y2={pin.yPct}
          stroke="#C9A227"
          strokeWidth="0.25"
          strokeDasharray={lineLength}
          initial={{ strokeDashoffset: lineLength }}
          animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: lineLength }}
          transition={{ duration: 1.0, ease: "easeOut", delay: pin.delay }}
        />
      </svg>

      {/* Pulsing Target Marker */}
      {showMarker && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="absolute hidden lg:flex w-6 h-6 items-center justify-center pointer-events-none z-20"
          style={{
            left: `${pin.xPct}%`,
            top: `${pin.yPct}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="absolute w-full h-full rounded-full bg-gold/30 animate-ping" />
          <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-md" />
        </motion.div>
      )}

      {/* Elegant glass detail card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={showCard ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6 }}
        className="absolute hidden lg:flex flex-col p-4.5 glass-card rounded-2xl shadow-lg border border-border-accent z-30 min-w-[210px] text-left gap-3 pointer-events-auto"
        style={{
          left: `calc(50% + ${pin.x} - 105px)`,
          top: `calc(50% + ${pin.y} - 52px)`,
        }}
      >
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-text-main font-headings uppercase leading-tight">{pin.name}</span>
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
        </div>
        <div className="flex items-center gap-3 text-[10px] text-text-muted font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-gold" />
            {isInView ? `${currentTime} Mins` : "0 Mins"}
          </span>
          <span>•</span>
          <span>{pin.dist}</span>
        </div>
      </motion.div>
    </>
  );
}

// Mobile equivalent count rollup
function MobileCounterItem({ pin, isInView }: { pin: PinItem; isInView: boolean }) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const end = pin.time;
      const timer = setInterval(() => {
        start += 1;
        setCurrentTime(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, 60);
      return () => clearInterval(timer);
    }, 400 + pin.delay * 500);

    return () => clearTimeout(timeout);
  }, [isInView, pin.time, pin.delay]);

  return (
    <div className="p-4 glass-card rounded-xl flex items-center justify-between border border-border-accent">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-text-main font-headings uppercase">{pin.name}</span>
        <span className="text-[10px] text-text-muted mt-1 font-sans">{pin.dist} distance</span>
      </div>
      <div className="px-3 py-1.5 rounded-lg bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
        <Car className="w-3.5 h-3.5" />
        {isInView ? `${currentTime} Mins` : "0 Mins"}
      </div>
    </div>
  );
}
