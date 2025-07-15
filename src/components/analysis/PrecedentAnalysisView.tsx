import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Scale,
  Calendar,
  MapPin,
  TrendingUp,
  TrendingDown,
  FileText,
  ExternalLink,
  Star,
  Filter,
  SortAsc,
  BookOpen,
  Gavel
} from 'lucide-react';

interface PrecedentCase {
  id: string;
  case_name: string;
  citation: string;
  court: string;
  jurisdiction: string;
  date_decided: string;
  similarity_score: number;
  outcome: 'plaintiff' | 'defendant' | 'settlement';
  decision_summary: string;
  key_holdings: string[];
  relevant_facts: string[];
  legal_principles: string[];
  outcome_amount?: number;
  case_url?: string;
}

interface PrecedentAnalysisViewProps {
  data: PrecedentCase[];
  loading?: boolean;
  error?: Error | null;
  onSearch?: (query: string) => void;
}

export const PrecedentAnalysisView: React.FC<PrecedentAnalysisViewProps> = ({
  data,
  loading = false,
  error = null,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'similarity' | 'date' | 'outcome'>('similarity');
  const [filterOutcome, setFilterOutcome] = useState<'all' | 'plaintiff' | 'defendant' | 'settlement'>('all');
  const [selectedCase, setSelectedCase] = useState<PrecedentCase | null>(null);

  // Filter and sort precedent cases
  const filteredAndSortedCases = useMemo(() => {
    let filtered = data.filter(precedent => {
      const matchesSearch = searchQuery === '' || 
        precedent.case_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        precedent.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
        precedent.decision_summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterOutcome === 'all' || precedent.outcome === filterOutcome;
      
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'similarity':
          return b.similarity_score - a.similarity_score;
        case 'date':
          return new Date(b.date_decided).getTime() - new Date(a.date_decided).getTime();
        case 'outcome':
          return a.outcome.localeCompare(b.outcome);
        default:
          return 0;
      }
    });
  }, [data, searchQuery, sortBy, filterOutcome]);

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
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

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'plaintiff':
        return <TrendingUp className="h-4 w-4" />;
      case 'defendant':
        return <TrendingDown className="h-4 w-4" />;
      case 'settlement':
        return <Scale className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Precedent Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Precedent Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <Scale className="h-4 w-4" />
            <AlertDescription>
              Unable to load precedent analysis data. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Scale className="h-5 w-5" />
          <span>Precedent Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Case List</TabsTrigger>
            <TabsTrigger value="analysis">Similarity Analysis</TabsTrigger>
            <TabsTrigger value="trends">Outcome Trends</TabsTrigger>
          </TabsList>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search cases, courts, or keywords..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'similarity' | 'date' | 'outcome')}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="similarity">Sort by Similarity</option>
                <option value="date">Sort by Date</option>
                <option value="outcome">Sort by Outcome</option>
              </select>
              
              <select
                value={filterOutcome}
                onChange={(e) => setFilterOutcome(e.target.value as 'all' | 'plaintiff' | 'defendant' | 'settlement')}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Outcomes</option>
                <option value="plaintiff">Plaintiff Won</option>
                <option value="defendant">Defendant Won</option>
                <option value="settlement">Settlement</option>
              </select>
            </div>
          </div>

          {/* Case List Tab */}
          <TabsContent value="list" className="space-y-4">
            {filteredAndSortedCases.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Precedents Found</h3>
                  <p className="text-gray-500">
                    {searchQuery ? 'Try adjusting your search terms or filters.' : 'No precedent cases available for this case.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedCases.map((precedent) => (
                  <Card 
                    key={precedent.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedCase(precedent)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{precedent.case_name}</h3>
                            <Badge className={getSimilarityColor(precedent.similarity_score)}>
                              {precedent.similarity_score}% similar
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Gavel className="h-4 w-4" />
                              <span>{precedent.court}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(precedent.date_decided).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{precedent.jurisdiction}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getOutcomeColor(precedent.outcome)}>
                            <div className="flex items-center space-x-1">
                              {getOutcomeIcon(precedent.outcome)}
                              <span className="capitalize">{precedent.outcome}</span>
                            </div>
                          </Badge>
                          {precedent.case_url && (
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-3">{precedent.decision_summary}</p>
                      
                      <div className="text-xs text-gray-600">
                        <p><span className="font-medium">Citation:</span> {precedent.citation}</p>
                        {precedent.outcome_amount && (
                          <p className="mt-1">
                            <span className="font-medium">Award Amount:</span> {' '}
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(precedent.outcome_amount)}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Similarity Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Similarity Distribution */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Similarity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: 'Highly Similar (80%+)', count: data.filter(c => c.similarity_score >= 80).length, color: 'bg-green-500' },
                      { label: 'Moderately Similar (60-79%)', count: data.filter(c => c.similarity_score >= 60 && c.similarity_score < 80).length, color: 'bg-yellow-500' },
                      { label: 'Less Similar (<60%)', count: data.filter(c => c.similarity_score < 60).length, color: 'bg-red-500' }
                    ].map((category) => (
                      <div key={category.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span className="text-sm">{category.label}</span>
                        </div>
                        <span className="text-sm font-medium">{category.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Similar Cases */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Most Similar Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data
                      .sort((a, b) => b.similarity_score - a.similarity_score)
                      .slice(0, 3)
                      .map((precedent, index) => (
                        <div key={precedent.id} className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{precedent.case_name}</p>
                            <p className="text-xs text-gray-600">{precedent.court}</p>
                          </div>
                          <Badge className={getSimilarityColor(precedent.similarity_score)}>
                            {precedent.similarity_score}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Legal Principles */}
            {selectedCase && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Legal Principles - {selectedCase.case_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Holdings</h4>
                      <ul className="space-y-1">
                        {selectedCase.key_holdings.map((holding, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <Star className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{holding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Relevant Facts</h4>
                      <ul className="space-y-1">
                        {selectedCase.relevant_facts.map((fact, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <FileText className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Outcome Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Outcome Statistics */}
              {[
                { outcome: 'plaintiff', label: 'Plaintiff Wins', icon: TrendingUp, color: 'text-green-600' },
                { outcome: 'defendant', label: 'Defendant Wins', icon: TrendingDown, color: 'text-red-600' },
                { outcome: 'settlement', label: 'Settlements', icon: Scale, color: 'text-blue-600' }
              ].map(({ outcome, label, icon: Icon, color }) => {
                const count = data.filter(c => c.outcome === outcome).length;
                const percentage = data.length > 0 ? Math.round((count / data.length) * 100) : 0;
                
                return (
                  <Card key={outcome}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-8 w-8 ${color}`} />
                        <div>
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-2xl font-bold">{count}</p>
                          <p className="text-xs text-gray-600">{percentage}% of cases</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Average Settlement Amounts */}
            {data.some(c => c.outcome_amount) && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Financial Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['plaintiff', 'settlement'].map((outcome) => {
                      const relevantCases = data.filter(c => c.outcome === outcome && c.outcome_amount);
                      const average = relevantCases.length > 0 
                        ? relevantCases.reduce((sum, c) => sum + (c.outcome_amount || 0), 0) / relevantCases.length
                        : 0;
                      
                      return relevantCases.length > 0 && (
                        <div key={outcome} className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 capitalize">Average {outcome} Amount</p>
                          <p className="text-xl font-bold">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(average)}
                          </p>
                          <p className="text-xs text-gray-500">{relevantCases.length} cases</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PrecedentAnalysisView;

export type { PrecedentCase, PrecedentAnalysisViewProps };