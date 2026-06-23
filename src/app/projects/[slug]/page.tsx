import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Download, Calendar, HardHat } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import ProjectGallery from "@/components/projects/ProjectGallery";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Luxury Homes in ${project.location.split(",")[0]} | MGR Developers`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

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
        {/* Back Link Breadcrumb */}
        <div className="flex justify-between items-center border-b border-border-accent pb-6">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-text-muted/60 hover:text-gold uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted/40">
            MGR Project details
          </span>
        </div>

        {/* Project Header Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-md">
                {project.specs.approval}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-headings uppercase text-text-main leading-tight">
              {project.title}
            </h1>
            <p className="flex items-center gap-1.5 text-xs text-text-muted">
              <MapPin className="w-4 h-4 text-gold" />
              {project.location}
            </p>
          </div>

          {/* Quick Stats Column */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 bg-white border border-border-accent p-5 rounded-2xl shadow-sm">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-text-muted/40 block font-bold">Floors</span>
              <span className="text-sm font-bold text-text-main mt-1 block">{project.specs.floors}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-text-muted/40 block font-bold">Total Units</span>
              <span className="text-sm font-bold text-text-main mt-1 block">{project.specs.units} Exclusive</span>
            </div>
            <div className="mt-2">
              <span className="text-[9px] uppercase tracking-widest text-text-muted/40 block font-bold">Slab Sizes</span>
              <span className="text-sm font-bold text-text-main mt-1 block">{project.specs.sizeRange}</span>
            </div>
            <div className="mt-2">
              <span className="text-[9px] uppercase tracking-widest text-text-muted/40 block font-bold">Configurations</span>
              <span className="text-sm font-bold text-text-main mt-1 block">{project.specs.type.split(" ")[0]} Unit</span>
            </div>
          </div>
        </div>

        {/* Project Detailed Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-lg font-bold text-text-main uppercase tracking-wider font-headings border-l-2 border-gold pl-3">
              Overview & Lifestyle Design
            </h3>
            <p className="text-sm text-text-muted leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Construction Progress Meter */}
          <div className="lg:col-span-4 space-y-4 bg-white border border-border-accent p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-gold">
              <HardHat className="w-5 h-5" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-main">
                Construction Timeline
              </h4>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed font-light mt-2">
              Our engineering progress metrics are updated monthly, representing structural castings and finishes handovers.
            </p>
            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-xs font-semibold text-text-muted">
                <span>Civil Execution State</span>
                <span className="text-gold">{project.progressPercent}% Completed</span>
              </div>
              <div className="w-full h-2 bg-primary border border-border-accent rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-1000"
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Configurator */}
        <div className="py-8 border-t border-border-accent">
          <div className="mb-10">
            <h3 className="text-lg font-bold text-text-main uppercase tracking-wider font-headings">
              Property Layout Configurator
            </h3>
            <p className="text-xs text-text-muted font-sans mt-2 font-light">
              Toggle tabs to explore exterior dimensions, model floor planning sheets, and finishes checklist.
            </p>
          </div>
          <ProjectGallery images={project.images} projectTitle={project.title} />
        </div>

        {/* Landmarks & Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-border-accent">
          
          {/* Amenities checklist */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-text-main uppercase tracking-wider font-headings">
              Premium Home Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.amenities.map((item) => (
                <div key={item} className="flex gap-2.5 items-center bg-white border border-border-accent p-3.5 rounded-xl text-xs text-text-muted shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landmarks Table */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-text-main uppercase tracking-wider font-headings">
              Location Landmarks
            </h3>
            <div className="border border-border-accent rounded-xl overflow-hidden text-xs shadow-sm bg-white">
              <div className="grid grid-cols-12 bg-primary border-b border-border-accent p-3 text-text-muted font-bold uppercase tracking-wider text-[10px]">
                <div className="col-span-8">Landmark Place</div>
                <div className="col-span-4 text-right">Estimated Drive</div>
              </div>
              <div className="divide-y divide-border-accent">
                {project.landmarks.map((mark) => (
                  <div key={mark.name} className="grid grid-cols-12 p-3.5 items-center">
                    <div className="col-span-8 font-semibold text-text-main/80 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      {mark.name}
                    </div>
                    <div className="col-span-4 text-right text-gold font-bold">{mark.distance}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
