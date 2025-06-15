
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import FaqAccordion from '@/components/faq-page/FaqAccordion';
import { cn } from '@/lib/utils';
import faqData from '@/components/faq-page/faqData';
import { LucideIcon, Info, FileText, Shield, CircleCheck } from 'lucide-react';

interface FaqSectionProps {
  title: string;
  sectionId: 'general' | 'features' | 'security' | 'why-choose';
  icon: 'info' | 'file-text' | 'shield' | 'circle-check';
  className?: string;
}

const iconMap = {
  'info': Info,
  'file-text': FileText,
  'shield': Shield,
  'circle-check': CircleCheck
};

const FaqSection = ({ title, sectionId, icon, className }: FaqSectionProps) => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();
  const IconComponent = iconMap[icon];
  
  return (
    <section 
      id={sectionId} 
      className={cn("py-16 md:py-24", className)}
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 reveal">
            <div className="p-2 rounded-lg bg-alegi-blue/10">
              <IconComponent className="h-6 w-6 text-alegi-blue" />
            </div>
            <h2 className="text-3xl font-display font-bold">{title}</h2>
          </div>
          
          <div className="mt-8 reveal delay-100">
            <FaqAccordion items={faqData[sectionId]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
