
import { useRef, useEffect } from 'react';
import { Briefcase, Building, Users, ShieldCheck } from 'lucide-react';

interface AudienceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const AudienceCard = ({ icon, title, description, delay }: AudienceCardProps) => (
  <div className={`reveal ${delay} bg-white rounded-xl p-6 subtle-border hover:shadow-md transition-all duration-300 hover:scale-[1.02] flex items-start`}>
    <div className="flex-shrink-0 mr-4">
      <div className="w-12 h-12 rounded-full bg-alegi-blue/10 text-alegi-blue flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const TargetAudienceSection = () => {
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
    <section id="who-is-it-for" className="section bg-alegi-gray-light" ref={sectionRef}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
            ALEGI: AI Solutions for Every Legal Challenge
          </h2>
          <p className="text-lg text-gray-600 reveal delay-200">
            The advanced features of ALEGI's AI legal platform offer significant benefits to various stakeholders in the legal field
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <AudienceCard 
            icon={<Briefcase className="h-6 w-6" />}
            title="Law Firms"
            description="Boost efficiency, cut costs, and enhance accuracy with automated research and analysis."
            delay="delay-100"
          />
          
          <AudienceCard 
            icon={<Building className="h-6 w-6" />}
            title="In-House Teams"
            description="Proactively manage risks and drive strategic decisions with AI-powered predictive insights."
            delay="delay-200"
          />
          
          <AudienceCard 
            icon={<Users className="h-6 w-6" />}
            title="Solo & Small Practices"
            description="Level the playing field with access to advanced legal intelligence, optimizing resources."
            delay="delay-300"
          />

          <AudienceCard 
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Insurance Companies"
            description="Streamline operations, lower expenses, and enhance decision-making for improved service and financial results."
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
