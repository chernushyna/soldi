import React, { useEffect, useState } from "react";
import { convertImageBinaryData, formatPrice } from "../../../../helpers/helper";
import LinkButton from "../../../atoms/LinkButton/LinkButton";
import IconDeleteItem from "../../../../assets/images/icon-delete-cart-item.png"
import "./CartCard.css";
import api from "../../../../helpers/api";
import {useTranslation} from "react-i18next";

const CartCard = ({ productData, onDelete }) => {
    const [imageDataUrl, setImageDataUrl] = useState([]);
    const [quantity, setQuantity] = useState(productData.productQuantity);

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

    const updateQuantity = (newQuantity) => {
        api.put(`/api/cart/${productData.id}`, { quantity: newQuantity }, { withCredentials: true })
            .then(response => {
                console.log("Quantity updated successfully", response);
            })
            .catch(error => {
                console.error("Error updating quantity", error);
            });
    };

    const handleItemDelete = () => {
        api.delete(`/api/cart/${productData.id}`, { withCredentials: true })
            .then(response => {
                console.log("Success", response.data);
                onDelete(productData.id);
            })
            .catch(error => {
                console.error("Error", error);
            });
    };


    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        updateQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            updateQuantity(quantity - 1);
        }
    };

    return (
        <div className={`cart-card-container`}>
            <img
                className={`cart-card-image`}
                src={imageDataUrl}
                alt={`${productData.productName} Image`}
            />

            <div className={`cart-card-info`}>
                <LinkButton
                    className={`cart-card-link-button`}
                    to={`/all/products/${productData.productId}`}
                >
                    {productData.productName}
                </LinkButton>

                <span className={`cart-card-size`}>
                    {t('size')}: {productData.productSize}
                </span>

                <div className={`cart-card-quantity`}>
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                </div>
            </div>

            <div className={`cart-card-price`}>
                <span className={`cart-card-link-button`}>
                    {formatPrice(productData.productPrice)}
                </span>
            </div>

            <div>
                <img
                    className={`icon-delete-item`}
                    src={IconDeleteItem}
                    alt={`icon-delete-item`}
                    onClick={handleItemDelete}
                />
            </div>
        </div>
    );
};

export default CartCard;
