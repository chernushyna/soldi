import React, {useEffect, useState} from "react";
import PriceDetails from "../../molecules/ProductDetails/PriceDetails/PriceDetails";
import api from "../../../helpers/api";
import {useLocation, useNavigate} from "react-router-dom";
import {extractProductID} from "../../../helpers/helper";
import SizeSelection from "../../molecules/ProductDetails/SizeSelection/SizeSelection";
import AddCart from "../../molecules/ProductDetails/AddCart/AddCart";
import ProductDescription from "../../molecules/ProductDetails/ProductDescription/ProductDescription";
import ImageSelection from "../../molecules/ProductDetails/ImageSelection/ImageSelection";
import "./ProductItem.css";

const ProductItem = () => {
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const productId = extractProductID(location.pathname);

    const fetchProductData = () => {
        api.get(`/api/product/${productId}`)
            .then((response) => {
                if (response.status === 200) {
                    setProduct(response.data);
                    setSelectedSize(response.data.ProductSizes[0].id);
                }
            })
            .catch((error) => {
                setError(true);
                navigate('/error');
            });
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    return (
        <div className="product-item-wrapper">
            {product && (
                <>
                    <div className={`image-select-container`}>
                        <ImageSelection imageBinaryData={product.ProductImage}/>
                    </div>
                    <div className={`product-item-container`}>
                        <PriceDetails productPrice={product.price} productName={product.name}/>
                        <SizeSelection sizes={product.ProductSizes} onSelect={handleSizeSelect}/>
                        <AddCart productId={product.id} sizeId={selectedSize}/>
                        <ProductDescription productDescription={product.description}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductItem;
