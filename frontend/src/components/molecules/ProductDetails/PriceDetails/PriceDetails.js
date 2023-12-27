import React from "react";
import "./PriceDetails.css";
import {formatPrice} from "../../../../helpers/helper";
const PriceDetails = ({ productPrice, productName }) => {

    return (
        <div>
            <h2
                className="name-details-text"
            >
                {productName}
            </h2>
            <h2
                className="price-details-text"
            >
                {formatPrice(productPrice)}
            </h2>
        </div>
    );
};

export default PriceDetails;
