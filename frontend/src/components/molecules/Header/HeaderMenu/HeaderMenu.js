import React from 'react';
import './HeaderMenu.css';
import LinkButton from "../../../atoms/LinkButton/LinkButton";
import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";
import CartButton from "../CartButton/CartButton";
import Icon from "../../../../assets/images/icon-account.png";
import { useTranslation } from 'react-i18next';


const NavigationMenu = () => {
    const { t } = useTranslation();
    return (
        <div className={`nav-menu-main`}>
            <div className={`nav-account-icon`}>
                <img className={`header-icon`} src={Icon} alt={`account-icon`} />
                <div>
                    <LinkButton
                        className={`header-link-button`}
                        to={`/account`}
                    >
                        {t('my_account')}
                    </LinkButton>
                </div>
            </div>
            <LanguageDropDown />
            <CartButton />
        </div>
    );
};

export default NavigationMenu;
