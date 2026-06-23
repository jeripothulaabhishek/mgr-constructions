import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "Engineering Blog | Real Estate Trends & Vastu Guides Hyderabad",
  description: "Read technical guides on home building standards, material audits, and vastu tips for flats in Manikonda by MGR Developers.",
};

export default function BlogPage() {
  return (
    <div className="bg-primary min-h-screen text-text-main font-sans py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Title */}
        <div className="text-left max-w-2xl">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
            KNOWLEDGE HUB
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-headings uppercase text-text-main mt-3">
            Engineering Logs
          </h1>
          <p className="text-sm text-text-muted leading-relaxed mt-2 font-light">
            Stay informed with expert insights on Vastu shastra layouts, structural safety codes, and cost estimations in Hyderabad.
          </p>
        </div>

        <div className="h-[1px] bg-border-accent w-full" />

        {/* Client-side Blog Grid */}
        <BlogList />
      </div>
    </div>
  );
}
