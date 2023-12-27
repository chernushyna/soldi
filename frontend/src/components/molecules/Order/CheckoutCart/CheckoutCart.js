import React, { useEffect, useState } from "react";
import { convertImageBinaryData, formatPrice } from "../../../../helpers/helper";
import LinkButton from "../../../atoms/LinkButton/LinkButton";
import "./CheckoutCart.css";
import {useTranslation} from "react-i18next";

const CheckoutCart = ({ productData }) => {
    const [imageDataUrl, setImageDataUrl] = useState([]);

    const { t } = useTranslation();
    useEffect(() => {
        processImageData();
    }, [productData.imageBinaryData]);

    const processImageData = async () => {
        if (!productData.imageBinaryData || productData.imageBinaryData.length === 0) {
            return;
        }
        const dataUrls = await convertImageBinaryData(productData.imageBinaryData);
        setImageDataUrl(dataUrls.slice(0, 1));
    };

    return (
        <div className={`checkout-card-container`}>
            <img
                className={`checkout-card-image`}
                src={imageDataUrl}
                alt={`${productData.productName} Image`}
            />

            <div className={`checkout-card-info`}>
                <LinkButton
                    className={`checkout-card-link-button`}
                    to={`/all/products/${productData.productId}`}
                >
                    {productData.productName}
                </LinkButton>

                <span className={`checkout-card-size`}>
                    {t('size')}: {productData.productSize}
                </span>

                <div className={`checkout-card-quantity`}>
                    <span>{productData.productQuantity}</span>
                </div>
            </div>

            <div className={`checkout-card-price`}>
                <span className={`checkout-card-link-button`}>
                    {formatPrice(productData.productPrice)}
                </span>
            </div>
        </div>
    );
};

export default CheckoutCart;
