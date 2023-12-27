import React from 'react';
import './Footer.css';
import icon_instagram from '../../../assets/images/icon-instagram.png';
import icon_facebook from '../../../assets/images/icon-facebook.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigate = (socialMedia) => {
        let url = '';
        switch (socialMedia) {
            case 'instagram':
                url = 'https://instagram.com/soldi.shop';
                break;
            case 'facebook':
                url = 'https://facebook.com/soldi.shop';
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <footer className={`footer`}>
            <img
                className={'footer-icon'}
                src={icon_instagram}
                alt={'instagram'}
                onClick={() => handleNavigate('instagram')}
            />

            <img
                className={'footer-icon'}
                src={icon_facebook}
                alt={'facebook'}
                onClick={() => handleNavigate('facebook')}
            />

            <span className={`footer-phone`}>
                +380 (67) 791 81 41
            </span>
        </footer>
    );
};

export default Footer;
