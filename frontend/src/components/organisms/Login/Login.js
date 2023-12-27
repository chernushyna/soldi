import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../helpers/api';
import LoginForm from '../../molecules/Auth/LoginForm/LoginForm';
import Cookie from "js-cookie";
import './Login.css'
import {useTranslation} from "react-i18next";
const Login = () => {
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [credentials, setCredentials] = useState({
        identifier: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleNavigate = () => {
        navigate('/register');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/login', credentials);
            if (response.status === 200) {

                Cookie.set('access_token', response.data.access_token, {
                    path: '/',
                    secure: false
                });

                navigate('/all');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h2 className="center-heading">{t('login')}</h2>
            <LoginForm
                credentials={credentials}
                handleChange={handleChange}
                handleLogin={handleLogin}
                handleNavigate={handleNavigate}
            />
        </div>
    );
};

export default Login;
