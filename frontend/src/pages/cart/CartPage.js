import React from "react";
import CartPageTemplate from "../../components/templates/app/cart/CartPageTemplate";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import CardGrid from "../../components/organisms/Cart/CartGrid/CardGrid";
import Footer from "../../components/molecules/Footer/Footer";

const CartPage = () => {
    return (
        <CartPageTemplate
            mainContent={<CardGrid />}
            header={<MainHeader />}
            footer={<Footer />}
        />
    );
};

export default CartPage;