import React from "react";
import MainHeader from "../../../components/organisms/MainHeader/MainHeader";
import CheckoutPageTemplate from "../../../components/templates/app/order/CheckoutPageTemplate";
import CheckoutForm from "../../../components/molecules/Order/CheckoutForm/CheckoutForm";
import CheckoutCart from "../../../components/molecules/Order/CheckoutCart/CheckoutCart";
import Checkout from "../../../components/organisms/Order/Checkout/Checkout";
import Footer from "../../../components/molecules/Footer/Footer";

const CartPage = () => {
    return (
        <CheckoutPageTemplate
            mainContent={<Checkout />}
            header={<MainHeader />}
            footer={<Footer />}
        />
    );
};

export default CartPage;