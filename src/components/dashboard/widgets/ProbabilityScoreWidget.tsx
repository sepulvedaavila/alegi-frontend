import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCaseProbability } from '@/hooks/useSmartPolling';
import { ProbabilityScoreSkeleton } from '@/components/ui/widget-skeleton';
import ErrorBoundary from '@/components/ui/error-boundary';
import { widgetExportUtils } from '@/utils/exportUtils';
import { useDashboard } from '@/contexts/DashboardContext';
import { ProbabilityScoreData } from '@/types/dashboard';

interface ProbabilityScoreWidgetProps {
  isComparison?: boolean;
  caseData?: any;
}

const ProbabilityScoreWidget: React.FC<ProbabilityScoreWidgetProps> = ({ 
  isComparison = false, 
  caseData = null 
}) => {
  const { comparisonCase } = useDashboard();
  const caseId = comparisonCase?.id || caseData?.id;

  const { data, isLoading, error } = useCaseProbability(caseId || '');

  const [showFactors, setShowFactors] = React.useState(false);

  // Mock data for demonstration - replace with actual API data
  const mockData: ProbabilityScoreData = {
    successProbability: 78,
    failureProbability: 12,
    settlementProbability: 10,
    confidence: 'high',
    factors: {
      jurisdiction: 85,
      caseType: 72,
      precedent: 91,
      proceduralPosture: 68
    }
  };

  const probabilityData = data || mockData;

  const pieData = useMemo(() => [
    { name: 'Success', value: probabilityData.successProbability, color: '#10b981' },
    { name: 'Failure', value: probabilityData.failureProbability, color: '#ef4444' },
    { name: 'Settlement', value: probabilityData.settlementProbability, color: '#f59e0b' }
  ], [probabilityData]);

  const factorsData = useMemo(() => [
    { name: 'Jurisdiction', value: probabilityData.factors.jurisdiction },
    { name: 'Case Type', value: probabilityData.factors.caseType },
    { name: 'Precedent', value: probabilityData.factors.precedent },
    { name: 'Procedural Posture', value: probabilityData.factors.proceduralPosture }
  ], [probabilityData.factors]);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExport = async () => {
    try {
      await widgetExportUtils.exportCaseAnalysis(probabilityData, caseId || 'unknown');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (isLoading) {
    return <ProbabilityScoreSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <TrendingDown className="mx-auto h-8 w-8 mb-2" />
            <p>Failed to load probability data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderProbabilityContent = (className = '') => (
    <div className={`space-y-4 ${className}`}>
      {/* Main Probability Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Circular Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="relative inline-block">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {probabilityData.successProbability}%
                    </div>
                    <div className="text-xs text-gray-500">Success</div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <Badge className={getConfidenceColor(probabilityData.confidence)}>
                  {probabilityData.confidence} confidence
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={pieData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Factors Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Success Factors</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFactors(!showFactors)}
            >
              {showFactors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showFactors && (
            <div className="space-y-3">
              {factorsData.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="font-medium">{factor.value}%</span>
                  </div>
                  <Progress value={factor.value} className="h-2" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          <div className="flex items-center">
            <Scale className="mr-1 h-3 w-3" />
            <span>Based on {probabilityData.successProbability + probabilityData.failureProbability + probabilityData.settlementProbability} similar cases</span>
          </div>
          <div className="mt-1">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="text-xs"
        >
          <Download className="mr-1 h-3 w-3" />
          Export
        </Button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <div id={`probability-score-${caseId}`}>
        {isComparison ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r pr-2">
              <h4 className="text-sm font-medium text-blue-600 mb-2">Case A</h4>
              {renderProbabilityContent()}
            </div>
            <div className="pl-2">
              <h4 className="text-sm font-medium text-blue-600 mb-2">Case B</h4>
              {renderProbabilityContent()}
            </div>
          </div>
        ) : (
          renderProbabilityContent()
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ProbabilityScoreWidget; 