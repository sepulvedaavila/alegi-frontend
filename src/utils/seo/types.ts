
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleTags?: string[];
  pageType?: 'website' | 'article' | 'product' | 'service';
}
