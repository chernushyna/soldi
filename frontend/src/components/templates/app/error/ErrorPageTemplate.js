import React from 'react';

const ErrorPageTemplate = ({header, mainContent, footer}) => (
    <div className="container">
        <header>{header}</header>
        <main>{mainContent}</main>
        <footer>{footer}</footer>
    </div>
);

export default ErrorPageTemplate;