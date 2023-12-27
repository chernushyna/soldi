import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorCard.css';
import Button from "../../atoms/Button/Button";
import {useTranslation} from "react-i18next";

const ErrorCard = () => {
    const navigate = useNavigate();

    const { t } = useTranslation();
    const goBack = () => {
        navigate('/all');
    };

    return (
        <div className={`error-container`}>
            <div className={`error-form`}>
                <h2 className={`heading-h2`}>{t("error404")}</h2>
                <h3 className={`error-label`}>{t('error404text')}</h3>
                <div className={`error-button`}>
                    <Button type="submit" onClick={goBack}>
                        {t('error404back')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorCard;
