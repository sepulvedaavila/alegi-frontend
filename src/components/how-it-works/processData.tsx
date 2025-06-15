
import React from 'react';
import {
  ClipboardList,
  Brain,
  FileText,
  BarChart4,
  ShieldCheck,
  RefreshCw,
  Share2,
  GitBranch
} from 'lucide-react';

export const processSteps = [
  {
    title: "Start with Case Details",
    description: "Easily enter key information about your current case, including case facts, parties involved, court details, and relevant documents. Our intuitive platform ensures that all necessary information is captured accurately and efficiently.",
    icon: <ClipboardList className="w-12 h-12 text-alegi-blue" />
  },
  {
    title: "AI-Powered Precision",
    description: "Our proprietary data model and AI algorithm processes your case information through multiple layers of analysis. Each cycle evaluates the most relevant factors, ensuring that no critical detail is overlooked.",
    icon: <Brain className="w-12 h-12 text-alegi-blue" />
  },
  {
    title: "Clean and Structured Data",
    description: "All submitted information is cleaned, structured, and formatted to ensure consistency and accuracy. Our AI filters out irrelevant or redundant information, leaving only the most essential data for analysis.",
    icon: <FileText className="w-12 h-12 text-alegi-blue" />
  },
  {
    title: "In-Depth Case Analysis",
    description: "Our proprietary algorithm performs complex calculations based on precedent cases, current law changes, court trends, and hundreds of other data points to generate precise predictions.",
    icon: <BarChart4 className="w-12 h-12 text-alegi-blue" />
  },
  {
    title: "Ensuring Accuracy and Reliability",
    description: "All processed data undergoes a rigorous quality control process to filter out inaccuracies, hallucinations, or errors. Our system performs validation checks to ensure that the results align with real-world legal standards.",
    icon: <ShieldCheck className="w-12 h-12 text-alegi-blue" />
  },
  {
    title: "Strengthen Case Insights",
    description: "The case data is rerun through additional cycles of analysis to explore strong and weak case arguments, award calculation rationale, and improve prediction reliability.",
    icon: <RefreshCw className="w-12 h-12 text-alegi-blue" />
  },
  {
    title: "Share, Collaborate, and Refine",
    description: "Once processed, all case predictions and insights are presented in an intuitive, user-friendly interface. Collaborate with your team or share results with clients confidently and seamlessly.",
    icon: <Share2 className="w-12 h-12 text-alegi-blue" />
  },
  {
    title: "Explore Different Case Scenarios",
    description: "Run dynamic What-If Analysis to modify key variables and explore alternate case outcomes. Test different strategies, evaluate possible risks, and identify optimal approaches before proceeding.",
    icon: <GitBranch className="w-12 h-12 text-alegi-blue" />
  }
];
