import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type }) => {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={`https://fitengineerss.com${window.location.pathname}`} />
            
            {/* Open Graph / Facebook / Instagram */}
            <meta property='og:type' content={type} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:url' content={`https://fitengineerss.com${window.location.pathname}`} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;
