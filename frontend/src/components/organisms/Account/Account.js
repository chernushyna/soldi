import React, {useState, useEffect} from "react";
import "./Account.css";
import api from "../../../helpers/api";
import AccountSidebar from "../../molecules/Auth/AccountSidebar/AccountSidebar";
import AccountCard from "../../molecules/Auth/AccountCard/AccountCard";
import {useNavigate} from "react-router-dom";
import Button from "../../atoms/Button/Button";
import {useTranslation} from "react-i18next";

const Account = () => {
    const [order, setOrder] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { t } = useTranslation();


    const fetchCartItems = () => {
        api.get('/utility/auth', {withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    const userId = response.data.id;
                    console.log(userId);
                    return api.get(`/api/orders/${userId}`);
                } else {
                    throw new Error('Failed to retrieve user details. Server returned an error.');
                }
            })
            .then((orderResponse) => {
                if (orderResponse.status === 200) {
                    setOrder(orderResponse.data);
                } else {
                    throw new Error('Failed to retrieve cart items. Server returned an error.');
                }
            })
            .catch((error) => {
                setError(error);
                navigate('/login');
            });
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div>
            <h2 className="center-heading">{t('account')}</h2>
            <div className={`account-container`}>
                <div className={`account-form-container`}>
                    <AccountSidebar/>
                </div>
                <div className={`account-cart-container ${order.length === 0 ? 'no-orders' : ''}`}>
                    {order.length === 0 ? (
                        <div className={`account-no-order-info`}>
                            <span>
                                {t('no_orders_yet')}
                            </span>
                            <Button
                                onClick={() => navigate('/all')}
                            >
                                {t('shop_now')}
                            </Button>
                        </div>
                    ) : (
                        order.map((item) => (
                            <AccountCard
                                key={item.id}
                                productData={{
                                    id: item.id,
                                    address: item.address,
                                    fullName: item.firstName + " " + item.lastName,
                                    status: item.status,
                                    total: item.total,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
