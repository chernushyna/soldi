import React from "react";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import ProductPageTemplate from "../../components/templates/app/dashboard/ProductPageTemplate";
import ProductItem from "../../components/organisms/ProductItem/ProductItem";
import Footer from "../../components/molecules/Footer/Footer";


const DashboardPage = () => {
    return (
        <ProductPageTemplate
            header={<MainHeader/>}
            mainContent={<ProductItem />}
            footer={<Footer />}
        />
    );
};

export default DashboardPage;