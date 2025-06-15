
import React from 'react';
import { 
  ChartBar,
  Scale, 
  ScrollText, 
  Split, 
  ShieldCheck, 
  FileBarChart,
  Building2, 
  GitBranch,
  AlertTriangle, 
  DollarSign, 
  Lightbulb, 
  BookOpen,
  Banknote, 
  Clock, 
  FolderOpen, 
  Search, 
  Zap
} from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

export const featuresList: FeatureItem[] = [
  {
    icon: <ChartBar className="h-6 w-6 text-alegi-blue" />,
    title: "Predict with Precision",
    description: "Receive data-driven probability scores forecasting your case's likely outcome based on historical legal data.",
    highlight: true
  },
  {
    icon: <Scale className="h-6 w-6 text-alegi-blue" />,
    title: "Strategic Decisions Simplified",
    description: "Analyze the implications of settling versus proceeding to trial, guiding you to the optimal legal strategy."
  },
  {
    icon: <ScrollText className="h-6 w-6 text-alegi-blue" />,
    title: "Empowered by Precedent",
    description: "Easily identify relevant past rulings and assess their direct influence on your case."
  },
  {
    icon: <Split className="h-6 w-6 text-alegi-blue" />,
    title: "Understand the Why",
    description: "Clearly see the key factors influencing your case predictions, bringing transparency to your legal strategy."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-alegi-blue" />,
    title: "Measure Your Case's Strength",
    description: "Evaluate your evidence, testimony, and documentation to gauge your case's foundational strength clearly and objectively."
  },
  {
    icon: <FileBarChart className="h-6 w-6 text-alegi-blue" />,
    title: "Define the Challenge",
    description: "Quantify your case's complexity based on jurisdictional nuances, procedural history, and legal intricacies."
  },
  {
    icon: <GitBranch className="h-6 w-6 text-alegi-blue-light" />,
    title: "Explore All Outcomes",
    description: "Adjust key variables to instantly see how potential changes might affect your legal case outcomes.",
    highlight: true
  },
  {
    icon: <Building2 className="h-6 w-6 text-alegi-blue" />,
    title: "Navigate Judicial Insights",
    description: "Leverage historical judicial patterns and court behaviors to strategize more effectively."
  },
  {
    icon: <DollarSign className="h-6 w-6 text-alegi-blue" />,
    title: "Plan Your Finances",
    description: "Accurately estimate legal expenses based on different case scenarios, enabling informed financial planning."
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-alegi-blue" />,
    title: "Identify Risks Early",
    description: "Evaluate litigation risks proactively, identify weaknesses, and anticipate challenges well in advance."
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-alegi-blue" />,
    title: "Strategic AI Guidance",
    description: "Get AI-powered strategy recommendations, scenario analyses, and document suggestions to optimize your legal approach."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-alegi-blue" />,
    title: "Precise & Relevant Research",
    description: "Efficiently access targeted precedents specifically relevant to your unique case."
  },
  {
    icon: <Banknote className="h-6 w-6 text-alegi-blue" />,
    title: "Financial Forecasting",
    description: "Predict potential financial settlements, damages, or compensation using comprehensive historical analysis."
  },
  {
    icon: <Clock className="h-6 w-6 text-alegi-blue" />,
    title: "Plan with Certainty",
    description: "Anticipate case timelines by understanding typical resolution periods for similar legal matters."
  },
  {
    icon: <FolderOpen className="h-6 w-6 text-alegi-blue" />,
    title: "Insights from Experience",
    description: "Benefit from detailed insights gained from thousands of analyzed legal cases, refining your strategic approach."
  },
  {
    icon: <Zap className="h-6 w-6 text-alegi-blue-light" />,
    title: "Stay Current",
    description: "Stay informed about emerging legal changes and precedents directly affecting your ongoing case.",
    highlight: true
  },
  {
    icon: <Search className="h-6 w-6 text-alegi-blue" />,
    title: "Discover Relevant Cases",
    description: "Quickly find and analyze cases with similar facts, arguments, or judicial contexts."
  }
];
