"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import Image from "next/image";

interface TestimonialCard {
  id: string;
  name: string;
  role: string;
  project: string;
  familyType: string;
  feedback: string;
  image: string;
  position: string;
  animationClass: string;
}

const FEATURED_REVIEWS: TestimonialCard[] = [
  {
    id: "t1",
    name: "Dr. K. Srinivas Rao",
    role: "Landowner & Partner",
    project: "Manikonda Joint Venture",
    familyType: "Joint Family Stakeholder",
    feedback: "Partnering with MGR for our Joint Venture plot in Manikonda was seamless. Their team managed the clearances transparently, and we received our share of flats exactly on time.",
    image: "/uploads/testimonials/homeowner_3.png", // Retired exec
    position: "lg:top-8 lg:left-8",
    animationClass: "animate-[drift-1_8s_ease-in-out_infinite]",
  },
  {
    id: "t2",
    name: "Divya Deshmukh",
    role: "Homeowner",
    project: "MGR Manikonda Residences",
    familyType: "4-Member Family",
    feedback: "We wanted a home where our children could grow up safely close to Delhi Public School. The natural light in our 3BHK is beautiful, and the customer team was incredibly helpful.",
    image: "/uploads/testimonials/homeowner_2.png", // Businesswoman / mother
    position: "lg:top-28 lg:right-10",
    animationClass: "animate-[drift-2_9s_ease-in-out_infinite]",
  },
  {
    id: "t3",
    name: "Abhinav Reddy",
    role: "Custom Villa Client",
    project: "Gachibowli Signature Villa",
    familyType: "Multi-generational Homeowner",
    feedback: "MGR built our family villa in Gachibowli. Their team took care of all approvals, keeping us updated on material logs weekly. The final layout aligns perfectly with Vastu.",
    image: "/uploads/testimonials/homeowner_1.png", // Young executive
    position: "lg:bottom-12 lg:left-12",
    animationClass: "animate-[drift-3_7.5s_ease-in-out_infinite]",
  },
];

export default function TestimonialSlider() {
  return (
    <section 
      id="testimonials-section" 
      className="py-32 bg-transparent relative overflow-hidden font-sans min-h-screen flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-30">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
            Homeowner Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-text-main mt-3 font-headings uppercase tracking-tight">
            Ecosystem Testimonials
          </h2>
          <p className="text-sm text-text-muted mt-3 leading-relaxed font-light">
            Read how Hyderabad families and landowners experience trust, comfort, and premium living with MGR.
          </p>
        </div>

        {/* Orbit container */}
        <div className="relative w-full min-h-[560px] flex items-center justify-center">
          
          {/* Central space for the centerpiece (remains empty to display the Testimonials stage centerpiece) */}
          <div className="w-[180px] md:w-[280px] h-[180px] md:h-[280px] rounded-full pointer-events-none select-none flex items-center justify-center">
            <div className="w-[120px] h-[120px] bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.02)_0%,transparent_60%)] rounded-full blur-lg pointer-events-none" />
          </div>

          {/* Testimonials Orbit Cards */}
          {FEATURED_REVIEWS.map((active) => (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`lg:absolute ${active.position} ${active.animationClass} p-5 glass-card rounded-2xl shadow-lg border border-border-accent z-30 max-w-[310px] text-left hidden lg:flex flex-col justify-between min-h-[220px] bg-white/70 backdrop-blur-md pointer-events-auto`}
            >
              <div className="absolute top-4 right-4 text-gold/10 pointer-events-none">
                <MessageSquare className="w-8 h-8" />
              </div>
              
              <div className="space-y-3.5 z-10">
                <div className="flex items-center space-x-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-[10px] text-text-main leading-relaxed font-light italic">
                  "{active.feedback}"
                </p>
              </div>

              {/* Profile Block with Photo */}
              <div className="border-t border-border-accent/40 pt-3.5 mt-4 flex items-center gap-3 z-10">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold/20 shadow-sm shrink-0">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-main font-headings uppercase leading-none">{active.name}</span>
                  <span className="text-[8px] text-text-muted mt-1 leading-none">{active.role}</span>
                  <span className="text-[7px] text-gold uppercase tracking-wider font-bold mt-0.5 leading-none">{active.project} • {active.familyType}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Mobile Stacking Representation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden w-full max-w-lg mx-auto text-left">
            {FEATURED_REVIEWS.map((active) => (
              <div key={active.id} className="p-6 glass-card rounded-2xl border border-border-accent bg-white/80 backdrop-blur-sm relative flex flex-col justify-between min-h-[200px]">
                <div className="space-y-3">
                  <div className="flex items-center space-x-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-text-main leading-relaxed font-light italic">
                    "{active.feedback}"
                  </p>
                </div>
                <div className="border-t border-border-accent/40 pt-4 mt-4 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/20 shrink-0">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-main font-headings uppercase leading-none">{active.name}</span>
                    <span className="text-[9px] text-text-muted mt-1 leading-none">{active.role}</span>
                    <span className="text-[8px] text-gold uppercase tracking-wider font-bold mt-0.5 leading-none">{active.project}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Global inject for testimonials 3D drift keyframes */}
      <style jsx global>{`
        @keyframes drift-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0.3deg); }
          50% { transform: translateY(-12px) translateX(6px) rotate(-0.3deg); }
        }
        @keyframes drift-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(-0.3deg); }
          50% { transform: translateY(12px) translateX(-5px) rotate(0.3deg); }
        }
        @keyframes drift-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0.2deg); }
          50% { transform: translateY(-8px) translateX(-6px) rotate(-0.2deg); }
        }
      `}</style>
    </section>
  );
}
