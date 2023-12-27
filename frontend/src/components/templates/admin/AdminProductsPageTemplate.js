import React from 'react';

const AdminProductsPageTemplate = ({ sidebar, mainContent }) => (
    <div className="admin-template">
        <aside>{sidebar}</aside>
        <main>{mainContent}</main>
    </div>
);

export default AdminProductsPageTemplate;