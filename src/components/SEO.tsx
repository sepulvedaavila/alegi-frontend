
import { Helmet } from 'react-helmet';
import { SEOProps } from '@/utils/seo/types';
import { defaultSEOData } from '@/utils/seo/defaultSeoData';
import { generateOrganizationSchema } from '@/utils/seo/organizationSchema';
import { generateSoftwareAppSchema } from '@/utils/seo/softwareAppSchema';
import { generateServiceSchema } from '@/utils/seo/serviceSchema';
import { generateWebsiteSchema } from '@/utils/seo/websiteSchema';
import { generateFaqSchema } from '@/utils/seo/faqSchema';
import { generateArticleSchema } from '@/utils/seo/articleSchema';
import { generateBreadcrumbSchema } from '@/utils/seo/breadcrumbSchema';

const SEO = ({
  title = defaultSEOData.title,
  description = defaultSEOData.description,
  keywords = defaultSEOData.keywords,
  canonicalUrl = defaultSEOData.canonicalUrl,
  ogImage = defaultSEOData.ogImage,
  articlePublishedTime,
  articleModifiedTime,
  articleTags,
  pageType = defaultSEOData.pageType
}: SEOProps) => {
  const keywordsString = keywords.join(', ');

  // Generate schema data
  const baseSchemaData = generateOrganizationSchema();
  const softwareAppSchema = generateSoftwareAppSchema(description);
  const serviceSchema = generateServiceSchema();
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFaqSchema();
  const breadcrumbSchema = generateBreadcrumbSchema(title, canonicalUrl);
  
  // Generate article schema conditionally
  const articleSchema = generateArticleSchema(
    title,
    ogImage,
    articlePublishedTime,
    articleModifiedTime,
    canonicalUrl,
    articleTags?.join(", ") || keywordsString
  );

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific meta tags */}
      {articlePublishedTime && (
        <>
          <meta property="article:published_time" content={articlePublishedTime} />
          {articleModifiedTime && (
            <meta property="article:modified_time" content={articleModifiedTime} />
          )}
          {articleTags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(baseSchemaData)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(softwareAppSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* FAQ Schema - For homepage only */}
      {canonicalUrl === 'https://www.alegi.ai' && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Article Schema */}
      {pageType === 'article' && articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
