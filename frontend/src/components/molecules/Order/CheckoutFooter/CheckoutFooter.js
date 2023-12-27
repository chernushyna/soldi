import React from "react";
import { formatPrice } from "../../../../helpers/helper";
import "./CheckoutFooter.css";


const CheckoutFooter = ({cartItems}) => {

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    return (
        <div className="checkout-footer-container">
            <span className={`checkout-footer-subtotal`}>
                Subtotal:
                {cartItems && (
                    <span className={`checkout-footer-price`}>
                        {formatPrice(calculateTotalAmount())}
                    </span>
                )}
            </span>
        </div>
    );
};

export default CheckoutFooter;
