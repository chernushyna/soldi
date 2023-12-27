import React from 'react';

const CartPageTemplate = ({header, mainContent, footer}) => (
    <div className="container">
        <header>{header}</header>
        <main>{mainContent}</main>
        <footer>{footer}</footer>
    </div>
);

export default CartPageTemplate;