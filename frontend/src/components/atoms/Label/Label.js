import React from 'react';
import './Label.css'

const Label = ({ htmlFor, text, className}) => {
    return <label
        className={className}
        htmlFor={htmlFor}
    >
        {text}
    </label>;
};

export default Label;
