import React from 'react';

const CheckoutPageTemplate = ({header, mainContent, footer}) => (
    <div className="container">
        <header>{header}</header>
        <main>{mainContent}</main>
        <footer>{footer}</footer>
    </div>
);

export default CheckoutPageTemplate;