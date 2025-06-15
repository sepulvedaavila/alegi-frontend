
export const generateArticleSchema = (
  title: string, 
  ogImage: string, 
  articlePublishedTime?: string, 
  articleModifiedTime?: string, 
  canonicalUrl?: string,
  keywords?: string
) => {
  if (!articlePublishedTime) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": [ogImage],
    "datePublished": articlePublishedTime,
    "dateModified": articleModifiedTime || articlePublishedTime,
    "author": {
      "@type": "Organization",
      "name": "ALEGI"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ALEGI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.alegi.ai/lovable-uploads/f895d413-c639-44b2-9e10-9fd357a8b941.png"
      }
    },
    "keywords": keywords,
    "description": "Transform your legal practice with AI-powered case predictions, legal analytics, and insights.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };
};
