import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import EducationSection from "@/components/landing/education-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import CTASection from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <EducationSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
