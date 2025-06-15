
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { ExpandableFeatureCard } from './ExpandableSolutionCard';
import { Briefcase, Users, Building, Shield, BookOpen, FileCheck, Home, Scale, Flag } from 'lucide-react';

const PracticeAreaSolutions = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();
  
  const practiceAreas = [
    {
      icon: <Scale className="h-6 w-6 text-alegi-blue" />,
      title: "Personal Injury Law",
      header: "Practice Area",
      description: "Maximize settlements and minimize risks with predictive analytics that analyze similar cases, estimate damages, and highlight key precedents. ALEGI provides insights into judge tendencies, opposing counsel patterns, and optimal settlement ranges based on extensive data analysis.",
      highlight: true
    },
    {
      icon: <Users className="h-6 w-6 text-alegi-blue" />,
      title: "Family Law",
      header: "Practice Area",
      description: "Data-driven support for sensitive cases that helps attorneys predict judicial decision patterns in custody and support matters. Our platform analyzes regional trends, past rulings, and case factors to better prepare clients and develop more effective legal strategies.",
      highlight: false
    },
    {
      icon: <Building className="h-6 w-6 text-alegi-blue" />,
      title: "Corporate Law",
      header: "Practice Area",
      description: "Streamline business legal operations with AI-powered contract analysis, compliance risk assessment, and transaction optimization. ALEGI identifies potential regulatory issues, analyzes similar business disputes, and predicts litigation outcomes to guide corporate decision-making.",
      highlight: false
    },
    {
      icon: <Shield className="h-6 w-6 text-alegi-blue" />,
      title: "Criminal Defense",
      header: "Practice Area",
      description: "Build stronger defense strategies by analyzing case outcomes with similar fact patterns, judge tendencies, and prosecutor tactics. Our platform helps identify the most effective arguments, motion strategies, and potential plea bargain ranges based on historical case data.",
      highlight: false
    },
    {
      icon: <BookOpen className="h-6 w-6 text-alegi-blue" />,
      title: "Intellectual Property Law",
      header: "Practice Area",
      description: "Safeguard intellectual property with confidence using predictive analytics for patent disputes, trademark conflicts, and copyright cases. ALEGI analyzes similar IP litigation outcomes, opposition strategies, and judicial patterns to enhance your legal approach.",
      highlight: false
    },
    {
      icon: <FileCheck className="h-6 w-6 text-alegi-blue" />,
      title: "Employment Law",
      header: "Practice Area",
      description: "Predict and prevent workplace disputes with insights into likely case outcomes, settlement ranges, and judicial tendencies in employment matters. Our platform helps identify risk factors in workplace policies and provides guidance for compliance and litigation strategy.",
      highlight: false
    },
    {
      icon: <Home className="h-6 w-6 text-alegi-blue" />,
      title: "Real Estate Law",
      header: "Practice Area",
      description: "Navigate property disputes with confidence using AI-powered analysis of similar property cases, regional trends, and likely outcomes. ALEGI helps optimize strategies for zoning issues, property transactions, landlord-tenant disputes, and construction litigation.",
      highlight: false
    },
    {
      icon: <Users className="h-6 w-6 text-alegi-blue" />,
      title: "Class Action and Mass Torts",
      header: "Practice Area",
      description: "Master large-scale litigation with advanced analytics that help predict certification outcomes, settlement values, and judicial tendencies. Our platform assists in identifying case patterns, optimizing resource allocation, and developing more effective litigation strategies.",
      highlight: false
    },
    {
      icon: <Flag className="h-6 w-6 text-alegi-blue" />,
      title: "Immigration Law",
      header: "Practice Area",
      description: "Enhance case outcomes for immigration clients by analyzing success patterns, judge tendencies, and regional differences in immigration proceedings. ALEGI provides insights into approval rates, documentation strategies, and procedural approaches for various immigration matters.",
      highlight: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" ref={sectionRef}>
      {practiceAreas.map((area, index) => (
        <ExpandableFeatureCard
          key={index}
          icon={area.icon}
          title={area.title}
          header={area.header}
          description={area.description}
          delay={`delay-${(index % 3) * 100}`}
          highlight={area.highlight}
        />
      ))}
    </div>
  );
};

export default PracticeAreaSolutions;
