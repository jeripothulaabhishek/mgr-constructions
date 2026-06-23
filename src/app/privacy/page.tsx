import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | MGR Constructions Hyderabad",
  description: "Learn about how MGR Constructions Private Limited collects, stores, and handles landowner inquiries and home buyer leads.",
};

export default function PrivacyPage() {
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
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-extrabold font-headings uppercase text-text-main">
            Privacy Policy
          </h1>
          <p className="text-xs text-text-muted">Last Updated: June 23, 2026</p>
        </div>

        {/* Legal Text */}
        <div className="space-y-6 text-sm text-text-muted font-light leading-relaxed">
          <p>
            At <strong>MGR Constructions Private Limited</strong>, accessible from <Link href="/" className="text-gold underline">mgrconstructions.in</Link>, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information we collect and record, and how we use it.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            1. Consent
          </h3>
          <p>
            By submitting inquiries, newsletters, cost calculations, or using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            2. Information We Collect
          </h3>
          <p>
            We collect personal information directly when you fill out contact forms, JV consultation worksheets, newsletter requests, or pricing estimators:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Identity Details:</strong> Name, email address, phone number.</li>
            <li><strong>Real Estate Context:</strong> Land size, plot locations, build specifications.</li>
            <li><strong>Submission Context:</strong> Inquiry descriptions, preferred site visit schedules.</li>
          </ul>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            3. How We Use Your Information
          </h3>
          <p>
            We utilize the collected parameters strictly for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Processing cost estimates and routing leads to customer support desk.</li>
            <li>Registering site inspections and coordinating joint development agreements.</li>
            <li>Logging entries inside secure Google Sheets for corporate backup.</li>
            <li>Dispatches of welcome alerts and newsletters.</li>
          </ul>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            4. Security of Data
          </h3>
          <p>
            We enforce Secure Sockets Layer (SSL) transmission boundaries and employ Cloudflare Turnstile token checks to prevent bot spam. We do not distribute, lease, or sell contact listings to secondary advertising networks.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            5. Contact Information
          </h3>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:info@mgrconstructions.in" className="text-gold underline">info@mgrconstructions.in</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
