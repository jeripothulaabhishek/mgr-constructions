import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, MessageSquare, Phone } from "lucide-react";
import { BLOGS } from "@/content/blogs";
import { COMPANY } from "@/config/company";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOGS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = BLOGS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | MGR Knowledge Hub`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = BLOGS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-primary min-h-screen text-text-main font-sans py-16 text-left">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex justify-between items-center border-b border-border-accent pb-6">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-text-muted/60 hover:text-gold uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted/40">
            MGR Article Detail
          </span>
        </div>

        {/* Article Metadata Header */}
        <div className="space-y-6">
          <span className="px-3 py-1.5 rounded bg-gold/10 text-gold border border-gold/20 text-[9px] font-bold uppercase tracking-wider inline-block">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headings uppercase text-text-main leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-xs text-text-muted/80 font-medium">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gold" />
              By {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gold" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Structured Line Divider */}
        <div className="h-[1px] bg-border-accent w-full" />

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Article Text */}
          <div className="lg:col-span-8 space-y-8 font-sans leading-relaxed text-sm text-text-main/90 font-light">
            {post.content.split("\n\n").map((para, idx) => {
              // Simple markdown bold formatting check
              if (para.startsWith("1. ") || para.startsWith("2. ") || para.startsWith("3. ") || para.startsWith("4. ")) {
                const parts = para.split("**: ");
                if (parts.length > 1) {
                  const titlePart = parts[0].replace(/\*\*/g, "");
                  return (
                    <div key={idx} className="space-y-2 mt-4">
                      <h3 className="font-bold text-text-main text-base font-headings uppercase">
                        {titlePart}
                      </h3>
                      <p className="pl-4 border-l-2 border-gold/40 text-text-muted">
                        {parts[1]}
                      </p>
                    </div>
                  );
                }
              }
              return (
                <p key={idx} className="leading-loose">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Quick-Access Call-to-Action Sidebar */}
          <div className="lg:col-span-4 bg-white border border-border-accent p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-gold font-bold">
                MGR DIRECT DESK
              </span>
              <h3 className="text-sm font-bold text-text-main uppercase font-headings mt-1">
                Consult With Our MD
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed mt-2 font-light">
                Have specific layout preferences or investment queries? Reach out to our lead directors instantly.
              </p>
            </div>
            
            <div className="space-y-3 font-sans">
              <a
                href="https://wa.me/917569664945?text=Hi%20MGR%20Constructions,%20I'm%20interested%20in%20a%20property%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold tracking-widest uppercase text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp MD
              </a>
              <a
                href="tel:+917569664945"
                className="w-full py-3.5 border border-border-accent hover:border-gold hover:text-gold text-text-main bg-primary/40 rounded-lg text-xs font-bold tracking-widest uppercase text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold" />
                Call Office
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
