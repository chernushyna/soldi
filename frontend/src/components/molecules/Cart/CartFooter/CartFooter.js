import React from "react";
import { formatPrice } from "../../../../helpers/helper";
import "./CartFooter.css";
import Button from "../../../atoms/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CardFooter = ({cartItems}) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    const handleClick = () => {
        navigate('/checkout')
    };


    return (
        <div className="card-footer-container">
            <span className={`card-footer-subtotal`}>
                {t('subtotal')}:
                {cartItems && (
                    <span className={`card-footer-price`}>
                        {formatPrice(calculateTotalAmount())}
                    </span>
                )}
            </span>
            <Button
                buttonType={`submit`}
                onClick={handleClick}
                >
                {t('proceed_with_order')}
            </Button>
        </div>
    );
};

export default CardFooter;
