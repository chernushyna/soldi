import React from 'react';

const AdminOverviewPageTemplate = ({ sidebar, mainContent }) => (
    <div className="admin-template">
        <aside>{sidebar}</aside>
        <main>{mainContent}</main>
    </div>
);

export default AdminOverviewPageTemplate;