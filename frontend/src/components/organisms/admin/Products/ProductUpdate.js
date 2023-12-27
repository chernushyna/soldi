
import React, { useState, useEffect } from 'react';
import api from '../../../../helpers/api';

const ProductUpdate = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        stockQuantity: 0,
        category: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreate = async () => {
        try {
            await api.put(`/admin/products`, formData)
                .then((response) => {
                    if (response.status === 201) {

                    }
                })
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <h2>Create Product</h2>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <label>Stock Quantity:</label>
                <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                />
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
                <button type="button" onClick={handleCreate}>
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default ProductUpdate;
