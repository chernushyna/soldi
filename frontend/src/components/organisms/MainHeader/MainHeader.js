import React from 'react';
import "./MainHeader.css";
import HeaderMenu from "../../molecules/Header/HeaderMenu/HeaderMenu";
import Navigation from "../../molecules/Header/Navigation/Navigation";
import HeaderImage from "../../../assets/images/Soldi.svg";

const MainHeader = () => {
    return (
        <header className={`main-header`}>
            <Navigation/>
            <img
                className={'header-image'}
                src={HeaderImage}
                alt={`header`}
            />
            <HeaderMenu/>
        </header>
    );
};

export default MainHeader;
