
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import ProcessStep from './ProcessStep';
import { processSteps } from './processData';

const HowItWorksProcess = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  return (
    <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
            Our Proven Process
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
            Step-by-Step Journey to Accurate Predictions
          </h2>
          <p className="text-lg text-gray-600 reveal delay-200">
            Follow our comprehensive process that transforms your case data into actionable legal insights
          </p>
        </div>

        <div className="relative">
          {/* Curved timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full">
            <svg className="h-full" width="60" viewBox="0 0 60 1000" preserveAspectRatio="none">
              <path 
                d="M30,0 Q45,125 30,250 Q15,375 30,500 Q45,625 30,750 Q15,875 30,1000" 
                fill="none" 
                stroke="url(#flowLineGradient)" 
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-flow"
              />
              <defs>
                <linearGradient id="flowLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3366FF" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#4D8BF9" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3366FF" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Process steps */}
          <div className="space-y-12 md:space-y-0 relative z-10">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isLeft={index % 2 === 0}
                delay={`delay-${index * 100}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksProcess;
