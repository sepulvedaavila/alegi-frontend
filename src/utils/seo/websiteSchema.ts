
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ALEGI",
    "url": "https://www.alegi.ai",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.alegi.ai/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};
