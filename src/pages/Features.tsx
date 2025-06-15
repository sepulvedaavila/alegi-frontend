
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FeaturesHero from '@/components/features-page/FeaturesHero';
import FeaturesOverview from '@/components/features-page/FeaturesOverview';
import FeaturesCta from '@/components/features-page/FeaturesCta';

const Features = () => {
  // Add scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Features | ALEGI - AI-Powered Legal Predictions"
        description="Explore ALEGI's powerful features for legal predictions, risk assessment, and strategic insights powered by advanced AI technology."
      />
      <Navbar />
      <FeaturesHero />
      <FeaturesOverview />
      <FeaturesCta />
      <Footer />
    </div>
  );
};

export default Features;
