"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Landmark, Compass, ChevronRight, Check, MapPin } from "lucide-react";
import { PROJECTS } from "@/content/projects";

export default function ProjectsFeatured() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Launching":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Ongoing":
        return "bg-sky-500/10 text-sky-600 border-sky-500/20";
      case "Ready To Move":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Sold Out":
      default:
        return "bg-red-500/10 text-red-600 border-red-500/20";
    }
  };

  return (
    <section id="projects" className="py-24 bg-primary relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
              SIGNATURE DEVELOPMENTS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mt-3 font-headings uppercase">
              Featured Luxury Residences
            </h2>
            <p className="text-sm text-text-muted mt-3 leading-relaxed font-light">
              Explore our premium residential properties built for families seeking comfort and long-term asset value.
            </p>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-xs font-bold tracking-widest text-gold hover:text-text-main uppercase transition-colors w-max cursor-pointer"
          >
            Explore Complete Portfolio
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-border-accent bg-white shadow-md hover:shadow-xl transition-all duration-300 text-left"
            >
              {/* Image box placeholder */}
              <div className="h-64 relative bg-alternate overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.05)_0%,transparent_80%)]" />
                
                {/* Blueprint lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(201,162,39,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,39,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

                <div className="absolute inset-x-6 bottom-6 flex justify-between items-end z-20">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gold">
                      {proj.location}
                    </span>
                    <h3 className="text-xl font-bold text-text-main font-headings uppercase mt-1">
                      {proj.title}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${getStatusColor(proj.status)}`}>
                    {proj.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-xs text-text-muted leading-relaxed font-light">
                  {proj.shortDescription}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border-accent text-xs">
                  <div>
                    <span className="text-[9px] text-text-muted/40 block font-bold uppercase">Setup</span>
                    <span className="font-semibold text-text-main mt-0.5 block">{proj.specs.type.split(" ")[0]} unit</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-text-muted/40 block font-bold uppercase">Scale</span>
                    <span className="font-semibold text-text-main mt-0.5 block">{proj.specs.floors.split(" ")[0]} FL</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-text-muted/40 block font-bold uppercase">Units</span>
                    <span className="font-semibold text-text-main mt-0.5 block">{proj.specs.units} units</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-text-muted/40 block font-bold uppercase">Size</span>
                    <span className="font-semibold text-text-main mt-0.5 block">{proj.specs.sizeRange.split(" ")[0]} Ft</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-text-muted font-bold uppercase tracking-wider">
                  {proj.amenities.slice(0, 3).map((amen) => (
                    <span key={amen} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                      {amen}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border-accent/40">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] uppercase tracking-widest text-text-muted/40 font-bold">Clearances</span>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide mt-0.5">
                      {proj.specs.approval}
                    </span>
                  </div>
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="px-5 py-3 bg-primary hover:bg-gold hover:text-white border border-border-accent rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 group cursor-pointer shadow-sm"
                  >
                    View Residences
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
