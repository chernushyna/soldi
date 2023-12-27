import React from 'react';
import Label from '../../../atoms/Label/Label';
import Input from '../../../atoms/Input/Input';
import Button from '../../../atoms/Button/Button';
import './RegistrationForm.css';
import LinkButton from "../../../atoms/LinkButton/LinkButton";
import {useTranslation} from "react-i18next";

const RegistrationForm = ({ user, handleChange, handleRegister, error }) => {
    const { t } = useTranslation();

    return (
        <form className="register-form" onSubmit={handleRegister}>
            {error && <div className="error">{error}</div>}
            <div>
                <Label htmlFor={`username`}></Label>
                <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor={`email`}></Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor={`password`}></Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <Button type="submit">{t('register')}</Button>
            <div className={`login-link-button-container`}>
                <LinkButton
                    className={`login-link-button`}
                    to={`/login`}
                >
                    {t('register_text')}
                </LinkButton>
            </div>
        </form>
    );
};

export default RegistrationForm;