import React from 'react';
import AdminLoginPageTemplate from "../../components/templates/admin/AdminLoginPageTemplate";
import Login from "../../components/organisms/admin/Login/Login";
const LoginPage = () => {
    return (
        <AdminLoginPageTemplate
            mainContent={<Login/>}
        />
    );
};

export default LoginPage;
