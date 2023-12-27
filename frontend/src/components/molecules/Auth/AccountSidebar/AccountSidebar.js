import React from 'react';
import Button from '../../../atoms/Button/Button';
import Cookies from "js-cookie";
import "./AccountSidebar.css";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const AccountSidebar = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('access_token');
        navigate('/all');
    };

    return (
        <div className={`account-sidebar`}>
            <span className={`account-sidebar-span`}>
                {t('order_history')}
            </span>
            <Button
                type="submit"
                onClick={handleLogout}
            >
                {t('logout')}
            </Button>
        </div>
    );
};

export default AccountSidebar;