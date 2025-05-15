import React, { useState, useEffect } from 'react'; 
import Sidebar from './sidebar'; 
import axios from 'axios';
import '../Vendors/table.css';
import { Link, useNavigate } from 'react-router-dom';
const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000); // Message disappears after 5 seconds
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getMaincategories`);
        const data = response.data;

        if (data.status === 'ok') {
          setCategories(data.data);
        } else {
          showMessage(data.message);
        }
      } catch (error) {
        showMessage('An error occurred: ' + error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      fetch(`${process.env.REACT_APP_API_URL}/deleteCategorySuperAdmin`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          setCategories(categories.filter(category => category._id !== categoryId));
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

  const handleUpdateActive = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateStatusCategory/${id}`, { active: updatedStatus });
      const data = response.data;

      if (data.status === 'ok') {
        setCategories(categories.map(category => 
          category._id === id ? { ...category, active: updatedStatus } : category
        ));
        showMessage('Category status updated successfully.');
      } else {
        showMessage(data.message);
      }
    } catch (error) {
      showMessage('An error occurred: ' + error.message);
    }
  };

  const handleUpdate = (categoryId) => {
    
      navigate(`/SuperAdmin/UpdateCategory/${categoryId}`);
    };


  return (
    <div>
      <Sidebar />
      <div className="add-category-container">
        <div className='title'>
        <h2 className='mb-4'>All Categories</h2>
        </div>
        
          {/* Message Box with Transition & Close Button */}
          {message && (
            <div className='message-container'>
          <div className='message-content' >
            <p style={{ margin: 0 }}>{message}</p>
            <button 
              onClick={() => setMessage('')} 
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✖
            </button>
          </div> </div>
        )}
        {categories.length > 0 ? (
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>SI.No</th>
                <th>Create at</th>
                <th>Image</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td> {/* Serial Number */}
                  <td>{new Date(category.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                  <td>
                    <img 
                       src={`${process.env.REACT_APP_API_URL}/${category.image.replace('\\', '/')}`}
                      alt={category.name} 
                      style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "5px" }} 
                    />
                  </td>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input"  
                        type="checkbox" 
                        id={`statusSwitch${category._id}`} 
                        checked={category.active} 
                        onChange={() => handleUpdateActive(category._id, category.active)}
                      />
                     
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2 editbtn-admin" onClick={() => handleUpdate(category._id)}>
                    <i class='fas fa-edit'></i> Update
                    </button>
                    <button className="btn btn-danger btn-sm deletebtn-admin" onClick={() => handleDelete(category._id)}>
                    <i class='fas fa-trash'></i>  Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
};

export default AllCategory;

