import React from "react";
import AuthPageTemplate from "../../components/templates/app/auth/AuthPageTemplate";
import Login from "../../components/organisms/Login/Login";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import Footer from "../../components/molecules/Footer/Footer";

const LoginPage = () => {
    return (
        <AuthPageTemplate
            mainContent={<Login />}
            header={<MainHeader />}
            footer={<Footer />}
        />
    );
};

export default LoginPage;