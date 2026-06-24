"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShieldCheck, MapPin, Building, Key } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/content/projects";

export default function ProjectsFeatured() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);

  const proj1 = PROJECTS[0];
  const proj2 = PROJECTS[1];

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const pin = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=120%", 
      pin: true,
      scrub: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1,
      }
    });

    if (slide1Ref.current && slide2Ref.current) {
      tl.to(slide1Ref.current, {
        opacity: 0,
        scale: 0.9,
        y: "-5vh",
        duration: 1,
        ease: "power1.inOut",
      })
      .fromTo(slide2Ref.current, 
        { opacity: 0, scale: 0.95, y: "5vh" },
        { 
          opacity: 1, 
          scale: 1, 
          y: "0vh",
          duration: 1, 
          ease: "power1.inOut" 
        },
        "-=0.7" 
      );
    }

    return () => {
      pin.kill();
      tl.kill();
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-amber-500/10 text-gold border-gold/20";
      case "Ongoing":
        return "bg-sky-500/10 text-sky-600 border-sky-500/20";
      default:
        return "bg-gold/10 text-gold border-gold/25";
    }
  };

  return (
    <div 
      ref={containerRef} 
      id="projects-section" 
      className="relative h-screen w-full bg-transparent overflow-hidden flex items-center justify-center font-sans z-30"
    >
      {/* Background blueprint patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.015),transparent_70%)] pointer-events-none" />

      {/* Slide 1: Manikonda Residences */}
      <div 
        ref={slide1Ref}
        className="absolute inset-0 w-full h-full flex items-center justify-center px-6 sm:px-12 pointer-events-auto"
      >
        {proj1 && (
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center group/card">
            {/* Left: Render Image (Cinematic 16:10 Aspect, Spans 6 Columns) */}
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-border-accent/40 group-hover/card:border-gold/50 transition-all duration-700">
              <Image
                src={proj1.images.exterior}
                alt={proj1.title}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className={`absolute top-6 right-6 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border backdrop-blur-md ${getStatusColor(proj1.status)}`}>
                {proj1.status}
              </span>
            </div>

            {/* Right: Technical Specs & Storytelling (Spans 6 Columns) */}
            <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
              <div className="space-y-2">
                <span className="luxury-label text-gold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {proj1.location}
                </span>
                <h3 className="luxury-title text-text-main font-headings uppercase">
                  {proj1.title}
                </h3>
              </div>

              <p className="luxury-paragraph text-text-muted font-light leading-relaxed">
                {proj1.shortDescription}
              </p>

              {/* Specification Grid */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-border-accent/40">
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted/50 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Building className="w-3 h-3 text-gold" /> Config
                  </span>
                  <span className="text-xs font-bold text-text-main mt-1 uppercase">{proj1.specs.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted/50 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Key className="w-3 h-3 text-gold" /> Scale
                  </span>
                  <span className="text-xs font-bold text-text-main mt-1 uppercase">{proj1.specs.floors}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted/50 font-bold uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-gold" /> Status
                  </span>
                  <span className="text-xs font-bold text-emerald-600 mt-1 uppercase">Ongoing</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-6 pt-2">
                <Link
                  href={`/projects/${proj1.slug}`}
                  className="px-6 py-3.5 bg-gold hover:bg-text-main text-white rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-500 shadow-md hover:shadow-gold/10 flex items-center gap-2 group cursor-pointer border border-gold/20 transform group-hover/card:-translate-y-1"
                >
                  Explore Residences
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects"
                  className="luxury-label text-text-muted hover:text-gold uppercase transition-colors"
                >
                  All Developments
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide 2: Platinum Enclave (Fades in on scroll) */}
      <div 
        ref={slide2Ref}
        className="absolute inset-0 w-full h-full flex items-center justify-center px-6 sm:px-12 opacity-0 pointer-events-none"
        style={{ pointerEvents: "auto" }}
      >
        {proj2 && (
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center group/card">
            {/* Left: Render Image (Cinematic 16:10 Aspect, Spans 6 Columns) */}
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-border-accent/40 group-hover/card:border-gold/50 transition-all duration-700">
              <Image
                src={proj2.images.exterior}
                alt={proj2.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className={`absolute top-6 right-6 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border backdrop-blur-md ${getStatusColor(proj2.status)}`}>
                {proj2.status}
              </span>
            </div>

            {/* Right: Technical Specs & Storytelling (Spans 6 Columns) */}
            <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
              <div className="space-y-2">
                <span className="luxury-label text-gold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {proj2.location}
                </span>
                <h3 className="luxury-title text-text-main font-headings uppercase">
                  {proj2.title}
                </h3>
              </div>

              <p className="luxury-paragraph text-text-muted font-light leading-relaxed">
                {proj2.shortDescription}
              </p>

              {/* Specification Grid */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-border-accent/40">
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted/50 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Building className="w-3 h-3 text-gold" /> Config
                  </span>
                  <span className="text-xs font-bold text-text-main mt-1 uppercase">{proj2.specs.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted/50 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Key className="w-3 h-3 text-gold" /> Scale
                  </span>
                  <span className="text-xs font-bold text-text-main mt-1 uppercase">{proj2.specs.floors}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted/50 font-bold uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-gold" /> Status
                  </span>
                  <span className="text-xs font-bold text-amber-600 mt-1 uppercase">Launching</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-6 pt-2">
                <Link
                  href={`/projects/${proj2.slug}`}
                  className="px-6 py-3.5 bg-gold hover:bg-text-main text-white rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-500 shadow-md hover:shadow-gold/10 flex items-center gap-2 group cursor-pointer border border-gold/20 transform group-hover/card:-translate-y-1"
                >
                  Explore Residences
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects"
                  className="luxury-label text-text-muted hover:text-gold uppercase transition-colors"
                >
                  All Developments
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
