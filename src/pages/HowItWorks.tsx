
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import HowItWorksHero from '@/components/how-it-works/HowItWorksHero';
import HowItWorksProcess from '@/components/how-it-works/HowItWorksProcess';
import HowItWorksCta from '@/components/how-it-works/HowItWorksCta';

const HowItWorks = () => {
  // Add scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="How It Works | ALEGI - AI-Powered Legal Predictions"
        description="Discover how ALEGI delivers accurate case predictions through AI and proprietary algorithms that help optimize your legal outcomes."
      />
      <Navbar />
      <HowItWorksHero />
      <HowItWorksProcess />
      <HowItWorksCta />
      <Footer />
    </div>
  );
};

export default HowItWorks;
