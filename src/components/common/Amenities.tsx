"use client";

import { motion } from "framer-motion";
import { Waves, Dumbbell, Film, GlassWater, Baby, ShieldCheck, Car, Trees } from "lucide-react";

interface AmenityItem {
  name: string;
  desc: string;
  icon: any;
}

const AMENITIES_LIST: AmenityItem[] = [
  { name: "Swimming Pool", desc: "Infinity deck pool for family leisure.", icon: Waves },
  { name: "Fully Equipped Gym", desc: "Premium cardiovascular & weight gear.", icon: Dumbbell },
  { name: "Private Home Theatre", desc: "Acoustic lounge for family cinema nights.", icon: Film },
  { name: "Luxury Clubhouse", desc: "Elegant community lounge & event space.", icon: GlassWater },
  { name: "Children Play Area", desc: "Safe sand pit & kids recreation slides.", icon: Baby },
  { name: "24/7 Smart Security", desc: "CCTV corridors & biometric gate locks.", icon: ShieldCheck },
  { name: "Covered Parking", desc: "Spacious individual double-slot parking.", icon: Car },
  { name: "Landscaped Gardens", desc: "Scenic walk pathways & yoga lawns.", icon: Trees },
];

export default function Amenities() {
  return (
    <section 
      id="amenities-section" 
      className="py-32 bg-transparent relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-30">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
            World-Class Comfort
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-main mt-3 font-headings uppercase">
            Curated Amenities
          </h2>
          <p className="text-sm text-text-muted mt-3 leading-relaxed font-light">
            Indulge in spaces designed to support health, recreation, and secure community living for every generation.
          </p>
        </div>

        {/* Amenities Grid: Cards animate upward with a staggered delay */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {AMENITIES_LIST.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.08, type: "spring", stiffness: 50 }}
                className="p-6 bg-white/90 glass-card rounded-2xl flex flex-col text-left space-y-4 shadow-sm hover:border-gold hover:shadow-md transition-all duration-300 group"
              >
                {/* Gold Circle Icon Box */}
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-text-main uppercase tracking-wider font-headings">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-text-muted leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
