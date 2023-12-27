import React from "react";
import ErrorPageTemplate from "../../components/templates/app/error/ErrorPageTemplate";
import ErrorModal from "../../components/molecules/ErrorCard/ErrorCard";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import Footer from "../../components/molecules/Footer/Footer";


const ErrorPage = () => {
    return (
        <ErrorPageTemplate
            mainContent={<ErrorModal/>}
            header={<MainHeader />}
            footer={<Footer />}
        />
    );
};

export default ErrorPage;