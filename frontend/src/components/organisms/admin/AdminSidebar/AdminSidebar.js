import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../../atoms/Button/Button";
import Label from "../../../atoms/Label/Label";
import Cookies from "js-cookie";
import './AdminSidebar.css';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        Cookies.remove('access_token');
        handleNavigation('/admin');
    };

    return (
        <div className="admin-sidebar">
            <Label htmlFor={`sidebarLabel`}>AdminPanel</Label>
            <Button onClick={() => handleNavigation('/admin/overview')}>Overview</Button>
            <Button onClick={() => handleNavigation('/admin/products')}>Products</Button>
            <Button onClick={() => handleNavigation('/admin/users')}>Users</Button>
            <Button onClick={() => handleNavigation('/admin/orders')}>Orders</Button>
            <div className="logout-button">
                <Button onClick={() => handleLogout()}>Logout</Button>
            </div>
        </div>
    );
};

export default AdminSidebar;
