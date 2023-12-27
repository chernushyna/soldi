import React from "react";
import DashboardPageTemplate from "../../components/templates/app/dashboard/DashboardPageTemplate";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import ProductGrid from "../../components/organisms/Dashboard/ProductGrid/ProductGrid";
import Footer from "../../components/molecules/Footer/Footer";

const DashboardPage = () => {
    return (
        <DashboardPageTemplate
            header={<MainHeader/>}
            mainContent={<ProductGrid />}
            footer={<Footer />}
        />
    );
};

export default DashboardPage;