import React, {useState} from 'react';
import Label from '../../../atoms/Label/Label';
import Input from '../../../atoms/Input/Input';
import Button from '../../../atoms/Button/Button';
import './CheckoutForm.css';
import {useTranslation} from "react-i18next";

const CheckoutForm = ({onCheckout}) => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
    });

    const { t } = useTranslation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        onCheckout(formData);
    };

    return (
        <div className="checkout-container">
            <form className="checkout-form" onSubmit={handleCheckout}>
                <div className={`checkout-contact`}>
                    <span className={`checkout-heading`}>{t('contact')}</span>
                    <div className={`checkout-email`}>
                        <Label htmlFor={`email`}></Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className={`checkout-delivery`}>
                    <span className={`checkout-heading`}>{t('delivery')}</span>
                    <div className={`checkout-user-name`}>
                        <Label htmlFor={`firstName`}></Label>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First name"
                            onChange={handleInputChange}
                            required
                        />
                        <Label htmlFor={`lastName`}></Label>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor={`address`}></Label>
                        <Input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor={`phone`}></Label>
                        <Input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Phone number"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <Button type="submit">{t('complete_order')}</Button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;