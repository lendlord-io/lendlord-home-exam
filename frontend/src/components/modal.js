import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './modal.css';

function Modal({ closeModal, displayModal, id, children, selectedUser }) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateStarted: '',
    role: '',
    salary: '',
    manager: ''
  });

  useEffect(() => {
    if (selectedUser) {
      setUser({
        ...selectedUser,
        dateStarted: selectedUser.dateStarted ? new Date(selectedUser.dateStarted).toISOString().split('T')[0] : ''
      });
    } else {
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        dateStarted: '',
        role: '',
        salary: '',
        manager: ''
      });
    }

  }, [selectedUser]);

  const handleKeyUp = useCallback(
    e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  const clickedOutside = () => {
    closeModal();
  };


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToSend = { ...user };
  
      if (userToSend.manager && !isValidObjectId(userToSend.manager)) {
        alert("Manager ID is not valid!");
        return;
      }
  
      if (!userToSend.manager) {
        userToSend.manager = null; 
      }
  
      if (selectedUser) {
        await axios.put(`http://localhost:3000/user/email/${user.email}`, userToSend); 
      } else {
        await axios.post('http://localhost:3000/user', userToSend);
      }
      closeModal();
    } catch (err) {
      console.error('Failed to save user', err);
    }
  };
  

  const divStyle = {
    display: displayModal ? 'block' : 'none'
  };

  return (
    <div className="basic-modal" id={id} onClick={clickedOutside} style={divStyle}>
      <div
        className={'basic-modal-content'}
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
        {children}
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name" required />
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name" required />
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
          <input type="date" name="dateStarted" value={user.dateStarted} onChange={handleChange} placeholder="Date Started" required />
          <input type="text" name="role" value={user.role} onChange={handleChange} placeholder="Role" required />
          <input type="number" name="salary" value={user.salary} onChange={handleChange} placeholder="Salary" required />
          <input type="text" name="manager" value={user.manager} onChange={handleChange} placeholder="Manager ID" />
          <button type="submit">{selectedUser ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
