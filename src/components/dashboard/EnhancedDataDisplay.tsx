import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Users, 
  Scale, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Star
} from 'lucide-react';

interface EnhancedDataDisplayProps {
  enhancedData: {
    fusedData: {
      status: string;
      confidence: number;
      parties: {
        plaintiffs: string[];
        defendants: string[];
      };
      legalClaims: string[];
      damagesSought: {
        amount: number;
        currency: string;
        types: string[];
      };
      keyDates: {
        contract_date?: string;
        breach_date?: string;
        filing_date?: string;
      };
      conflicts: string[];
      additionalInsights: string;
      fusionTimestamp: string;
    };
    documentAnalysis: {
      totalDocuments: number;
      documents: Array<{
        fileName: string;
        documentType: string;
        parties: string[];
        legalClaims: string[];
        damagesSought: number;
        keyDates: string[];
        jurisdiction: string;
        caseNumber: string;
        processingStatus: string;
        extractionTimestamp: string;
        confidence: number;
      }>;
    };
    precedentAnalysis: {
      totalPrecedents: number;
      precedents: Array<{
        caseName: string;
        citation: string;
        court: string;
        jurisdiction: string;
        judgeName: string;
        legalIssues: string[];
        applicableStatutes: string[];
        strategyUsed: string;
        outcome: string;
        decisionSummary: string;
        similarityScore: number;
        fullTextUrl: string;
      }>;
    };
  };
  dataQuality: {
    hasFusedData: boolean;
    hasDocumentExtractions: boolean;
    hasPrecedentCases: boolean;
    hasAIEnrichment: boolean;
    hasPredictions: boolean;
    hasAnalysisResults: boolean;
    fusionConfidence: number;
    averageExtractionConfidence: number;
  };
}

export const EnhancedDataDisplay: React.FC<EnhancedDataDisplayProps> = ({
  enhancedData,
  dataQuality
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case 'plaintiff':
        return 'bg-green-100 text-green-800';
      case 'defendant':
        return 'bg-red-100 text-red-800';
      case 'settlement':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Quality Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Data Quality Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(dataQuality.fusionConfidence * 100)}%
              </div>
              <p className="text-sm text-gray-600">Fusion Confidence</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(dataQuality.averageExtractionConfidence * 100)}%
              </div>
              <p className="text-sm text-gray-600">Extraction Confidence</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {enhancedData.documentAnalysis.totalDocuments}
              </div>
              <p className="text-sm text-gray-600">Documents Analyzed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {enhancedData.precedentAnalysis.totalPrecedents}
              </div>
              <p className="text-sm text-gray-600">Precedent Cases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fused Data */}
      {dataQuality.hasFusedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-blue-600" />
              <span>AI-Fused Case Summary</span>
              <Badge className={getConfidenceColor(enhancedData.fusedData.confidence)}>
                {Math.round(enhancedData.fusedData.confidence * 100)}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Parties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Parties</span>
                </h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Plaintiffs</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {enhancedData.fusedData.parties.plaintiffs.map((plaintiff, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {plaintiff}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Defendants</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {enhancedData.fusedData.parties.defendants.map((defendant, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {defendant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Claims & Damages */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Legal Claims</span>
                </h4>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {enhancedData.fusedData.legalClaims.map((claim, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {claim}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-600">Damages Sought</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(enhancedData.fusedData.damagesSought.amount)}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {enhancedData.fusedData.damagesSought.types.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Dates */}
            {Object.keys(enhancedData.fusedData.keyDates).length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Key Dates</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {enhancedData.fusedData.keyDates.contract_date && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Contract Date</p>
                      <p className="font-medium">{new Date(enhancedData.fusedData.keyDates.contract_date).toLocaleDateString()}</p>
                    </div>
                  )}
                  {enhancedData.fusedData.keyDates.breach_date && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Breach Date</p>
                      <p className="font-medium">{new Date(enhancedData.fusedData.keyDates.breach_date).toLocaleDateString()}</p>
                    </div>
                  )}
                  {enhancedData.fusedData.keyDates.filing_date && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Filing Date</p>
                      <p className="font-medium">{new Date(enhancedData.fusedData.keyDates.filing_date).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Conflicts */}
            {enhancedData.fusedData.conflicts.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span>Key Conflicts</span>
                </h4>
                <div className="space-y-1">
                  {enhancedData.fusedData.conflicts.map((conflict, index) => (
                    <p key={index} className="text-sm text-gray-700">• {conflict}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Insights */}
            {enhancedData.fusedData.additionalInsights && (
              <div>
                <h4 className="font-semibold mb-2">Additional Insights</h4>
                <p className="text-sm text-gray-700">{enhancedData.fusedData.additionalInsights}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Document Analysis */}
      {dataQuality.hasDocumentExtractions && enhancedData.documentAnalysis.documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <span>Document Analysis</span>
              <Badge variant="outline">
                {enhancedData.documentAnalysis.totalDocuments} Documents
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enhancedData.documentAnalysis.documents.map((doc, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{doc.fileName}</h4>
                      <p className="text-sm text-gray-600">{doc.documentType}</p>
                    </div>
                    <Badge className={getConfidenceColor(doc.confidence)}>
                      {Math.round(doc.confidence * 100)}% Confidence
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Extracted Parties</p>
                      <div className="flex flex-wrap gap-1">
                        {doc.parties.map((party, partyIndex) => (
                          <Badge key={partyIndex} variant="outline" className="text-xs">
                            {party}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Legal Claims</p>
                      <div className="flex flex-wrap gap-1">
                        {doc.legalClaims.map((claim, claimIndex) => (
                          <Badge key={claimIndex} variant="secondary" className="text-xs">
                            {claim}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {doc.damagesSought > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-600">Damages Sought</p>
                      <p className="font-bold text-green-600">{formatCurrency(doc.damagesSought)}</p>
                    </div>
                  )}
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Extracted: {new Date(doc.extractionTimestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Precedent Analysis */}
      {dataQuality.hasPrecedentCases && enhancedData.precedentAnalysis.precedents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-orange-600" />
              <span>Precedent Cases</span>
              <Badge variant="outline">
                {enhancedData.precedentAnalysis.totalPrecedents} Cases
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enhancedData.precedentAnalysis.precedents.slice(0, 5).map((precedent, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold">{precedent.caseName}</h4>
                      <p className="text-sm text-gray-600">{precedent.citation}</p>
                      <p className="text-sm text-gray-600">{precedent.court}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSimilarityColor(precedent.similarityScore)}>
                        {Math.round(precedent.similarityScore * 100)}% Similar
                      </Badge>
                      <Badge className={getOutcomeColor(precedent.outcome)}>
                        {precedent.outcome}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Legal Issues</p>
                      <div className="flex flex-wrap gap-1">
                        {precedent.legalIssues.map((issue, issueIndex) => (
                          <Badge key={issueIndex} variant="outline" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Strategy Used</p>
                      <p className="text-sm">{precedent.strategyUsed}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{precedent.decisionSummary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Judge: {precedent.judgeName}
                    </div>
                    {precedent.fullTextUrl && (
                      <a 
                        href={precedent.fullTextUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>View Full Text</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedDataDisplay; 