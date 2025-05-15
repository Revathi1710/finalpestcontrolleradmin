import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Ensure the correct path
import './addcategory.css'; // Check path
import '../Vendors/table.css'; // Check path
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/getProduct`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          setProducts(data.data);
        } else {
          console.error('Error:', data.message);
          setMessage('Error fetching products: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setMessage('Error fetching products');
      });
  }, []);

  const handleUpdateActive = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the current status
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateStatusProduct/${id}`, { active: updatedStatus });
      const data = response.data;

      if (data.status === 'ok') {
        setProducts(products.map(product => 
          product._id === id ? { ...product, active: updatedStatus } : product
        ));
        setMessage('Product status updated successfully.');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };
  const handleApproved = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateApprovedproduct/${id}`,
        { approved: newStatus }
      );

      const data = response.data;
      if (data.status === 'ok') {
        setProducts(products.map(product =>
          product._id === id ? { ...product, approved: newStatus } : product

        ));
      } else {
        setMessage('Product Updated successfully.');
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  }
  const handleUpdateFeature = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the current feature status
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateFeatureProduct/${id}`, { feature: updatedStatus });
      const data = response.data;

      if (data.status === 'ok') {
        setProducts(products.map(product => 
          product._id === id ? { ...product, feature: updatedStatus } : product
        ));
        setMessage('Product feature updated successfully.');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/SuperAdmin/UpdateProduct/${productId}`);
   
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`${process.env.REACT_APP_API_URL}/deleteProductVendor`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'ok') {
            setProducts(products.filter((product) => product._id !== productId));
            setMessage('Product deleted successfully');
          } else {
            console.error('Error:', data.message);
            setMessage('Error deleting product: ' + data.message);
          }
        })
        .catch((error) => {
          console.error('Delete error:', error);
          setMessage('Error deleting product');
        });
    }
  };

  const toggleRow = (vendorId) => {
    setExpandedRows(prev => ({
      ...prev,
      [vendorId]: !prev[vendorId]
    }));
  };
  return (
    <div>
    <Sidebar />
    <div className="add-category-container">
        <div className="title">
          <h2 className='mb-4'>All Products</h2>
        </div>
        {message && <p>{message}</p>}
        {products.length > 0 ? (
        <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
              <th>SI.No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Feature</th>
                <th>Approved </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                   <td>
                    <i 
                      className={expandedRows[product._id] ? 'far fa-minus-square' : 'far fa-plus-square'}
                      style={{ cursor: "pointer", marginRight: "8px" }}
                      onClick={() => toggleRow(product._id)}
                    ></i>
                    {index + 1}
                  </td>
                  <td>
                    {product.image ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`}
                        alt={product.name}
                        style={{ width: '50px', height: '50px' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{product.slug}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={`statusSwitch${product._id}`} 
                        checked={!!product.active} 
                        onChange={() => handleUpdateActive(product._id, product.active)}
                      />
                      <label className="form-check-label" htmlFor={`statusSwitch${product._id}`}>
                     
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={`featureSwitch${product._id}`} 
                        checked={!!product.feature} 
                        onChange={() => handleUpdateFeature(product._id, product.feature)}
                      />
                      <label className="form-check-label" htmlFor={`featureSwitch${product._id}`}>
                       
                      </label>
                    </div>
                  </td>
                  <td> <span className={`badge ${product.approved ? 'bg-success' : 'bg-danger'}`}>
                      {product.approved ? 'Approved' : 'Reject'}
                    </span></td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2 editbtn-admin"
                      onClick={() => handleUpdate(product._id)}
                    >
                    <i class='fas fa-edit'></i>  Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm deletebtn-admin"
                      onClick={() => handleDelete(product._id)}
                    >
                    <i class='fas fa-trash'></i>  Delete
                    </button>
                    {expandedRows[product._id] && (
                      <div className='d-flex mt-3'>
                        <button
                          className={`btn ${product.approved ? 'btn-success' : 'btn-secondary'} me-2`}
                          onClick={() => handleApproved(product._id, true)}
                          disabled={product.approved === true}
                        >
                          Approved
                        </button>
                        <button
                          className={`btn ${product.approved === false ? 'btn-danger' : 'btn-secondary'}`}
                          onClick={() => handleApproved(product._id, false)}
                          disabled={product.approved === false}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Products found</p>
        )}
      </div>
    </div>
  );
};

export default Allproducts;
