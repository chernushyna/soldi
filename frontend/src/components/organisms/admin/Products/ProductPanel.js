import React, {useEffect, useState} from 'react';
import api from "../../../../helpers/api";
import Button from "../../../atoms/Button/Button";
import ImageUploadButton from "../../../molecules/admin/Upload/Upload";
import "./ProductPanel.css";

const StockList = () => {
    const [products, setProducts] = useState(null);
    const [editableProductId, setEditableProductId] = useState(null);
    const [editedProductData, setEditedProductData] = useState({});

    const fetchProducts = () => {
        api.get('/api/products', {withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data);
                    console.log(response.data);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (productId) => {
        setEditableProductId(productId);
        const productsToEdit = products.find(product => product.id === productId);
        setEditedProductData({
            name: productsToEdit.name,
            description: productsToEdit.description,
            price: productsToEdit.price,
            stockQuantity: productsToEdit.stockQuantity,
            category: productsToEdit.category,
        });
    };

    const handleSave = (productId) => {
        api.put(`/admin/products/${productId}`, editedProductData, {withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    fetchProducts();
                }
            })
            .catch((e) => {
                console.error(e);
            });
        setEditableProductId(null);
    };

    const handleCancel = () => {
        setEditableProductId(null);
    };

    const handleDelete = (productId) => {
        api.delete(`/admin/products/${productId}`, {withCredentials: true})
            .then((response) => {
                if (response.status === 204) {
                    fetchProducts();
                }
            })
            .catch(error => {
                console.error("Error deleting stock:", error);
            });
    };

    const renderEditFields = (productId) => (
        <>
            <Button className={`option-button`} onClick={() => handleSave(productId)}>Save</Button>
            <Button className={`option-button`} onClick={() => handleCancel()}>Cancel</Button>
        </>
    );

    const renderNormalButtons = (productId) => (
        <>
            <Button className={`option-button`} onClick={() => handleEdit(productId)}>Edit</Button>
            <Button className={`option-button`} onClick={() => handleDelete(productId)}>Delete</Button>
            <ImageUploadButton productId={productId}/>
        </>
    );

    return (
        <div className={`stock-list-container`}>
            <table className="stock-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {products && products.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <td>
                                {editableProductId === item.id ? (
                                    <input
                                        type="text"
                                        value={editedProductData.name || ''}
                                        onChange={(e) => setEditedProductData({
                                            ...editedProductData,
                                            name: e.target.value
                                        })}
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td>
                                {editableProductId === item.id ? (
                                    <input
                                        type="text"
                                        value={editedProductData.description || ''}
                                        onChange={(e) => setEditedProductData({
                                            ...editedProductData,
                                            description: e.target.value
                                        })}
                                    />
                                ) : (
                                    item.description
                                )}
                            </td>
                            <td>
                                {editableProductId === item.id ? (
                                    <input
                                        type="text"
                                        value={editedProductData.price || ''}
                                        onChange={(e) => setEditedProductData({
                                            ...editedProductData,
                                            price: e.target.value
                                        })}
                                    />
                                ) : (
                                    item.price
                                )}
                            </td>
                            <td>
                                {editableProductId === item.id ? (
                                    <input
                                        type="text"
                                        value={editedProductData.stockQuantity || ''}
                                        onChange={(e) => setEditedProductData({
                                            ...editedProductData,
                                            stockQuantity: e.target.value
                                        })}
                                    />
                                ) : (
                                    item.stockQuantity
                                )}
                            </td>
                            <td>
                                {editableProductId === item.id ? (
                                    <input
                                        type="text"
                                        value={editedProductData.category || ''}
                                        onChange={(e) => setEditedProductData({
                                            ...editedProductData,
                                            category: e.target.value
                                        })}
                                    />
                                ) : (
                                    item.category
                                )}
                            </td>
                            <td className={`stock-option-buttons`}>
                                {editableProductId === item.id ? renderEditFields(item.id) : renderNormalButtons(item.id)}
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockList;