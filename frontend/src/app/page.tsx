"use client";

import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { HeroSection } from "@/features/home/sections/HeroSection";
import { StatsSection } from "@/features/home/sections/StatsSection";
import { WhyChooseSection } from "@/features/home/sections/WhyChooseSection";
import { FeaturesSection } from "@/features/home/sections/FeaturesSection";
import { ProcessSection } from "@/features/home/sections/ProcessSection";
import { RoadmapPreviewSection } from "@/features/home/sections/RoadmapPreviewSection";
import { TestimonialsSection } from "@/features/home/sections/TestimonialsSection";
import { PricingSection } from "@/features/home/sections/PricingSection";
import { FaqSection } from "@/features/home/sections/FaqSection";
import { CtaSection } from "@/features/home/sections/CtaSection";
import { NewsletterSection } from "@/features/home/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-18 min-h-screen bg-lifeguide-canvas transition-colors duration-300">
        <HeroSection />
        <StatsSection />
        <WhyChooseSection />
        <FeaturesSection />
        <ProcessSection />
        <RoadmapPreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <NewsletterSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
