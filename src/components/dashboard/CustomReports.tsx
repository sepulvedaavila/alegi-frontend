import { useState } from 'react';
import { 
  FileText, 
  Download, 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale,
  Gavel,
  FileBarChart,
  PieChart,
  Target,
  Plus
} from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ReportData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  data: any;
  format: 'pdf' | 'csv' | 'excel';
}

const CustomReports = () => {
  const { selectedCase, recentCases, isLoadingCases } = useDashboard();
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const navigate = useNavigate();

  // Enhanced case data with more details for reports
  const enhancedCases = recentCases.map(caseItem => ({
    ...caseItem,
    caseType: 'Legal Case', // This could be enhanced with actual case type from database
    plaintiff: 'Plaintiff', // This could be enhanced with actual plaintiff data
    defendant: 'Defendant', // This could be enhanced with actual defendant data
    filedDate: caseItem.date,
    estimatedValue: Math.floor(Math.random() * 1000000) + 100000, // Mock data
    settlementAmount: caseItem.status === 'Closed' ? Math.floor(Math.random() * 800000) + 50000 : 0,
    resolutionTime: caseItem.status === 'Closed' ? Math.floor(Math.random() * 24) + 6 : 0,
    resolutionType: caseItem.status === 'Closed' ? 'Settlement' : 'Pending',
    judge: 'Judge', // This could be enhanced with actual judge data
    jurisdiction: 'Jurisdiction', // This could be enhanced with actual jurisdiction data
    riskFactors: ['Risk factor 1', 'Risk factor 2'], // Mock data
    keyEvidence: ['Evidence 1', 'Evidence 2'], // Mock data
    outcome: caseItem.status === 'Closed' ? 'Settled' : caseItem.status,
    confidence: caseItem.confidence
  }));

  if (isLoadingCases) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-alegi-blue mx-auto mb-4"></div>
        <p className="text-gray-600">Loading cases for reports...</p>
      </div>
    );
  }

  if (recentCases.length === 0) {
    return (
      <div className="text-center p-8">
        <FileBarChart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Cases Available</h3>
        <p className="text-gray-600 mb-4">
          Create your first case to generate custom reports and analytics.
        </p>
        <Button 
          onClick={() => navigate('/dashboard/new-case')}
          className="bg-alegi-blue text-white hover:bg-alegi-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create First Case
        </Button>
      </div>
    );
  }

  // Report 1: Case Performance Summary
  const casePerformanceReport: ReportData = {
    id: 'case-performance',
    title: 'Case Performance Summary',
    description: 'Comprehensive overview of case outcomes, settlement amounts, and resolution times',
    icon: <BarChart3 className="w-6 h-6" />,
    data: {
      totalCases: enhancedCases.length,
      activeCases: enhancedCases.filter(c => c.status === 'Active').length,
      settledCases: enhancedCases.filter(c => c.resolutionType === 'Settlement').length,
      totalSettlementValue: enhancedCases
        .filter(c => c.settlementAmount > 0)
        .reduce((sum, c) => sum + c.settlementAmount, 0),
      averageResolutionTime: Math.round(
        enhancedCases
          .filter(c => c.resolutionTime > 0)
          .reduce((sum, c) => sum + c.resolutionTime, 0) / 
        enhancedCases.filter(c => c.resolutionTime > 0).length
      ),
      averageConfidence: Math.round(
        enhancedCases.reduce((sum, c) => sum + c.confidence, 0) / enhancedCases.length
      ),
      casesByType: enhancedCases.reduce((acc, c) => {
        acc[c.caseType] = (acc[c.caseType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      casesByOutcome: enhancedCases.reduce((acc, c) => {
        acc[c.outcome] = (acc[c.outcome] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    },
    format: 'pdf'
  };

  // Report 2: Financial Analysis Report
  const financialAnalysisReport: ReportData = {
    id: 'financial-analysis',
    title: 'Financial Analysis Report',
    description: 'Detailed financial metrics including settlement values, cost analysis, and ROI calculations',
    icon: <DollarSign className="w-6 h-6" />,
    data: {
      totalEstimatedValue: enhancedCases.reduce((sum, c) => sum + c.estimatedValue, 0),
      totalSettledValue: enhancedCases
        .filter(c => c.settlementAmount > 0)
        .reduce((sum, c) => sum + c.settlementAmount, 0),
      averageSettlementAmount: Math.round(
        enhancedCases
          .filter(c => c.settlementAmount > 0)
          .reduce((sum, c) => sum + c.settlementAmount, 0) /
        enhancedCases.filter(c => c.settlementAmount > 0).length
      ),
      settlementRate: Math.round(
        (enhancedCases.filter(c => c.resolutionType === 'Settlement').length / enhancedCases.length) * 100
      ),
      valueByCaseType: enhancedCases.reduce((acc, c) => {
        if (!acc[c.caseType]) acc[c.caseType] = { estimated: 0, settled: 0 };
        acc[c.caseType].estimated += c.estimatedValue;
        if (c.settlementAmount > 0) acc[c.caseType].settled += c.settlementAmount;
        return acc;
      }, {} as Record<string, { estimated: number; settled: number }>),
      monthlySettlements: enhancedCases
        .filter(c => c.settlementAmount > 0)
        .map(c => ({
          month: new Date(c.filedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          amount: c.settlementAmount,
          caseType: c.caseType
        }))
    },
    format: 'excel'
  };

  // Report 3: Risk Assessment Report
  const riskAssessmentReport: ReportData = {
    id: 'risk-assessment',
    title: 'Risk Assessment Report',
    description: 'Risk analysis by case type, judge, and jurisdiction with confidence scores',
    icon: <AlertTriangle className="w-6 h-6" />,
    data: {
      riskByCaseType: enhancedCases.reduce((acc, c) => {
        if (!acc[c.caseType]) acc[c.caseType] = { low: 0, medium: 0, high: 0, total: 0 };
        acc[c.caseType][c.risk.toLowerCase() as 'low' | 'medium' | 'high']++;
        acc[c.caseType].total++;
        return acc;
      }, {} as Record<string, { low: number; medium: number; high: number; total: number }>),
      riskByJudge: enhancedCases.reduce((acc, c) => {
        if (!acc[c.judge]) acc[c.judge] = { cases: 0, avgConfidence: 0, outcomes: [] };
        acc[c.judge].cases++;
        acc[c.judge].avgConfidence += c.confidence;
        acc[c.judge].outcomes.push(c.outcome);
        return acc;
      }, {} as Record<string, { cases: number; avgConfidence: number; outcomes: string[] }>),
      riskByJurisdiction: enhancedCases.reduce((acc, c) => {
        if (!acc[c.jurisdiction]) acc[c.jurisdiction] = { cases: 0, avgConfidence: 0, riskDistribution: { low: 0, medium: 0, high: 0 } };
        acc[c.jurisdiction].cases++;
        acc[c.jurisdiction].avgConfidence += c.confidence;
        acc[c.jurisdiction].riskDistribution[c.risk.toLowerCase() as 'low' | 'medium' | 'high']++;
        return acc;
      }, {} as Record<string, { cases: number; avgConfidence: number; riskDistribution: { low: number; medium: number; high: number } }>),
      commonRiskFactors: enhancedCases.reduce((acc, c) => {
        c.riskFactors.forEach(factor => {
          acc[factor] = (acc[factor] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>),
      confidenceDistribution: {
        high: enhancedCases.filter(c => c.confidence >= 80).length,
        medium: enhancedCases.filter(c => c.confidence >= 60 && c.confidence < 80).length,
        low: enhancedCases.filter(c => c.confidence < 60).length
      }
    },
    format: 'csv'
  };

  const reports = [casePerformanceReport, financialAnalysisReport, riskAssessmentReport];

  const generateReport = async (report: ReportData) => {
    setIsGenerating(report.id);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create and download the report
      const reportContent = generateReportContent(report);
      downloadReport(reportContent, report.title, report.format);
      
      toast.success(`${report.title} generated successfully!`);
    } catch (error) {
      toast.error('Failed to generate report');
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(null);
    }
  };

  const generateReportContent = (report: ReportData) => {
    const timestamp = new Date().toLocaleString();
    const header = `ALEGI Legal Analytics - ${report.title}\nGenerated: ${timestamp}\n\n`;
    
    let content = header;
    
    switch (report.id) {
      case 'case-performance':
        content += `CASE PERFORMANCE SUMMARY\n`;
        content += `========================\n\n`;
        content += `Total Cases: ${report.data.totalCases}\n`;
        content += `Active Cases: ${report.data.activeCases}\n`;
        content += `Settled Cases: ${report.data.settledCases}\n`;
        content += `Total Settlement Value: $${report.data.totalSettlementValue.toLocaleString()}\n`;
        content += `Average Resolution Time: ${report.data.averageResolutionTime} months\n`;
        content += `Average Confidence Score: ${report.data.averageConfidence}%\n\n`;
        
        content += `CASES BY TYPE:\n`;
        Object.entries(report.data.casesByType).forEach(([type, count]) => {
          content += `${type}: ${count} cases\n`;
        });
        content += `\n`;
        
        content += `CASES BY OUTCOME:\n`;
        Object.entries(report.data.casesByOutcome).forEach(([outcome, count]) => {
          content += `${outcome}: ${count} cases\n`;
        });
        break;
        
      case 'financial-analysis':
        content += `FINANCIAL ANALYSIS REPORT\n`;
        content += `========================\n\n`;
        content += `Total Estimated Value: $${report.data.totalEstimatedValue.toLocaleString()}\n`;
        content += `Total Settled Value: $${report.data.totalSettledValue.toLocaleString()}\n`;
        content += `Average Settlement Amount: $${report.data.averageSettlementAmount.toLocaleString()}\n`;
        content += `Settlement Rate: ${report.data.settlementRate}%\n\n`;
        
        content += `VALUE BY CASE TYPE:\n`;
        Object.entries(report.data.valueByCaseType).forEach(([type, values]) => {
          const typedValues = values as { estimated: number; settled: number };
          content += `${type}:\n`;
          content += `  Estimated: $${typedValues.estimated.toLocaleString()}\n`;
          content += `  Settled: $${typedValues.settled.toLocaleString()}\n`;
        });
        content += `\n`;
        
        content += `MONTHLY SETTLEMENTS:\n`;
        report.data.monthlySettlements.forEach((settlement: any) => {
          content += `${settlement.month}: $${settlement.amount.toLocaleString()} (${settlement.caseType})\n`;
        });
        break;
        
      case 'risk-assessment':
        content += `RISK ASSESSMENT REPORT\n`;
        content += `=====================\n\n`;
        
        content += `RISK BY CASE TYPE:\n`;
        Object.entries(report.data.riskByCaseType).forEach(([type, risks]) => {
          const typedRisks = risks as { low: number; medium: number; high: number; total: number };
          content += `${type}:\n`;
          content += `  Low Risk: ${typedRisks.low} cases\n`;
          content += `  Medium Risk: ${typedRisks.medium} cases\n`;
          content += `  High Risk: ${typedRisks.high} cases\n`;
          content += `  Total: ${typedRisks.total} cases\n`;
        });
        content += `\n`;
        
        content += `RISK BY JUDGE:\n`;
        Object.entries(report.data.riskByJudge).forEach(([judge, data]) => {
          const typedData = data as { cases: number; avgConfidence: number; outcomes: string[] };
          const avgConfidence = Math.round(typedData.avgConfidence / typedData.cases);
          content += `${judge}:\n`;
          content += `  Cases: ${typedData.cases}\n`;
          content += `  Average Confidence: ${avgConfidence}%\n`;
          content += `  Outcomes: ${typedData.outcomes.join(', ')}\n`;
        });
        
        content += `\n`;
        
        content += `COMMON RISK FACTORS:\n`;
        Object.entries(report.data.commonRiskFactors)
          .sort(([,a], [,b]) => (b as number) - (a as number))
          .forEach(([factor, count]) => {
            content += `${factor}: ${count} cases\n`;
          });
        break;
    }
    
    return content;
  };

  const downloadReport = (content: string, title: string, format: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Custom Reports</h1>
            <p className="mt-2 text-gray-600">
              Generate comprehensive reports from your case data for analysis and presentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-alegi-blue/10 rounded-lg mr-3">
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FileBarChart className="w-4 h-4 mr-2" />
                    <span>Report Preview:</span>
                  </div>
                  <div className="bg-gray-50 rounded p-3 text-xs text-gray-700 max-h-32 overflow-y-auto">
                    {generateReportPreview(report)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="w-4 h-4 mr-1" />
                    <span className="uppercase">{report.format}</span>
                  </div>
                  <button
                    onClick={() => generateReport(report)}
                    disabled={isGenerating === report.id}
                    className="flex items-center px-4 py-2 bg-alegi-blue text-white rounded-md hover:bg-alegi-blue/90 transition-colors disabled:opacity-50"
                  >
                    {isGenerating === report.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Types Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-alegi-blue mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">Performance Reports</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Track case outcomes, resolution times, and success rates
                </p>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">Financial Reports</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Analyze settlement values, costs, and financial performance
                </p>
              </div>
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">Risk Reports</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Assess risk factors, confidence scores, and case complexity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const generateReportPreview = (report: ReportData) => {
  switch (report.id) {
    case 'case-performance':
      return `• Total Cases: 4\n• Active Cases: 2\n• Settled Cases: 2\n• Total Settlement Value: $1,770,000\n• Average Resolution Time: 11 months\n• Average Confidence: 78%`;
    case 'financial-analysis':
      return `• Total Estimated Value: $4,700,000\n• Total Settled Value: $1,770,000\n• Average Settlement: $885,000\n• Settlement Rate: 50%\n• Monthly breakdown available`;
    case 'risk-assessment':
      return `• Risk by Case Type analysis\n• Judge performance metrics\n• Jurisdiction risk distribution\n• Common risk factors identified\n• Confidence score breakdown`;
    default:
      return 'Report preview not available';
  }
};

export default CustomReports; 