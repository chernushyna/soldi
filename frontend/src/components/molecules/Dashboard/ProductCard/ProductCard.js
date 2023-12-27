import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import LinkButton from "../../../atoms/LinkButton/LinkButton";
import { convertImageBinaryData, formatPrice } from "../../../../helpers/helper";

const ProductCard = ({ productId, productName, productPrice, imageBinaryData }) => {
    const basePath = '/all/products';

    const [imageDataUrl, setImageDataUrl] = useState([]);

    const processImageData = async () => {
        if (!imageBinaryData || imageBinaryData.length === 0) {
            return;
        }
        const dataUrls = await convertImageBinaryData(imageBinaryData);
        setImageDataUrl(dataUrls.slice(0, 1));
    };

    useEffect(() => {
        processImageData();
    }, [imageBinaryData]);

    return (
        <div className={`product-card`}>
            <Link to={`${basePath}/${productId}`}>
                <img
                    className={`product-card-image`}
                    src={imageDataUrl}
                    alt={`${productName} Image`}
                />
            </Link>
            <div className={`product-card-info`}>
                <LinkButton
                    className={`product-card-link-button`}
                    to={`${basePath}/${productId}`}
                >
                    {productName}
                </LinkButton>
                <LinkButton
                    className={`product-card-link-button`}
                    to={`${basePath}/${productId}`}
                >
                    {formatPrice(productPrice)}
                </LinkButton>
            </div>
        </div>
    );
};

export default ProductCard;
