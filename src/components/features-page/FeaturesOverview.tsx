
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import ExpandableFeatureCard from './ExpandableFeatureCard';
import { featuresList } from './featuresData';

const FeaturesOverview = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
            Comprehensive Capabilities
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
            Powerful Features for Smarter Legal Decisions
          </h2>
          <p className="text-lg text-gray-600 reveal delay-200">
            Discover how ALEGI leverages artificial intelligence to enhance your legal strategy with data-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresList.map((feature, index) => (
            <ExpandableFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={`delay-${(index % 3) * 100}`}
              highlight={feature.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
