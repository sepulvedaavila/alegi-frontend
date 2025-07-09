import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, FileText, ExternalLink, Users, Gavel, DollarSign, TrendingUp } from 'lucide-react';
import { useEnhancedCaseData } from '@/hooks/useEnhancedCaseData';

interface EnhancedCaseDataProps {
  caseId: string;
  className?: string;
}

const EnhancedCaseData: React.FC<EnhancedCaseDataProps> = ({ 
  caseId, 
  className = '' 
}) => {
  const { enhancedData, loading, error, refreshData } = useEnhancedCaseData(caseId);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Enhanced Case Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 py-8">
            <RefreshCw size={16} className="animate-spin text-gray-400" />
            <span className="text-sm text-gray-600">Loading enhanced case data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Enhanced Case Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 text-red-600 py-4">
            <AlertCircle size={16} />
            <span className="text-sm">Error loading enhanced data</span>
          </div>
          <Button onClick={refreshData} variant="outline" size="sm" className="w-full">
            <RefreshCw size={14} className="mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!enhancedData) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Enhanced Case Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 text-gray-500 py-4">
            <FileText size={16} />
            <span className="text-sm">No enhanced data available</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Enhanced Case Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Quality Metrics */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900 flex items-center">
              <TrendingUp size={16} className="mr-2" />
              Data Quality
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">
                  {Math.round(enhancedData.dataQuality.fusionConfidence * 100)}%
                </div>
                <div className="text-xs text-blue-600">Fusion Confidence</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600">
                  {Math.round(enhancedData.dataQuality.averageExtractionConfidence * 100)}%
                </div>
                <div className="text-xs text-green-600">Extraction Confidence</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-600">
                  {enhancedData.dataQuality.hasDocumentExtractions ? 'Yes' : 'No'}
                </div>
                <div className="text-xs text-purple-600">Documents Processed</div>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg text-center">
                <div className="text-lg font-bold text-indigo-600">
                  {enhancedData.dataQuality.hasPrecedentCases ? 'Yes' : 'No'}
                </div>
                <div className="text-xs text-indigo-600">Precedent Cases</div>
              </div>
            </div>
          </div>

          {/* Fused Data */}
          {enhancedData.fusedData && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <Users size={16} className="mr-2" />
                Fused Case Information
              </h4>
              <div className="space-y-4">
                {enhancedData.fusedData.parties && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">Plaintiffs</h5>
                      {enhancedData.fusedData.parties.plaintiffs && enhancedData.fusedData.parties.plaintiffs.length > 0 ? (
                        <ul className="text-sm text-blue-800 space-y-1">
                          {enhancedData.fusedData.parties.plaintiffs.map((party, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                              {party}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-blue-600">None identified</p>
                      )}
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <h5 className="font-medium text-red-900 mb-2">Defendants</h5>
                      {enhancedData.fusedData.parties.defendants && enhancedData.fusedData.parties.defendants.length > 0 ? (
                        <ul className="text-sm text-red-800 space-y-1">
                          {enhancedData.fusedData.parties.defendants.map((party, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                              {party}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-red-600">None identified</p>
                      )}
                    </div>
                  </div>
                )}

                {enhancedData.fusedData.legalClaims && enhancedData.fusedData.legalClaims.length > 0 && (
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h5 className="font-medium text-yellow-900 mb-2 flex items-center">
                      <Gavel size={14} className="mr-2" />
                      Legal Claims
                    </h5>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      {enhancedData.fusedData.legalClaims.map((claim, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                          {claim}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enhancedData.fusedData.damagesSought && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-2 flex items-center">
                      <DollarSign size={14} className="mr-2" />
                      Damages Sought
                    </h5>
                    <p className="text-sm text-green-800">{enhancedData.fusedData.damagesSought}</p>
                  </div>
                )}

                {enhancedData.fusedData.conflicts && enhancedData.fusedData.conflicts.length > 0 && (
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h5 className="font-medium text-orange-900 mb-2">Data Conflicts Resolved</h5>
                    <ul className="text-sm text-orange-800 space-y-1">
                      {enhancedData.fusedData.conflicts.map((conflict, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                          {conflict}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enhancedData.fusedData.additionalInsights && enhancedData.fusedData.additionalInsights.length > 0 && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h5 className="font-medium text-purple-900 mb-2">Additional Insights</h5>
                    <ul className="text-sm text-purple-800 space-y-1">
                      {enhancedData.fusedData.additionalInsights.map((insight, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Document Analysis */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900 flex items-center">
              <FileText size={16} className="mr-2" />
              Document Analysis ({enhancedData.documentAnalysis.totalDocuments} documents)
            </h4>
            <div className="space-y-3">
              {enhancedData.documentAnalysis.documents.map((doc, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900">{doc.fileName}</h5>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {doc.documentType}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(doc.confidence * 100)}% confidence
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {doc.processingStatus}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {doc.legalClaims && doc.legalClaims.length > 0 && (
                      <div>
                        <strong className="text-gray-700">Legal Claims:</strong>
                        <ul className="mt-1 space-y-1">
                          {doc.legalClaims.map((claim, idx) => (
                            <li key={idx} className="text-gray-600 ml-4">• {claim}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {doc.parties && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong className="text-gray-700">Plaintiffs:</strong>
                          <p className="text-gray-600">
                            {doc.parties.plaintiffs?.join(', ') || 'None'}
                          </p>
                        </div>
                        <div>
                          <strong className="text-gray-700">Defendants:</strong>
                          <p className="text-gray-600">
                            {doc.parties.defendants?.join(', ') || 'None'}
                          </p>
                        </div>
                      </div>
                    )}

                    {doc.damagesSought && (
                      <div>
                        <strong className="text-gray-700">Damages:</strong>
                        <p className="text-gray-600">{doc.damagesSought}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Precedent Analysis */}
          {enhancedData.precedentAnalysis.totalPrecedents > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <Gavel size={16} className="mr-2" />
                Precedent Cases ({enhancedData.precedentAnalysis.totalPrecedents})
              </h4>
              <div className="space-y-3">
                {enhancedData.precedentAnalysis.precedents.map((precedent, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-start justify-between mb-3">
                      <h5 className="font-medium text-blue-900">{precedent.caseName}</h5>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {Math.round(precedent.similarityScore * 100)}% similar
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {precedent.outcome}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <strong className="text-blue-700">Citation:</strong>
                        <p className="text-blue-600">{precedent.citation}</p>
                      </div>
                      <div>
                        <strong className="text-blue-700">Court:</strong>
                        <p className="text-blue-600">{precedent.court}</p>
                      </div>
                      <div>
                        <strong className="text-blue-700">Jurisdiction:</strong>
                        <p className="text-blue-600">{precedent.jurisdiction}</p>
                      </div>
                      <div>
                        <strong className="text-blue-700">Judge:</strong>
                        <p className="text-blue-600">{precedent.judgeName}</p>
                      </div>
                    </div>

                    {precedent.legalIssues && precedent.legalIssues.length > 0 && (
                      <div className="mb-3">
                        <strong className="text-blue-700">Legal Issues:</strong>
                        <ul className="mt-1 space-y-1">
                          {precedent.legalIssues.map((issue, idx) => (
                            <li key={idx} className="text-blue-600 ml-4">• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {precedent.decisionSummary && (
                      <div className="mb-3">
                        <strong className="text-blue-700">Summary:</strong>
                        <p className="text-blue-600 mt-1">{precedent.decisionSummary}</p>
                      </div>
                    )}

                    {precedent.fullTextUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(precedent.fullTextUrl, '_blank')}
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        <ExternalLink size={14} className="mr-2" />
                        View Full Text
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Enrichment */}
          {enhancedData.aiEnrichment && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <TrendingUp size={16} className="mr-2" />
                AI Enrichment
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <strong className="text-green-700 text-sm">Enhanced Case Type:</strong>
                  <p className="text-green-600 text-sm mt-1">{enhancedData.aiEnrichment.enhancedCaseType}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <strong className="text-blue-700 text-sm">Cause of Action:</strong>
                  <p className="text-blue-600 text-sm mt-1">{enhancedData.aiEnrichment.causeOfAction}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <strong className="text-purple-700 text-sm">Applicable Statute:</strong>
                  <p className="text-purple-600 text-sm mt-1">{enhancedData.aiEnrichment.applicableStatute}</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <strong className="text-indigo-700 text-sm">Jurisdiction:</strong>
                  <p className="text-indigo-600 text-sm mt-1">{enhancedData.aiEnrichment.jurisdictionEnriched}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <strong className="text-orange-700 text-sm">Court:</strong>
                  <p className="text-orange-600 text-sm mt-1">{enhancedData.aiEnrichment.courtAbbreviation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCaseData; 