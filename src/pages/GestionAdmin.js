import React, { useState, useEffect } from 'react';
import TableCRUD from '../components/TableCRUD';
import userService from '../services/userService.js';

const GestionAdmin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the service
        const fetchUsers = async () => {
            const data = await userService.getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        // Trigger add user logic here
    };

    const handleEditUser = (user) => {
        // Trigger edit user logic here
    };

    const handleDeleteUser = (id) => {
        // Trigger delete user logic here
    };

    const handleDeleteSelectedUsers = (selectedIds) => {
        // Trigger delete selected users logic here
    };

    return (
        <TableCRUD
            data={users}
            firstColumnName="Numero de sum"
            onAdd={handleAddUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onDeleteSelected={handleDeleteSelectedUsers}
        />
    );
};

export default GestionAdmin;
