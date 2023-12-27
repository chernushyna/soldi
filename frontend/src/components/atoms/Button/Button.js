import React from "react";
import "./Button.css";
const Button = ({ buttonType, children, ...props }) => {
    return (
        <button
            className={`baseButton`}
            type={buttonType || 'button'}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;