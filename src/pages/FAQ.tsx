
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FaqHero from '@/components/faq-page/FaqHero';
import FaqSection from '@/components/faq-page/FaqSection';
import FaqCta from '@/components/faq-page/FaqCta';

const FAQ = () => {
  // Add scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="FAQ | ALEGI - AI-Powered Legal Predictions"
        description="Get answers to frequently asked questions about ALEGI's AI-powered legal prediction platform, features, security, and more."
      />
      <Navbar />
      <FaqHero />
      <FaqSection 
        title="General Information" 
        sectionId="general"
        icon="info"
      />
      <FaqSection 
        title="Platform Features and Use Cases" 
        sectionId="features"
        icon="file-text"
        className="bg-gray-50"
      />
      <FaqSection 
        title="Security and Privacy" 
        sectionId="security"
        icon="shield"
      />
      <FaqSection 
        title="Why Choose Alegi?" 
        sectionId="why-choose"
        icon="circle-check"
        className="bg-gray-50"
      />
      <FaqCta />
      <Footer />
    </div>
  );
};

export default FAQ;
