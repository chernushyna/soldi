import React from 'react';
import Label from '../../../atoms/Label/Label';
import Input from '../../../atoms/Input/Input';
import Button from '../../../atoms/Button/Button';
import './LoginForm.css';
import LinkButton from "../../../atoms/LinkButton/LinkButton";
import {useTranslation} from "react-i18next";

const LoginForm = ({ credentials, handleChange, handleLogin }) => {
    const { t } = useTranslation();
    return (
        <div className="center-container">
            <form className="login-form" onSubmit={handleLogin}>
                <div>
                    <Label htmlFor={`identified`}></Label>
                    <Input
                        type="text"
                        id="identifier"
                        name="identifier"
                        placeholder="Username or Email"
                        value={credentials.identifier}
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
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit">{t('login')}</Button>
                <div className={`login-link-button-container`}>
                    <LinkButton
                        className={`login-link-button`}
                        to={`/register`}
                    >
                        {t('login_text')}
                    </LinkButton>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;