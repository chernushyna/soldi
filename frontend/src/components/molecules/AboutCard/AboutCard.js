import React from 'react';
import './AboutCard.css';
import {useTranslation} from "react-i18next";

const AboutCard = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h2 className="center-heading">{t('about')}</h2>
            <div className={`about-us-container`}>
                <div className={`about-us-form`}>
                    <h2 className={`heading-h2`}>{t('about')}</h2>
                    <h3 className={`about-us-text`}>
                        {t('about_us_text1')}
                    </h3>
                    <h3 className={`about-us-text`}>
                        {t('about_us_text2')}
                    </h3>
                    <h3 className={`about-us-text`}>
                        {t('about_us_text3')}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default AboutCard;
