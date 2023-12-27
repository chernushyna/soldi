import React, { useState, useEffect } from 'react';
import api from "../../../../helpers/api";
import './OrderPanel.css';
import {formatPrice} from "../../../../helpers/helper";

const OrderPanel = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/admin/orders', { withCredentials: true });
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await api.put(`/admin/order/${id}`, { status: newStatus }, { withCredentials: true });
            alert(`Status updated. New status for order "${response.data.address}": ${response.data.status}`);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="order-panel-container">
            <h1 className="order-panel-heading">Order Management</h1>
            <table className="order-panel-table">
                <thead>
                <tr>
                    <th>Created At</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.createdAt.slice(0,10)}</td>
                        <td>{order.firstName}</td>
                        <td>{order.lastName}</td>
                        <td>{order.address}</td>
                        <td>{order.phone}</td>
                        <td>{order.email}</td>
                        <td>{formatPrice(order.total)}</td>
                        <td>
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className="order-panel-select"
                            >
                                <option value="SUBMITTED">Submitted</option>
                                <option value="PROCCESSING">Processing</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default OrderPanel;
