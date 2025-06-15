
export const generateServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Legal Case Prediction",
    "provider": {
      "@type": "Organization",
      "name": "ALEGI"
    },
    "serviceType": "Legal Technology",
    "description": "AI-powered legal case outcome prediction and analysis for law professionals",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
};
