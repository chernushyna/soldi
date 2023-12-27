import React, { useState, useEffect } from "react";
import api from "../../../../helpers/api";
import CheckoutCart from "../../../molecules/Order/CheckoutCart/CheckoutCart";
import CheckoutFooter from "../../../molecules/Order/CheckoutFooter/CheckoutFooter";
import "./Checkout.css";
import CheckoutForm from "../../../molecules/Order/CheckoutForm/CheckoutForm";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            const { quantity } = item;
            const { price } = item.product;
            return total + quantity * price;
        }, 0);
    };


    const fetchCartItems = () => {
        api.get('/utility/auth', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    const userId = response.data.id;
                    setUserId(userId);
                    return api.get(`/api/cart?userId=${userId}`);
                } else {
                    throw new Error('Failed to retrieve user details. Server returned an error.');
                }
            })
            .then((cartResponse) => {
                if (cartResponse.status === 200) {
                    console.log(cartResponse.data);
                    setCartItems(cartResponse.data);
                } else {
                    throw new Error('Failed to retrieve cart items. Server returned an error.');
                }
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleCheckout = async (formData) => {
        try {
            const response = await api.post('/api/orders', {
                userId: userId,
                total: calculateTotal(cartItems),
                items: cartItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    sizeId: item.sizeId,
                })),
                ...formData,
            });

            if (response.status === 201) {
                console.log('Order created:', response.data);
                const itemIdsToDelete = cartItems.map((item) => item.id);
                await api.post('/api/cart/delete', { itemIds: itemIdsToDelete });
                setCartItems([]);
                navigate('/all');
            } else {
                throw new Error('Failed to create the order. Server returned an error.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };



    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className={`checkout-container`}>
            <h2 className="center-heading">{t('checkout')}</h2>
            <div className={`checkout-form-container`}>
                <CheckoutForm onCheckout={handleCheckout}/>
            </div>
            <div className={`checkout-cart-container`}>
                {cartItems && cartItems.map(item => (
                    <CheckoutCart
                        key={item.id}
                        productData={{
                            id: item.id,
                            productId: item.productId,
                            imageBinaryData: item.product.ProductImage,
                            productName: item.product.name,
                            productSize: item.size.size,
                            productQuantity: item.quantity,
                            productPrice: item.product.price,
                        }}
                    />
                ))}
                <CheckoutFooter cartItems={cartItems} />
            </div>
        </div>
    );
};

export default Checkout;
