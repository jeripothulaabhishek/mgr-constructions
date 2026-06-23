import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Disclaimer | MGR Constructions Hyderabad",
  description: "RERA disclaimers and material estimation variance notices for MGR Constructions properties and layout visualizations.",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-primary min-h-screen text-text-main font-sans py-16 text-left">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        
        {/* Back Link */}
        <div className="border-b border-border-accent pb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-text-muted/60 hover:text-gold uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold shadow-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-extrabold font-headings uppercase text-text-main">
            Disclaimer
          </h1>
          <p className="text-xs text-text-muted">Last Updated: June 23, 2026</p>
        </div>

        {/* Legal Text */}
        <div className="space-y-6 text-sm text-text-muted font-light leading-relaxed">
          <p>
            The information contained on this website (<Link href="/" className="text-gold underline">mgrconstructions.in</Link>) is for general guidance on matters of interest only. Even if MGR Constructions takes every precaution to ensure that the content of the website is both current and accurate, errors can occur.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            1. Artistic Elevation and Renderings
          </h3>
          <p>
            All architectural elevations, interior designs, landscape mockups, and layout visualization guides published across projects or the cost calculator represent **artistic concepts**. They do not constitute actual representations or final specifications of the completed building. The developer reserves the right to modify finishes, material brands, color palettes, and layouts to satisfy engineering requirements or municipal code approvals.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            2. Material Costs & Estimates Disclaimer
          </h3>
          <p>
            The calculations, pricing shares, and component budgets compiled by our **Cost Calculator** tool are generated using local benchmark standards in Hyderabad. These parameters are subject to variance and fluctuations in structural materials markets (cement, sand, aggregates, and reinforcing steel brands). They should be treated as preliminary budgeting guides, not binding contracting figures.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            3. Legal RERA & Approval Disclaimer
          </h3>
          <p>
            Specific layouts, flat configurations, and amenities details represent active ongoing clearances. Final sale deeds and Joint Development Agreements will be governed strictly by written bilateral JDA contracts and TS-RERA clearances registered for individual plots.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            4. Contact and Feedback
          </h3>
          <p>
            For any queries or concerns regarding this Disclaimer, please write to us at <a href="mailto:info@mgrconstructions.in" className="text-gold underline">info@mgrconstructions.in</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
