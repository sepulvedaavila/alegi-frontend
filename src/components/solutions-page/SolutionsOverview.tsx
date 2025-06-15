
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import FirmSizeSolutions from './FirmSizeSolutions';
import PracticeAreaSolutions from './PracticeAreaSolutions';

const SolutionsOverview = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  return (
    <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Firm Size Solutions */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
                For Legal Teams of All Sizes
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
                Firm Size Solutions
              </h2>
              <p className="text-lg text-gray-600 reveal delay-200">
                Whether you're a solo practitioner or part of a multinational firm, our AI-powered platform adapts to your unique needs.
              </p>
            </div>
            
            <FirmSizeSolutions />
          </div>
          
          {/* Practice Area Solutions */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
                Specialized for Every Practice
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
                Practice Area Solutions
              </h2>
              <p className="text-lg text-gray-600 reveal delay-200">
                Discover how ALEGI's AI enhances outcomes across diverse legal specialties.
              </p>
            </div>
            
            <PracticeAreaSolutions />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsOverview;
