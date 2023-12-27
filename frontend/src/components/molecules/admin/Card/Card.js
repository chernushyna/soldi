import React from 'react';
import { useNavigate } from 'react-router-dom';
import Label from "../../../atoms/Label/Label";
import './Card.css';

const Card = ({ to, labelFor, label, number }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (to) {
            navigate(to);
        }
    };

    return (
        <div className="card" onClick={handleNavigation}>
            <Label htmlFor={labelFor} text={label} className="label" />
            <div className="number">{number}</div>
        </div>
    );
};

export default Card;
