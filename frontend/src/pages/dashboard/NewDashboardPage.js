import React from "react";
import DashboardPageTemplate from "../../components/templates/app/dashboard/DashboardPageTemplate";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import Footer from "../../components/molecules/Footer/Footer";
import NewProductGrid from "../../components/organisms/Dashboard/NewProductGrid/NewProductGrid";

const DashboardPage = () => {
    return (
        <DashboardPageTemplate
            header={<MainHeader/>}
            mainContent={<NewProductGrid />}
            footer={<Footer />}
        />
    );
};

export default DashboardPage;