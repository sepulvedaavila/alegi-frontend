
import { useRef, useEffect } from 'react';
import { ClipboardList, BarChart4, Lightbulb } from 'lucide-react';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const Step = ({ number, icon, title, description, delay }: StepProps) => (
  <div className={`reveal ${delay} relative flex flex-col items-center text-center`}>
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-md z-10 mb-6 border border-gray-100">
      {icon}
    </div>
    <span className="absolute top-0 text-8xl font-bold text-gray-50 -z-10 opacity-80">
      {number}
    </span>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 max-w-xs">{description}</p>
  </div>
);

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el) => {
              el.classList.add('active');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="how-it-works" className="section bg-white" ref={sectionRef}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 reveal delay-200">
            Get started with ALEGI in three simple steps and transform your legal research
          </p>
        </div>

        <div className="relative mt-20">
          {/* Connector line */}
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 z-0 hidden md:block"></div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <Step 
              number={1}
              icon={<ClipboardList className="h-8 w-8 text-alegi-blue" />}
              title="Your Case"
              description="Sign up and easily upload your case data, documents, and relevant facts. Alegi's intuitive interface ensures that all necessary information is captured accurately."
              delay="delay-100"
            />
            
            <Step 
              number={2}
              icon={<BarChart4 className="h-8 w-8 text-alegi-blue" />}
              title="Alegi will Analyze It"
              description="Alegi's proprietary AI data and algorithm model processes your data by analyzing precedent cases, evaluating court trends, and factoring in new law changes. The result? Fast, reliable, and detailed predictions with minimal effort."
              delay="delay-200"
            />
            
            <Step 
              number={3}
              icon={<Lightbulb className="h-8 w-8 text-alegi-blue" />}
              title="Get Insights and Explore Options"
              description="Alegi structures the results into a user-friendly format, providing predictions, scenario-based what-if analysis, and collaborative case insights."
              delay="delay-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
