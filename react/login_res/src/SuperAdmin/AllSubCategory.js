
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Adjust the path according to your directory structure
import axios from 'axios';
import '../Vendors/table.css';
import { Link, useNavigate } from 'react-router-dom';
const AllSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000); // Message disappears after 5 seconds
  };
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getSubCategory`);
        const data = response.data;

        if (data.status === 'ok') {
          setCategories(data.data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('An error occurred: ' + error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deletecategory/${id}`);
      const data = response.data;

      if (data.status === 'ok') {
        setCategories(categories.filter(category => category._id !== id));
        setMessage('Category deleted successfully.');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };
  const handleUpdateActive = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateStatusSubcategory/${id}`, { active: updatedStatus });
      const data = response.data;

      if (data.status === 'ok') {
        setCategories(categories.map(category => 
          category._id === id ? { ...category, active: updatedStatus } : category
        ));
        showMessage('Subcategory status updated successfully.');
      } else {
        showMessage(data.message);
      }
    } catch (error) {
      showMessage('An error occurred: ' + error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/UpdatesubCategory/${id}`);
  };
  

  return (
    <div>
    <Sidebar />
    <div className="add-category-container">
       <div className='title'>
       <h2 className='mb-4'>All Subcategories</h2>
       </div>
      
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
              
                <th>Image</th>
                <th>Name</th>
               
                
               
                <th>Status</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                   <td>{index + 1}</td> 
                
                     <td>
                    {category.image ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${category.image.replace('\\', '/')}`}
                        alt={category.name}
                        style={{ width: '50px', height: '50px' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                 
                  <td>{category.name}</td>
                 
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
                    <button
                      className="btn btn-primary btn-sm me-2 editbtn-admin"
                      onClick={() => handleUpdate(category._id)}
                    >
                     <i class='fas fa-edit'></i>   Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm deletebtn-admin"
                      onClick={() => handleDelete(category._id)}
                    >
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

export default AllSubCategory;
