import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Organization' | 'Event';
  name: string;
  description: string;
  url: string;
  logo?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, name, description, url, logo }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    ...(logo && { logo }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
