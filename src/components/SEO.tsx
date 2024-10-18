import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, ogImage }) => {
  return (
    <Helmet>
      <title>{title} | Esports Management Platform</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || 'https://yourdomain.com/default-og-image.jpg'} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || 'https://yourdomain.com/default-og-image.jpg'} />
    </Helmet>
  );
};

export default SEO;
