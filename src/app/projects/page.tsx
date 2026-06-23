import Link from "next/link";
import { Compass, MapPin, ChevronRight } from "lucide-react";
import { PROJECTS } from "@/content/projects";

export const metadata = {
  title: "Projects Portfolio | Luxury Residential Properties Hyderabad",
  description: "Browse MGR Developers' signature residential properties portfolio including Manikonda Residences and Tarnaka Platinum Enclave.",
};

export default function ProjectsPage() {
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
    <div className="bg-primary min-h-screen text-text-main font-sans py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header Title */}
        <div className="text-left max-w-2xl">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
            MGR DEVELOPERS
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-headings uppercase text-text-main mt-3">
            Real Estate Portfolio
          </h1>
          <p className="text-sm text-text-muted leading-relaxed mt-2 font-light">
            Browse our HMDA approved gated apartments and turnkey custom homes engineered for family safety and luxurious spatial design.
          </p>
        </div>

        <div className="h-[1px] bg-border-accent w-full" />

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj) => (
            <div
              key={proj.slug}
              className="glass-card rounded-2xl p-6 md:p-8 border border-border-accent flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-bold">
                    {proj.location}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${getStatusColor(proj.status)}`}>
                    {proj.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-main font-headings uppercase">
                  {proj.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-light">
                  {proj.shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border-accent text-xs">
                  <div>
                    <span className="text-[8px] text-text-muted/40 block font-bold uppercase">Specifications</span>
                    <span className="font-semibold text-text-main mt-0.5 block">{proj.specs.type.split(" ")[0]} unit</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-text-muted/40 block font-bold uppercase">Structural Scale</span>
                    <span className="font-semibold text-text-main mt-0.5 block">{proj.specs.floors}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border-accent mt-6">
                <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">
                  {proj.specs.approval}
                </span>
                <Link
                  href={`/projects/${proj.slug}`}
                  className="px-5 py-2.5 bg-primary hover:bg-gold hover:text-white border border-border-accent rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1 group cursor-pointer shadow-sm"
                >
                  Explore Layout
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
