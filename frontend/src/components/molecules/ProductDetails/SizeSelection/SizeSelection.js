
import React, { useEffect, useState } from "react";
import "./SizeSelection.css";
import {useTranslation} from "react-i18next";

const SizeSelection = ({ sizes, onSelect }) => {
    const [activeSize, setActiveSize] = useState(null);

    const { t } = useTranslation();

    const handleSizeClick = (sizeId) => {
        setActiveSize(sizeId);
        onSelect(sizeId);
    };

    useEffect(() => {
        if (sizes && sizes.length > 0) {
            setActiveSize(sizes[0].id);
        }
    }, [sizes]);

    return (
        <div>
            <h2 className="size-select-text">{t('size')}:</h2>
            {sizes && (
                <div className="size-options-container">
                    {sizes.map((size) => (
                        <h3
                            key={size.id}
                            className={`size-select-option ${activeSize === size.id ? 'active' : ''}`}
                            onClick={() => handleSizeClick(size.id)}
                        >
                            {size.size}
                        </h3>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SizeSelection;
