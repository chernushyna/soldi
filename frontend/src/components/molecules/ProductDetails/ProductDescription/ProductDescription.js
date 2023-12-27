import React from "react";
import { formatDescription } from "../../../../helpers/helper";
import "./ProductDescription.css";

const ProductDescription = ({ productDescription }) => {
    return (
        <div>
            <h4 className={`description-details-text`} style={{ whiteSpace: 'pre-line' }}>
                {formatDescription(productDescription)}
            </h4>
        </div>
    );
};

export default ProductDescription;
