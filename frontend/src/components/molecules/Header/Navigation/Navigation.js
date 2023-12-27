import React from 'react';
import LinkButton from "../../../atoms/LinkButton/LinkButton";
import './Navigation.css';
import {useTranslation} from "react-i18next";

const Navigation = () => {
    const { t } = useTranslation();

    return (
        <div className={`nav-main`}>
            <LinkButton
                to={`/all`}
            >
                {t('all')}
            </LinkButton>

            <LinkButton
                to={`/all/new`}
            >
                {t('new')}
            </LinkButton>

            <LinkButton
                to={`/about`}
            >
                {t('about')}
            </LinkButton>
        </div>
    );
};

export default Navigation;
