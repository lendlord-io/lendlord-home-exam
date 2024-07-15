import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TableOfUsers.css';

const UsersTable = ({ toggleModal }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    console.log(`Attempting to delete user with id: ${id}`);
    try {
      const response = await axios.delete(`http://localhost:3000/user/${id}`);
      console.log('Delete response:', response); 
      setUsers(users.filter(user => user._id !== id));
      console.log(`User with id: ${id} deleted successfully`); 
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);  
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date Started</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{new Date(user.dateStarted).toLocaleDateString()}</td>
              <td>{user.role}</td>
              <td>{user.salary}</td>
              <td>{user.manager ? user.manager.firstName + ' ' + user.manager.lastName : 'N/A'}</td>
              <td>
                <button onClick={() => toggleModal(user)}>Edit</button>
                <button onClick={(e) => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
