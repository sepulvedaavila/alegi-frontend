
export const generateSoftwareAppSchema = (description: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ALEGI",
    "applicationCategory": "LegalService, BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": description
  };
};
