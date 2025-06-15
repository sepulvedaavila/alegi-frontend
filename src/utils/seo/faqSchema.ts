
export const generateFaqSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate are ALEGI's legal case predictions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ALEGI's AI model is trained on extensive legal databases and precedents, providing prediction accuracy rates that typically exceed 85% for standard cases. However, predictions should be used as guidance alongside professional legal advice."
        }
      },
      {
        "@type": "Question",
        "name": "How does ALEGI help lawyers in their practice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ALEGI helps lawyers by analyzing case patterns, predicting potential outcomes, identifying relevant precedents, and providing insights on judge tendencies. This allows attorneys to better prepare their arguments and advise clients on realistic expectations."
        }
      },
      {
        "@type": "Question",
        "name": "Is my legal case data secure with ALEGI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. ALEGI employs end-to-end encryption and strict access controls. We do not share or sell your data with third parties, and all information is stored securely in compliance with industry standards."
        }
      }
    ]
  };
};
