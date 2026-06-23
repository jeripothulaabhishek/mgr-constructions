import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | MGR Constructions Hyderabad",
  description: "Read the terms of service, architectural copyright notices, and website usage policies of MGR Constructions.",
};

export default function TermsPage() {
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
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-extrabold font-headings uppercase text-text-main">
            Terms of Service
          </h1>
          <p className="text-xs text-text-muted">Last Updated: June 23, 2026</p>
        </div>

        {/* Legal Text */}
        <div className="space-y-6 text-sm text-text-muted font-light leading-relaxed">
          <p>
            Welcome to <strong>MGR Constructions</strong>. These terms and conditions outline the rules and regulations for the use of MGR Constructions Private Limited's Website, located at <Link href="/" className="text-gold underline">mgrconstructions.in</Link>.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            1. Intellectual Property Rights
          </h3>
          <p>
            Other than the content you own, under these Terms, MGR Constructions Private Limited and/or its licensors own all the intellectual property rights and materials contained in this Website. All rights are reserved. You are granted limited license only for purposes of viewing the material contained on this Website.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            2. Material Spec Caveats & Calculations
          </h3>
          <p>
            The estimation values, dimensions, budget allocations, and material outputs compiled using the <strong>Cost Estimator</strong> are designed to act as preliminary guidelines. They do not represent firm contractual building prices. Final execution quotes will vary depending on municipal clearance fees, soil bearing capacities, structural design sheets, and fluctuations in steel and cement markets.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            3. RERA and HMDA Clearances
          </h3>
          <p>
            MGR Constructions undertakes to register all eligible residential projects under the Telangana Real Estate Regulatory Authority (RERA) and municipal bodies (HMDA/GHMC). All flat dimensions, floor plate layouts, and handover timelines published on specific project showcase listings correspond to structural blueprints submitted for clearance approvals.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            4. Limitation of Liability
          </h3>
          <p>
            In no event shall MGR Constructions Private Limited, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. MGR Constructions Private Limited, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
          </p>
        </div>

      </div>
    </div>
  );
}
