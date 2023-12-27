import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../../../helpers/api"
import LoginForm from "../../../molecules/admin/LoginForm/LoginForm";
import Cookie from "js-cookie";

const Login = () => {
    const navigate = useNavigate();

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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/admin/login', credentials);
            if (response.status === 200) {

                Cookie.set('access_token', response.data.access_token, {
                    path: '/',
                    secure: false
                });

                navigate('/admin/overview');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <LoginForm
                credentials={credentials}
                handleChange={handleChange}
                handleLogin={handleLogin}
            />
        </div>
    );
};

export default Login;
