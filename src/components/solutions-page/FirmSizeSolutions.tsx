
import { ExpandableFeatureCard } from './ExpandableSolutionCard';
import { Scale, Building2, Users } from 'lucide-react';

const FirmSizeSolutions = () => {
  const solutions = [
    {
      icon: <Scale className="h-6 w-6 text-alegi-blue" />,
      title: "Level the Playing Field",
      header: "Solo lawyers and small practices",
      description: "Solo lawyers and small practices can leverage AI-powered legal insights to compete with larger firms. Benefits include:\n\n• Time Savings: Automate research and precedent analysis.\n• Strategic Confidence: Gain data-driven predictions.\n• Cost Efficiency: Avoid unnecessary litigation costs.\n• Client Trust: Provide data-backed case evaluations.",
      highlight: true
    },
    {
      icon: <Building2 className="h-6 w-6 text-alegi-blue" />,
      title: "Optimize Legal Operations",
      header: "In-house teams",
      description: "In-house teams can streamline workflows and make faster, more strategic decisions. Benefits include:\n\n• Faster Case Analysis: Analyze similar cases and precedents.\n• Cost Control: Forecast legal expenses.\n• Risk Mitigation: Identify potential risks early.\n• Enhanced Compliance: Stay current with regulatory changes.",
      highlight: false
    },
    {
      icon: <Users className="h-6 w-6 text-alegi-blue" />,
      title: "Boost Firm Efficiency and Case Success",
      header: "Large Law firms",
      description: "Law firms of all sizes can improve case outcomes and client satisfaction. Benefits include:\n\n• Improved Case Strategy: Refine approaches using AI insights.\n• Enhanced Collaboration: Enable seamless team data sharing.\n• Client Satisfaction: Provide accurate case forecasts.\n• Scalability: Automate time-consuming legal tasks.",
      highlight: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {solutions.map((solution, index) => (
        <ExpandableFeatureCard
          key={index}
          icon={solution.icon}
          title={solution.title}
          header={solution.header}
          description={solution.description}
          delay={`delay-${(index % 3) * 100}`}
          highlight={solution.highlight}
        />
      ))}
    </div>
  );
};

export default FirmSizeSolutions;
