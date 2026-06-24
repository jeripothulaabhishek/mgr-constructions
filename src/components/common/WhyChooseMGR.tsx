"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CalendarCheck, Landmark, Award, HeartHandshake, Eye } from "lucide-react";

export default function WhyChooseMGR() {
  const cards = [
    {
      title: "Generational Structural Quality",
      desc: "Constructed with high-strength certified steel, premium aggregate concrete, and strict quality control for structures that stand the test of time.",
      icon: ShieldCheck,
    },
    {
      title: "Timely Delivery Guarantee",
      desc: "Our project timelines are systematically managed to ensure that your family moves into their new home exactly when planned.",
      icon: CalendarCheck,
    },
    {
      title: "100% Legal Transparency",
      desc: "All developments are fully HMDA approved, RERA registered, and verified for clear ownership titles to provide absolute peace of mind.",
      icon: Landmark,
    },
    {
      title: "Vastu-Compliant Architecture",
      desc: "Every residence is designed with strict adherence to Vastu principles, optimizing solar pathing, cross-ventilation, and positive energy flow.",
      icon: Eye,
    },
    {
      title: "Premium Global Brands",
      desc: "Equipped with luxury interior brands (such as Kohler, Legrand, premium teak wood, and multi-glazed soundproof glass) as standard finishes.",
      icon: Award,
    },
    {
      title: "Direct Owner Engagement",
      desc: "MGR stands for trust. We offer direct builder accessibility, regular construction updates, and proactive post-delivery care.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section 
      id="choose-section" 
      className="py-32 bg-transparent relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-30">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="luxury-label text-gold block">
            A Legacy of Trust
          </span>
          <h2 className="luxury-title text-text-main mt-3 font-headings uppercase">
            Why MGR Constructions
          </h2>
          <p className="luxury-paragraph text-text-muted mt-4 font-light">
            Our construction philosophy is built on absolute transparency, architectural mastery, and structural reliability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 glass-card rounded-2xl flex flex-col space-y-4 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300">
                <card.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main uppercase tracking-wider font-headings">
                  {card.title}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed font-light mt-2.5">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
