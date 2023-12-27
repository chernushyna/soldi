import React, { useState, useEffect } from "react";
import CartCard from "../../../molecules/Cart/CartCard/CartCard";
import api from "../../../../helpers/api";
import CardFooter from "../../../molecules/Cart/CartFooter/CartFooter";
import {useTranslation} from "react-i18next";

const CardGrid = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { t } = useTranslation();
    const fetchCartItems = () => {
        setLoading(true);

        api.get('/utility/auth', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    const userId = response.data.id;
                    return api.get(`/api/cart?userId=${userId}`);
                } else {
                    throw new Error('Failed to retrieve user details. Server returned an error.');
                }
            })
            .then((cartResponse) => {
                if (cartResponse.status === 200) {
                    setCartItems(cartResponse.data);
                } else {
                    throw new Error('Failed to retrieve cart items. Server returned an error.');
                }
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleItemDelete = (deletedItemId) => {
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== deletedItemId));
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div>
            <h2 className="center-heading">{t('cart')}</h2>
            {cartItems && cartItems.map(item => (
                <CartCard
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
                    onDelete={handleItemDelete}
                />
            ))}
            <CardFooter cartItems={cartItems} />
        </div>
    );
};

export default CardGrid;
