import React, {useEffect, useState} from 'react';
import api from "../../../../helpers/api";
import Icon from "../../../../assets/images/icon-cart.png";
import "./CartButton.css";
import LinkButton from "../../../atoms/LinkButton/LinkButton";

const CartButton = () => {
    const [cartItemsNumber, setCartItemsNumber] = useState(0);
    // eslint-disable-next-line
    const [error, setError] = useState(false);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/utility/auth', {withCredentials: true})
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
                    setCartItemsNumber(cartResponse.data.length);
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
    }, []);


    return (
        <div className={`cart-main`}>
            <img
                className="header-icon"
                src={Icon}
                alt="cart-icon"
            />
            <div>
                <LinkButton
                    className={`header-link-button`}
                    to={`/cart`}
                >
                    {cartItemsNumber}
                </LinkButton>
            </div>
        </div>
    );
};

export default CartButton;
