import { Brain, Target, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AIStrategyRecommendationsWidget = ({ isComparison = false, caseData = null }) => {
  const renderStrategyRecommendations = (caseData: any, className = '') => {
    // Mock data - would come from API in real application
    const strategyData = {
      primaryStrategy: {
        title: 'Settlement-Focused Negotiation',
        confidence: 85,
        description: 'Focus on early settlement negotiations with strong evidence presentation',
        timeline: '3-6 months',
        expectedOutcome: '$850,000 - $1,100,000',
        successRate: 78,
        keyActions: [
          'Present expert medical testimony early',
          'Highlight defendant\'s settlement history',
          'Emphasize trial risks and costs',
          'Leverage precedent cases'
        ]
      },
      alternativeApproaches: [
        {
          title: 'Aggressive Trial Preparation',
          confidence: 65,
          description: 'Prepare for trial while keeping settlement options open',
          timeline: '12-18 months',
          expectedOutcome: '$950,000 - $1,500,000',
          successRate: 52,
          risk: 'High',
          keyActions: [
            'Intensive discovery process',
            'Expert witness preparation',
            'Jury research and focus groups',
            'Trial strategy development'
          ]
        },
        {
          title: 'Mediation-First Approach',
          confidence: 72,
          description: 'Engage professional mediator early in the process',
          timeline: '4-8 months',
          expectedOutcome: '$750,000 - $950,000',
          successRate: 68,
          risk: 'Medium',
          keyActions: [
            'Select experienced mediator',
            'Prepare comprehensive settlement brief',
            'Include key decision-makers',
            'Set realistic expectations'
          ]
        }
      ]
    };

    const getConfidenceColor = (confidence: number) => {
      if (confidence >= 80) return 'text-green-600 bg-green-100';
      if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    };

    const getRiskColor = (risk: string) => {
      switch (risk) {
        case 'High': return 'text-red-600 bg-red-100';
        case 'Medium': return 'text-yellow-600 bg-yellow-100';
        case 'Low': return 'text-green-600 bg-green-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-2 text-alegi-blue" size={20} />
            <h4 className="text-sm font-medium">AI Strategy Recommendations</h4>
          </div>
          <Badge className="bg-blue-100 text-blue-800 text-xs">
            AI Generated
          </Badge>
        </div>

        {/* Primary Strategy */}
        <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Target className="mr-2 text-blue-600" size={18} />
              <h5 className="text-sm font-medium text-blue-800">Primary Strategy</h5>
            </div>
            <Badge className={getConfidenceColor(strategyData.primaryStrategy.confidence)}>
              {strategyData.primaryStrategy.confidence}% Confidence
            </Badge>
          </div>
          
          <h6 className="text-sm font-semibold text-blue-900 mb-2">
            {strategyData.primaryStrategy.title}
          </h6>
          
          <p className="text-xs text-blue-800 mb-3">
            {strategyData.primaryStrategy.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center text-xs">
              <Clock className="mr-1 text-blue-600" size={12} />
              <span className="text-blue-800">Timeline: {strategyData.primaryStrategy.timeline}</span>
            </div>
            <div className="flex items-center text-xs">
              <DollarSign className="mr-1 text-blue-600" size={12} />
              <span className="text-blue-800">Expected: {strategyData.primaryStrategy.expectedOutcome}</span>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-blue-800">Success Rate</span>
              <span className="text-blue-800 font-medium">{strategyData.primaryStrategy.successRate}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${strategyData.primaryStrategy.successRate}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <h6 className="text-xs font-medium text-blue-800 mb-2">Key Actions:</h6>
            <ul className="space-y-1">
              {strategyData.primaryStrategy.keyActions.map((action, index) => (
                <li key={index} className="flex items-start text-xs text-blue-800">
                  <CheckCircle className="mr-1 mt-0.5 text-blue-600" size={10} />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alternative Approaches */}
        <div className="space-y-3">
          <h5 className="text-sm font-medium flex items-center">
            <Lightbulb className="mr-2 text-amber-500" size={16} />
            Alternative Approaches
          </h5>
          
          {strategyData.alternativeApproaches.map((approach, index) => (
            <div key={index} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h6 className="text-sm font-medium">{approach.title}</h6>
                <div className="flex items-center space-x-2">
                  <Badge className={getConfidenceColor(approach.confidence)}>
                    {approach.confidence}%
                  </Badge>
                  <Badge className={getRiskColor(approach.risk)}>
                    {approach.risk} Risk
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-gray-600 mb-2">{approach.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                <div className="flex items-center">
                  <Clock className="mr-1 text-gray-500" size={10} />
                  <span>{approach.timeline}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-1 text-gray-500" size={10} />
                  <span>{approach.expectedOutcome}</span>
                </div>
              </div>
              
              <div className="text-xs">
                <span className="text-gray-600">Success Rate: </span>
                <span className="font-medium">{approach.successRate}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp size={12} className="mr-1" />
            <span>Based on 234 similar case strategies</span>
          </div>
          <span>Updated: Today</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isComparison ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r pr-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case A</h4>
            {renderStrategyRecommendations(caseData)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case B</h4>
            {renderStrategyRecommendations(caseData)}
          </div>
        </div>
      ) : (
        renderStrategyRecommendations(caseData)
      )}
    </div>
  );
};

export default AIStrategyRecommendationsWidget; 