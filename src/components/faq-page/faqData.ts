
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqDataType {
  general: FaqItem[];
  features: FaqItem[];
  security: FaqItem[];
  'why-choose': FaqItem[];
}

const faqData: FaqDataType = {
  general: [
    {
      question: "What is Alegi?",
      answer: "Alegi is an AI-powered litigation platform that streamlines legal workflows by automating research, generating case insights, and providing data-driven predictions. It helps legal professionals evaluate cases faster, make informed decisions, and optimize case strategies effectively."
    },
    {
      question: "Who is Alegi for?",
      answer: "Alegi is designed for: Solo Practitioners and Small Firms, In-House Legal Teams, and Large Law Firms to enhance research, reduce costs, and handle large case volumes efficiently."
    },
    {
      question: "How does Alegi work?",
      answer: "Alegi analyzes case information through a proprietary AI model, comparing it with historical legal data, precedent cases, and court trends. It performs multiple layers of analysis and delivers detailed predictions, recommendations, and actionable insights within minutes."
    },
    {
      question: "Why should I use Alegi?",
      answer: "Alegi empowers legal professionals by saving time, enhancing legal insights, and improving case strategy with data-driven decision-making."
    },
    {
      question: "Who uses Alegi?",
      answer: "Alegi is trusted by litigators, corporate legal teams, and law firms to optimize case analysis and improve client outcomes."
    },
    {
      question: "Will Alegi replace lawyers?",
      answer: "No. Alegi is designed to support legal professionals by automating routine tasks. Results must be reviewed by experienced litigators to ensure accuracy and compliance."
    },
    {
      question: "Does Alegi eliminate billable hours?",
      answer: "No. Alegi increases billable hours by automating tedious tasks, allowing lawyers to focus on high-value legal work."
    }
  ],
  features: [
    {
      question: "My firm doesn't do much legal research. Can Alegi still be useful?",
      answer: "Yes! Alegi offers features beyond research, including Document Summarization, Document Q&A, and What-If Analysis to explore case outcomes."
    },
    {
      question: "How do I know the answers from Alegi are accurate?",
      answer: "Alegi pulls data from authoritative legal sources across the US, UK, and Canada to ensure reliable and accurate results."
    },
    {
      question: "Does Alegi replace the need for law students or clerks?",
      answer: "No. Alegi complements the work of law students and clerks by automating repetitive tasks and freeing them to focus on meaningful contributions."
    },
    {
      question: "What jurisdictions does Alegi cover?",
      answer: "Alegi covers legal jurisdictions across the United States, the United Kingdom, and Canada (excluding Quebec)."
    },
    {
      question: "How long does it take to receive a legal answer?",
      answer: "Conversational responses arrive within seconds, while predictions and document generation may take 1–2 minutes."
    }
  ],
  security: [
    {
      question: "Is my data confidential with Alegi?",
      answer: "Yes. Alegi employs industry-standard encryption to protect all client data and restricts access to authorized personnel only."
    },
    {
      question: "How do you ensure the security of customer data?",
      answer: "Alegi uses TLS 1.2+ for data in transit and AES-256 for data at rest. Systems undergo regular security audits to maintain compliance."
    },
    {
      question: "Where is Alegi's data stored?",
      answer: "Our platform stores data on Amazon Web Services (AWS), complying with ISO 27001, SOC 2, and GDPR security standards."
    },
    {
      question: "Is Alegi compliant with data protection regulations?",
      answer: "Yes. Alegi adheres to all applicable legal regulations, including GDPR, ensuring full compliance with data protection standards."
    },
    {
      question: "How long is data retained in Alegi?",
      answer: "Data is retained for the duration of the service agreement and securely deleted upon request or service termination."
    },
    {
      question: "Is my data used to train Alegi's AI models?",
      answer: "No. Alegi does not use sensitive client data to train models. Only generic or redacted data is used for model improvements."
    },
    {
      question: "Does Alegi share my data with third parties?",
      answer: "We may use secure third-party cloud providers like AWS and Azure but do not share confidential data for commercial purposes."
    },
    {
      question: "How is user access managed?",
      answer: "Alegi uses multi-factor authentication (MFA) and role-based access controls (RBAC) to manage and secure user access."
    },
    {
      question: "Does Alegi monitor security threats?",
      answer: "Yes. Our systems undergo continuous threat monitoring with automated tools and manual reviews."
    }
  ],
  'why-choose': [
    {
      question: "Why should I accelerate my practice with Alegi?",
      answer: "Alegi empowers attorneys with innovative AI-driven processes, improved case strategy, and case simulations to predict award outcomes and focus on high-value cases."
    },
    {
      question: "How does Alegi improve profitability?",
      answer: "Alegi helps reduce costs, increase client satisfaction, and improve efficiency by automating research, document analysis, and case insights."
    }
  ]
};

export default faqData;
