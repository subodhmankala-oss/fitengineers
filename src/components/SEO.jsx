import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type }) => {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            {/* End standard metadata tags */}
            {/* Facebook & Instagram tags (Open Graph) */}
            <meta property='og:type' content={type} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            {/* End Facebook & Instagram tags */}
        </Helmet>
    );
};

export default SEO;
