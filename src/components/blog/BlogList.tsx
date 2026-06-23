import Link from "next/link";
import { BLOGS } from "@/content/blogs";
import { BookOpen, Calendar, User, ChevronRight } from "lucide-react";

export default function BlogList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left font-sans">
      {BLOGS.map((post) => (
        <div
          key={post.slug}
          className="glass-card rounded-2xl p-6 border border-border-accent bg-white flex flex-col justify-between h-[380px] relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[9px] text-text-muted/40 font-mono">
              <span className="px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20 font-sans font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h3 className="text-base font-bold text-text-main group-hover:text-gold transition-colors font-headings uppercase line-clamp-2">
              {post.title}
            </h3>

            <p className="text-xs text-text-muted leading-relaxed font-light line-clamp-3">
              {post.summary}
            </p>
          </div>

          {/* Author & Footer details */}
          <div className="pt-6 border-t border-border-accent mt-6 flex justify-between items-end">
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-text-muted/60 flex items-center gap-1">
                <User className="w-3 h-3 text-gold" />
                {post.author.split(" ")[0]}
              </span>
              <span className="text-[9px] text-text-muted/40 mt-0.5 flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="text-xs font-bold text-gold hover:text-text-main uppercase flex items-center gap-0.5 group cursor-pointer"
            >
              Read Log
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
