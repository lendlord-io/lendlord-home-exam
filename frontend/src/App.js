import React, { useState } from 'react'
import TableOfUsers from './components/TableOfUsers'
import './App.css';
import GenericModal from './components/modal';
import Header from './components/header';

function App() {

  const [shown, setShown] = useState(false)
  const [selectedUser,setSelectedUser]=useState(null)

  const toggleModal = (user=null) => {setSelectedUser(user); setShown(prev => !prev); }

  return (
    <div className="App">
      <Header />
      <div id="content">
      <button onClick={()=>toggleModal()}>Add User</button>
      <TableOfUsers toggleModal={toggleModal} />
        <GenericModal displayModal={shown} closeModal={toggleModal}  selectedUser={selectedUser}>
        <h1>{selectedUser ? 'Edit User' : 'Add New User'}</h1>
        </GenericModal>
      </div>
    </div>
  );
}

export default App;
