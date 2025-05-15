import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Adjust the path according to your directory structure
import axios from 'axios';
import '../Vendors/table.css';
import { Link, useNavigate } from 'react-router-dom';

const Alluser = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000); // Message disappears after 5 seconds
  };
  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/alluser`);
        const data = response.data;

        if (data.status === 'ok') {
          setUsers(data.data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('An error occurred: ' + error.message);
      }
    };

    fetchUsers();
  }, []);
  const handleUpdate = (BuyerId) => {
    navigate(`/UpdateBuyer/${BuyerId}`);

  };
  const handleDelete = (BuyerId) => {
    if (window.confirm("Are you sure you want to delete this Buyer?")) {
      fetch(`${process.env.REACT_APP_API_URL}/deleteBuyerSuperAdmin`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ BuyerId })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          setMessage(users.filter(users => users._id !== BuyerId));
          alert('Category deleted successfully');
        } else {
          showMessage('Error deleting category: ' + data.message);
        }
      })
      .catch(error => {
        showMessage('Error deleting category');
      });
    }
  };

  return (
    <div>
    <Sidebar />
    <div className="add-category-container">
       <div className='title'>
        <h2 className='mb-4'>All Buyer</h2>
        </div>
        {message && <p>{message}</p>}
        {users.length > 0 ? (
             <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>SI.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
              {users.map((user,index) => (
                <tr key={user._id}>
                  <td> {index + 1}</td>
                  <td> {user.fname}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2 editbtn-admin" onClick={() => handleUpdate(user._id)}>
                    <i class='fas fa-edit'></i> Update
                    </button>
                    <button className="btn btn-danger btn-sm deletebtn-admin" onClick={() => handleDelete(user._id)}>
                    <i class='fas fa-trash'></i>  Delete
                    </button>
                  </td>
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Alluser;
