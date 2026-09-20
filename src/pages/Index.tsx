
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import EventsSection from "@/components/EventsSection";
import NewsSection from "@/components/NewsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import DonationsSection from "@/components/DonationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <MissionSection />
      <ObjectivesSection />
      <EventsSection />
      <NewsSection />
      <TestimonialsSection />
      <GallerySection />
      <DonationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
