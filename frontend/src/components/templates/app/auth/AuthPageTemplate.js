import React from 'react';

const AuthPageTemplate = ({header, mainContent, footer}) => (
    <div className={`container`}>
        <header>{header}</header>
        <main>{mainContent}</main>
        <footer>{footer}</footer>
    </div>
);

export default AuthPageTemplate;