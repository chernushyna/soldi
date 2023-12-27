import React from 'react';
import AdminOverviewPageTemplate from "../../components/templates/admin/AdminOverviewPageTemplate";
import AdminSidebar from "../../components/organisms/admin/AdminSidebar/AdminSidebar";
import Overview from "../../components/organisms/admin/Overview/Overview";

const OverviewPage = () => {
    return (
        <AdminOverviewPageTemplate
            sidebar={<AdminSidebar/>}
            mainContent={<Overview/>}
        />
    );
};

export default OverviewPage;
