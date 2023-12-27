import React from 'react';

const ProductPageTemplate = ({header, mainContent, footer}) => (
    <div className="container">
        <header>{header}</header>
        <main>{mainContent}</main>
        <footer>{footer}</footer>
    </div>
);

export default ProductPageTemplate;