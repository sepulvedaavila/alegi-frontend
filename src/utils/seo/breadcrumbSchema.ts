
export const generateBreadcrumbSchema = (title: string, canonicalUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.alegi.ai"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };
};
