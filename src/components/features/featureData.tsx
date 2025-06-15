
import React from 'react';
import { FeatureItem } from './FeatureGroup';
import { 
  PieChart, 
  Scale, 
  ScrollText, 
  Building2, 
  AlertTriangle, 
  DollarSign, 
  Banknote, 
  Clock, 
  FolderOpen, 
  Search, 
  Zap,
  Split,
  FileBarChart,
  ShieldCheck,
  BookOpen,
  Lightbulb,
  GitBranch 
} from 'lucide-react';

export const allFeatures: FeatureItem[] = [
  {
    icon: <PieChart className="h-6 w-6 text-alegi-blue" />,
    title: "Case Outcome Probability Score",
    description: "Get a data-driven probability score predicting your case's likely outcome based on historical trends.",
    delay: "delay-100",
    highlight: true
  },
  {
    icon: <Scale className="h-6 w-6 text-alegi-blue" />,
    title: "Settlement vs. Trial Analysis",
    description: "Compare potential case results if settled versus going to trial, optimizing your legal strategy.",
    delay: "delay-200"
  },
  {
    icon: <ScrollText className="h-6 w-6 text-alegi-blue" />,
    title: "Precedent Analysis",
    description: "Identify relevant past cases and their impact on your current legal matter.",
    delay: "delay-300"
  },
  {
    icon: <Split className="h-6 w-6 text-alegi-blue" />,
    title: "Prediction Breakdown",
    description: "Key factors driving the prediction, revealed. Understand the why behind the outcome.",
    delay: "delay-100"
  },
  {
    icon: <FileBarChart className="h-6 w-6 text-alegi-blue" />,
    title: "Case Complexity Score",
    description: "Quantifies case difficulty via jurisdictions, history, and procedure. Know your case's true challenge.",
    delay: "delay-200"
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-alegi-blue" />,
    title: "Fact Strength Analysis",
    description: "Evaluates evidence, testimony, and documents. Gauge the power of your case's foundation.",
    delay: "delay-300"
  },
  {
    icon: <Building2 className="h-6 w-6 text-alegi-blue" />,
    title: "Judge & Court Trends",
    description: "Analyze judicial patterns, past rulings, and court tendencies for strategic case planning.",
    delay: "delay-100"
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-alegi-blue" />,
    title: "Risk Assessment",
    description: "Evaluate litigation risks, uncover weaknesses, and anticipate challenges before proceeding.",
    delay: "delay-200"
  },
  {
    icon: <DollarSign className="h-6 w-6 text-alegi-blue" />,
    title: "Litigation Cost Estimator",
    description: "Estimate legal costs associated with different case strategies to make informed financial decisions.",
    delay: "delay-300"
  },
  {
    icon: <BookOpen className="h-6 w-6 text-alegi-blue" />,
    title: "Precedent Legal Research",
    description: "Targeted precedent data, directly relevant to your case. Efficient, precise legal insights.",
    delay: "delay-100"
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-alegi-blue" />,
    title: "AI Recommendations",
    description: "AI-driven strategy analysis, scenario planning, and document suggestions. Optimize your approach.",
    delay: "delay-200"
  },
  {
    icon: <GitBranch className="h-6 w-6 text-alegi-blue-light" />,
    title: "What-if Analysis",
    description: "Explore potential outcomes by altering key case variables. See how changes impact predictions.",
    delay: "delay-300",
    highlight: true
  },
  {
    icon: <Banknote className="h-6 w-6 text-alegi-blue" />,
    title: "Financial Outcome Prediction",
    description: "Predict potential financial settlements, damages, or compensation based on historical data.",
    delay: "delay-100"
  },
  {
    icon: <Clock className="h-6 w-6 text-alegi-blue" />,
    title: "Average Time for Resolution",
    description: "Understand how long similar cases typically take to resolve for better case planning.",
    delay: "delay-200"
  },
  {
    icon: <FolderOpen className="h-6 w-6 text-alegi-blue" />,
    title: "Analyzed Cases",
    description: "Leverage insights from thousands of analyzed cases to refine your legal strategy.",
    delay: "delay-300"
  },
  {
    icon: <Search className="h-6 w-6 text-alegi-blue" />,
    title: "Similar Case Finder",
    description: "Instantly find cases with similar facts, judges, or legal arguments for comparison.",
    delay: "delay-100"
  },
  {
    icon: <Zap className="h-6 w-6 text-alegi-blue-light" />,
    title: "Real-Time Law Changes",
    description: "Stay updated on new laws and legal precedents that may impact your case.",
    delay: "delay-200",
    highlight: true
  }
];

export const createFeatureGroups = () => {
  const featureGroups = [];
  for (let i = 0; i < allFeatures.length; i += 6) {
    featureGroups.push(allFeatures.slice(i, i + 6));
  }
  return featureGroups;
};
