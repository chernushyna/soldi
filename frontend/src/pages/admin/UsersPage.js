    import React from 'react';
import AdminSidebar from "../../components/organisms/admin/AdminSidebar/AdminSidebar";
import AdminUsersPage from "../../components/templates/admin/AdminOverviewPageTemplate";
    import UserPanel from "../../components/organisms/admin/Users/UserPanel";

const UsersPage = () => {
    return (
        <AdminUsersPage
            sidebar={<AdminSidebar/>}
            mainContent={<UserPanel />}
        />
    );
};

export default UsersPage;
