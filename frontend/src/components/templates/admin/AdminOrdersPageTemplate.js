import React from 'react';

const AdminOrdersPageTemplate = ({ sidebar, mainContent }) => (
    <div className="admin-template">
        <aside>{sidebar}</aside>
        <main>{mainContent}</main>
    </div>
);

export default AdminOrdersPageTemplate;