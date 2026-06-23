import Hero from "@/components/hero/Hero";
import TrustBar from "@/components/hero/TrustBar";
import AboutSection from "@/components/common/AboutSection";
import Services from "@/components/services/Services";
import Amenities from "@/components/common/Amenities";
import CostCalculator from "@/components/forms/CostCalculator";
import ProjectsFeatured from "@/components/projects/ProjectsFeatured";
import JointVenture from "@/components/jv/JointVenture";
import TestimonialSlider from "@/components/testimonials/TestimonialSlider";
import FAQSection from "@/components/common/FAQSection";
import ContactForm from "@/components/forms/ContactForm";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Showcase */}
      <Hero />

      {/* Trust & Rating Counters */}
      <TrustBar />

      {/* About Us Story (Generational Homes) */}
      <AboutSection />

      {/* Services Grid */}
      <Services />

      {/* Luxury Amenities Illustrated Grid */}
      <Amenities />

      {/* Cost Calculator Section */}
      <CostCalculator />

      {/* Property Featured Listings */}
      <ProjectsFeatured />

      {/* Landowner Joint Venture Partnership Panel */}
      <JointVenture />

      {/* Client Reviews Slider */}
      <TestimonialSlider />

      {/* FAQ accordion */}
      <FAQSection />

      {/* Contact & Map Desk */}
      <ContactForm />
    </div>
  );
}
