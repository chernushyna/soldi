import React, { useState } from 'react';
import api from '../../../helpers/api';
import RegistrationForm from '../../molecules/Auth/RegistrationForm/RegistrationForm';
import './Registration.css'
import {useTranslation} from "react-i18next";
const Registration = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { t } = useTranslation();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/api/register', user);

            if (response.status === 201) {
                window.location.href = '/login';
            } else {
                setError('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An error occurred during registration');
        }
    };

    return (
        <div>
            <h2 className="center-heading">{t('register')}</h2>
            <RegistrationForm
                user={user}
                handleChange={handleChange}
                handleRegister={handleRegister}
                error={error}
            />
        </div>
    );
};

export default Registration;
