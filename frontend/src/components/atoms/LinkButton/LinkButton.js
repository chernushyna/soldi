import React from 'react';
import { Link } from 'react-router-dom';
import "./LinkButton.css";

const LinkButton = ({ to, children, className, onClick }) => {
    return (
        <Link
            to={to}
            className={className}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

export default LinkButton;
