import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, MapPin, Compass, Landmark } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import JointVenture from "@/components/jv/JointVenture";

const LOCATIONS = [
  "flats-in-financial-district",
  "flats-in-green-valley",
  "certified-approved-apartments",
  "luxury-3bhk-residences",
  "joint-venture-partnerships",
];

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    location: loc,
  }));
}

export async function generateMetadata({ params }: LocationPageProps) {
  const { location } = await params;
  if (!LOCATIONS.includes(location)) return {};

  const details = getPageDetails(location);
  return {
    title: details.seoTitle,
    description: details.seoDescription,
    openGraph: {
      title: details.seoTitle,
      description: details.seoDescription,
    },
  };
}

function getPageDetails(slug: string) {
  switch (slug) {
    case "flats-in-financial-district":
      return {
        seoTitle: "Luxury 3BHK Flats in Financial District | Prime Estates",
        seoDescription: "Explore premium approved luxury 3BHK residences for sale in Financial District. Quality construction, modern amenities, Vastu-compliant layouts.",
        heading: "Flats in Financial District",
        badge: "Central Business Corridor",
        tagline: "Live close to major commercial hubs in our luxury 3BHK gated residences.",
        content: "Financial District is a premier residential hub. Driven by proximity to corporate headquarters, top international academies, and retail centers, Skyline Heights offers capital appreciation and a luxury lifestyle.",
        projectSlug: "skyline-heights",
        showJv: false,
      };
    case "flats-in-green-valley":
      return {
        seoTitle: "Super Luxury Apartments in Green Valley | Prime Estates",
        seoDescription: "Luxury gated community apartments for sale in Green Valley. Modern architecture, double parking, near central transit hubs.",
        heading: "Apartments in Green Valley",
        badge: "Connectivity Zone",
        tagline: "Elegant contemporary residences built for modern families in elite residential zones.",
        content: "Green Valley represents a refined residential destination. Offering smooth transit connectivity and close proximity to cultural hubs, Golden Horizon provides premium living with low-density privacy.",
        projectSlug: "golden-horizon",
        showJv: false,
      };
    case "certified-approved-apartments":
      return {
        seoTitle: "Approved & Certified Apartments | Prime Estates",
        seoDescription: "Buy legally secure, approved & RERA registered luxury apartments by Prime Estates. Clear titles, home loan approvals.",
        heading: "Certified Approved Residences",
        badge: "100% Legally Secure Properties",
        tagline: "Invest with peace of mind. All Prime Estates projects undergo complete municipal vetting before excavation.",
        content: "Purchasing a certified and RERA registered property guarantees complete safety against unauthorized layouts. We secure all permissions ensuring hassle-free bank loan approvals and clean deeds.",
        projectSlug: null,
        showJv: false,
      };
    case "luxury-3bhk-residences":
      return {
        seoTitle: "Luxury 3BHK Residences for Sale | Prime Estates",
        seoDescription: "Buy premium high-end 3BHK flats with timber floors, smart home pre-wiring, and rooftop amenities.",
        heading: "Ultra-Luxury 3BHK Flats",
        badge: "High-End Spacing Standards",
        tagline: "Spacious cross-ventilated flats designed to maximize privacy, natural light, and structural durability.",
        content: "Our luxury 3BHK specifications feature premium materials: high-strength steel, quality cement, luxury bath fittings, and customized modular kitchen configurations.",
        projectSlug: null,
        showJv: false,
      };
    case "joint-venture-partnerships":
      return {
        seoTitle: "Joint Venture Developers | Prime Estates",
        seoDescription: "Partner with Prime Estates for transparent, high-return Joint Ventures. Landowner area-sharing ratios with premium building execution.",
        heading: "Joint Venture Collaborations",
        badge: "Transparent Land Development",
        tagline: "Unlock the maximum potential value of your land with trusted premium developers.",
        content: "If you own a prime plot of 400 Sq.Yards or more, our Joint Venture (JV) partnership lets you collaborate with us. We handle 100% of the approvals, architectural design, engineering and marketing.",
        projectSlug: null,
        showJv: true,
      };
    default:
      return notFound();
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location } = await params;
  if (!LOCATIONS.includes(location)) {
    notFound();
  }

  const details = getPageDetails(location);

  const filteredProjects = details.projectSlug
    ? PROJECTS.filter((p) => p.slug === details.projectSlug)
    : PROJECTS;

  return (
    <div className="bg-primary min-h-screen text-text-main font-sans py-16 text-left">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Header Breadcrumbs */}
        <div className="border-b border-border-accent pb-6">
          <Link
            href="/"
            className="text-xs font-bold tracking-widest text-text-muted/60 hover:text-gold uppercase"
          >
            Prime Estates
          </Link>
          <span className="text-text-muted/30 mx-2">/</span>
          <span className="text-xs font-bold tracking-widest text-gold uppercase">{details.heading}</span>
        </div>

        {/* Localized Content Section */}
        <div className="space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 inline-block font-sans">
            {details.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-headings uppercase text-text-main leading-tight">
            {details.heading}
          </h1>
          <p className="text-base md:text-lg text-text-main/80 font-medium leading-relaxed max-w-3xl">
            {details.tagline}
          </p>
          <div className="h-[1px] bg-border-accent w-full my-8" />
          <p className="text-sm text-text-muted leading-relaxed font-light max-w-3xl">
            {details.content}
          </p>
        </div>

        {/* Show Local Projects */}
        {!details.showJv && (
          <div className="space-y-8 pt-8">
            <h2 className="text-xl font-bold font-headings uppercase text-text-main border-l-2 border-gold pl-3">
              Featured Projects Matching Search
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.slug}
                  className="glass-card rounded-2xl p-6 border border-border-accent flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase tracking-widest text-gold font-bold">
                      {proj.location}
                    </span>
                    <h3 className="text-lg font-bold text-text-main uppercase font-headings">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-3 leading-relaxed font-light">
                      {proj.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-border-accent mt-6 font-sans">
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                      {proj.specs.approval}
                    </span>
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="text-xs font-bold text-gold hover:text-text-main uppercase flex items-center gap-1 group"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show JV Section inline if it's the JV location page */}
        {details.showJv && (
          <div className="pt-8 border-t border-border-accent">
            <JointVenture />
          </div>
        )}

        {/* Localized SEO FAQ markup */}
        <div className="p-6 bg-white border border-border-accent rounded-2xl mt-12 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-main">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-xs font-sans">
            <div>
              <p className="font-semibold text-text-main">1. Are Prime Estates projects safe for property registration?</p>
              <p className="text-text-muted mt-1 leading-relaxed font-light">
                Absolutely. Every Prime Estates building maintains RERA clearance and layout compliance, validating clean legal titles before possession.
              </p>
            </div>
            <div>
              <p className="font-semibold text-text-main">2. Can I get a home loan for flats in Financial District or Green Valley?</p>
              <p className="text-text-muted mt-1 leading-relaxed font-light">
                Yes. Due to our legal approvals, our properties are pre-approved for residential home loans by top financial institutions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
