"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Users, ShieldCheck, Star } from "lucide-react";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  icon: any;
}

const METRICS: Metric[] = [
  { value: 40, suffix: "+", label: "Delivered Projects", icon: Trophy },
  { value: 150, suffix: "+", label: "Happy Families", icon: Users },
  { value: 5, suffix: "+", label: "Years Experience", icon: ShieldCheck },
  { value: 4.9, suffix: "★", label: "Customer Rating", icon: Star },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Number(start.toFixed(1)));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-2xl md:text-3xl font-bold tracking-tight text-text-main font-headings">
      {count}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

export default function TrustBar() {
  return (
    <section className="py-12 bg-white border-y border-border-accent relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left group"
              >
                {/* Gold icon container */}
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300 transform group-hover:scale-105 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex flex-col space-y-0.5">
                  <Counter value={metric.value} suffix={metric.suffix} />
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold font-sans">
                    {metric.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
