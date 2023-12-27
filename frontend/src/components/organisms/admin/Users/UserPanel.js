
import React, { useState, useEffect } from 'react';
import api from "../../../../helpers/api";
import './UserPanel.css';

const UserPanel = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users', { withCredentials: true });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (id, newRole) => {
        try {
            const response = await api.put(`/admin/user/${id}`, { role: newRole }, { withCredentials: true });
            alert(`User updated. New role for user "${response.data.username}": ${response.data.role}`);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    return (
        <div className="user-panel-container">
            <h1 className="user-panel-heading">User Management</h1>
            <table className="user-panel-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className="user-panel-select"
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserPanel;
