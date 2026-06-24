import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/common/AboutSection";
import WhyChooseMGR from "@/components/common/WhyChooseMGR";
import ConstructionPhilosophy from "@/components/common/ConstructionPhilosophy";
import Amenities from "@/components/common/Amenities";
import LocationAdvantages from "@/components/common/LocationAdvantages";
import ProjectsFeatured from "@/components/projects/ProjectsFeatured";
import TestimonialSlider from "@/components/testimonials/TestimonialSlider";
import ContactForm from "@/components/forms/ContactForm";
import FloatingIslandCenterpiece from "@/components/hero/FloatingIslandCenterpiece";
import SmoothScroll from "@/components/common/SmoothScroll";
import LuxuryLoader from "@/components/common/LuxuryLoader";
import SectionProgress from "@/components/common/SectionProgress";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Preloading luxury screen experience (v2.2) */}
      <LuxuryLoader />

      {/* Floating dot progress navigation tracker (v2.2) */}
      <SectionProgress />

      {/* 3D Floating Island Centerpiece (Fixed overlay with scroll animations) */}
      <FloatingIslandCenterpiece />

      {/* Main scroll track for GSAP triggers */}
      <div id="main-scroll-track" className="relative w-full min-h-screen">
        {/* Section 1: Floating Island Hero */}
        <Hero />

        {/* Section 2: About MGR (Brand Story) */}
        <AboutSection />

        {/* Section 3: Why Choose MGR (Trust Cards) */}
        <WhyChooseMGR />

        {/* Section 4: Construction Philosophy (Architectural Standard) */}
        <ConstructionPhilosophy />

        {/* Section 5: Amenities (Curated Comfort) */}
        <Amenities />

        {/* Section 6: Location Advantages */}
        <LocationAdvantages />

        {/* Section 7: Featured Projects (Apple Showcase) */}
        <ProjectsFeatured />

        {/* Section 8: Testimonials (Drifting Glass Reviews) */}
        <TestimonialSlider />

        {/* Section 9: Contact & WhatsApp Desk */}
        <ContactForm />
      </div>
    </SmoothScroll>
  );
}


