import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact & Communication Policy | MGR Constructions Hyderabad",
  description: "Learn about our communication consent terms, opt-in details, and opt-out channels for emails, calls, and WhatsApp notifications.",
};

export default function ContactPolicyPage() {
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
            <MessageSquare className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-extrabold font-headings uppercase text-text-main">
            Contact Policy
          </h1>
          <p className="text-xs text-text-muted">Last Updated: June 23, 2026</p>
        </div>

        {/* Legal Text */}
        <div className="space-y-6 text-sm text-text-muted font-light leading-relaxed">
          <p>
            At <strong>MGR Constructions Private Limited</strong>, we value transparent and respectful client relationships. This Communication and Contact Policy defines the parameters under which we connect with visitors who submit their details to our lead portal.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            1. Consent to Contact & Opt-In
          </h3>
          <p>
            By submitting your name, email, and Indian telephone number across our forms (Contact, Cost Calculator, JV Consultation, Gated brochure download, or Newsletter subscription), you explicitly grant <strong>MGR Constructions</strong> and its authorized customer support team permission to contact you.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            2. Channels of Communication
          </h3>
          <p>
            Our customer relations team will contact you using the following mediums:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Telephone Calls:</strong> For booking site tours, clarifying layout preferences, or discussing land surveys.</li>
            <li><strong>WhatsApp Messages:</strong> To dispatch floor plan sheets, RERA certificates, and pre-filled site visit directions.</li>
            <li><strong>Email:</strong> Dispatches of welcome notifications, newsletter updates, and Cost Calculator worksheets.</li>
          </ul>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            3. Operational Timeframes
          </h3>
          <p>
            We strictly limit telephone communications to standard business hours: **Monday to Saturday, 9:00 AM to 7:00 PM**. Emergency notifications or scheduled site visits outside these hours will proceed only with your prior explicit consent.
          </p>

          <h3 className="font-bold text-text-main uppercase font-headings text-sm pt-2">
            4. Opt-Out & Do Not Disturb (DND)
          </h3>
          <p>
            You retain full control over your subscription preferences. If you wish to cease receiving communication from MGR:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Email "UNSUBSCRIBE" to <a href="mailto:info@mgrconstructions.in" className="text-gold underline">info@mgrconstructions.in</a>.</li>
            <li>Reply "STOP" to any WhatsApp communication sent by our team.</li>
            <li>Request our support consultant during any phone call to flag your record in our database as "Do Not Call".</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
