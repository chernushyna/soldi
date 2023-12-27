import React, { useEffect, useState } from 'react';
import './ProductGrid.css';
import api from '../../../../helpers/api';
import ProductCard from '../../../molecules/Dashboard/ProductCard/ProductCard';
import ProductFilter from '../ProductFilter/ProductFilter';
import {useTranslation} from "react-i18next";

const ProductGrid = () => {
    const [products, setProducts] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState({
        size: null,
        orderBy: null,
    });

    const  { t } = useTranslation();

    const fetchProducts = () => {
        const queryParams = {};

        if (appliedFilters.size) {
            queryParams.size = appliedFilters.size;
        }

        if (appliedFilters.orderBy) {
            queryParams.orderBy = appliedFilters.orderBy;
        }

        api.get(`/api/products`, {params: queryParams})
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data);
                } else {
                    throw new Error('Failed to retrieve products. Server returned an error.');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [appliedFilters]);

    const handleFilterChange = (filter) => {
        setAppliedFilters({
            size: filter.size,
            orderBy: filter.orderBy,
        });
    };


    return (
        <div>
            <h2 className="center-heading">{t('all')}</h2>
            <ProductFilter onFilterChange={handleFilterChange} />
            <div className={`product-grid-container`}>
                {products &&
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            productId={product.id}
                            productName={product.name}
                            productPrice={product.price}
                            imageBinaryData={product.ProductImage}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProductGrid;
