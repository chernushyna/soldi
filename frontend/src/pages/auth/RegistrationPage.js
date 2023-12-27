import React from "react";
import AuthPageTemplate from "../../components/templates/app/auth/AuthPageTemplate";
import Registration from "../../components/organisms/Registration/Registration";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import Footer from "../../components/molecules/Footer/Footer";

const RegistrationPage = () => {
    return (
        <AuthPageTemplate
            mainContent={<Registration />}
            header={<MainHeader />}
            footer={<Footer />}
        />
    );
};

export default RegistrationPage;