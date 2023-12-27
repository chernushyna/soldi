import React from 'react';
import Label from '../../../atoms/Label/Label';
import Input from '../../../atoms/Input/Input';
import Button from '../../../atoms/Button/Button';
import './LoginForm.css';

const LoginForm = ({ credentials, handleChange, handleLogin }) => {

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
                <Button type="submit">Log in</Button>
            </form>
        </div>
    );
};

export default LoginForm;