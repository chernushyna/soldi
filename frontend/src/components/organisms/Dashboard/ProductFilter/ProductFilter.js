import React, { useEffect, useState } from "react";
import api from "../../../../helpers/api";
import "./ProductFilter.css";
import LinkButton from "../../../atoms/LinkButton/LinkButton";
import {useTranslation} from "react-i18next";

const ProductFilter = ({ onFilterChange }) => {
    const [sizes, setSizes] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedOrderBy, setSelectedOrderBy] = useState(null);

    const  { t } = useTranslation();

    const orderByFilter = [
        { key: "desc", value: t("low_to_high") },
        { key: "asc", value: t("high_to_low") },
    ];

    let selectedFilterSize = "all";
    let selectedFilterOrder = "desc";

    const fetchUniqueSizes = () => {
        api
            .get("/api/products/uniqueSizes")
            .then((response) => {
                if (response.status === 200) {
                    setSizes(response.data.uniqueSize);
                } else {
                    throw new Error(
                        "Failed to retrieve unique sizes. Server returned an error."
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const openFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const updateFilter = () => {
        const updatedFilter = {size: selectedFilterSize, orderBy: selectedFilterOrder};
        onFilterChange(updatedFilter);
        setIsFilterOpen(false);
    };


    useEffect(() => {
        fetchUniqueSizes();
    }, []);

    return (
        <div className={`filter-container`}>
            <LinkButton className={`filter-link-button`} onClick={openFilter}>
                {t('filter')} +
            </LinkButton>
            {isFilterOpen && (
                <div className={`filter-open-container`}>
                    <div className={`filter-open-options`}>
                        <div className={`filter-option-line`}>
                            <h2 className={`filter-link-button`}>{t('size')}:</h2>
                            {sizes &&
                                sizes.map((size) => (
                                    <LinkButton
                                        key={size.id}
                                        className={`filter-option ${
                                            selectedSize === size.id ? "selected" : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedSize(size.size);
                                            selectedFilterSize = size.size;
                                            updateFilter();
                                        }}
                                    >
                                        {size.size}
                                    </LinkButton>
                                ))}
                        </div>
                        <div className={`filter-option-line`}>
                            <h2 className={`filter-link-button`}>{t('order_by')}:</h2>
                            {orderByFilter.map((orderBy) => (
                                <LinkButton
                                    key={orderBy.key}
                                    className={`filter-option ${
                                        selectedOrderBy === orderBy.key ? "selected" : ""
                                    }`}
                                    onClick={() => {
                                        setSelectedOrderBy(orderBy.key);
                                        selectedFilterOrder = orderBy.key;
                                        updateFilter();
                                    }}
                                >
                                    {orderBy.value.toUpperCase()}
                                </LinkButton>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilter;
