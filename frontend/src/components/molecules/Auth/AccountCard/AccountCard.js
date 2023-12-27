import React from "react";
import { formatPrice } from "../../../../helpers/helper";
import "./AccountCard.css";

const AccountCard = ({ productData }) => {
    return (
        <div className={`account-card-container`}>
            <div className={`account-card-info`}>
                <span
                    className={`account-card-link-button`}
                >
                    {productData.address}
                </span>

                <span className={`account-card-size`}>
                    {productData.fullName}
                </span>

                <div className={`account-card-quantity`}>
                    <span>{productData.status}</span>
                </div>
            </div>

            <div className={`account-card-price`}>
                <span className={`account-card-link-button`}>
                    {formatPrice(productData.total)}
                </span>
            </div>
        </div>
    );
};

export default AccountCard;
