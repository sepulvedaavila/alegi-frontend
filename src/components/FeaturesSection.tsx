
import { useSection } from '@/hooks/useSection';
import FeatureCarousel from './features/FeatureCarousel';
import { createFeatureGroups } from './features/featureData';

const FeaturesSection = () => {
  const sectionRef = useSection(0.1);
  const featureGroups = createFeatureGroups();

  return (
    <section id="features" className="section bg-gradient-to-b from-white to-gray-50 pt-4 md:pt-8 lg:pt-12" ref={sectionRef}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
            AI-Powered Features
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
            Powerful AI Features for Smarter Legal Decisions
          </h2>
          <p className="text-lg text-gray-600 reveal delay-200">
            Discover how ALEGI leverages artificial intelligence to provide data-driven legal insights, helping you navigate litigation with confidence.
          </p>
        </div>

        <FeatureCarousel featureGroups={featureGroups} />

        <div className="text-center mt-8 reveal delay-300 pb-12">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg font-medium text-gradient-primary mb-6">
              Experience the power of AI in legal decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
