import React from "react";
import ErrorPageTemplate from "../../components/templates/app/error/ErrorPageTemplate";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import Footer from "../../components/molecules/Footer/Footer";
import AboutCard from "../../components/molecules/AboutCard/AboutCard";


const AboutPage = () => {
    return (
        <ErrorPageTemplate
            header={<MainHeader />}
            mainContent={<AboutCard/>}
            footer={<Footer />}
        />
    );
};

export default AboutPage;