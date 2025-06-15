
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SolutionsHero from '@/components/solutions-page/SolutionsHero';
import SolutionsOverview from '@/components/solutions-page/SolutionsOverview';
import SolutionsCta from '@/components/solutions-page/SolutionsCta';

const Solutions = () => {
  // Add scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Solutions | ALEGI - AI-Powered Legal Predictions"
        description="Discover solutions tailored for every legal need - from solo practitioners to large law firms across all practice areas."
      />
      <Navbar />
      <SolutionsHero />
      <SolutionsOverview />
      <SolutionsCta />
      <Footer />
    </div>
  );
};

export default Solutions;
