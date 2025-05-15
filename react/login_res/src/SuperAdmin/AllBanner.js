import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Ensure the correct path
import './addcategory.css';
import '../Vendors/table.css';
import { Link, useNavigate  } from 'react-router-dom';
const AllSlider = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/getBannerImages`, { // Updated the endpoint to /getBannerImages
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'ok') {
        setProducts(data.data);
      } else {
        console.error('Error:', data.message);
        setMessage('Error fetching Slider: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setMessage('Error fetching Slider');
    });
  }, []);
   // Add dependency array to ensure this only runs once on mount

  const handleUpdate = (productId) => {
    navigate(`/SuperAdmin/UpdateBanner/${productId}`);

  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`${process.env.REACT_APP_API_URL}/deleteSlider`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          setProducts(products.filter(product => product._id !== productId));
          setMessage('Product deleted successfully');
        } else {
          console.error('Error:', data.message);
          setMessage('Error deleting product: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Delete error:', error);
        setMessage('Error deleting product');
      });
    }
  };

  return (
    <div>
    <Sidebar />
    <div className="add-category-container">
        <div className="title"><h2 className='mb-4'>All Banner </h2></div>
        {message && <p>{message}</p>}
        {products.length > 0 ? (
         <table className="table table-bordered text-center">
                     <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
               <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
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
                  <td>{product.name}</td>
                  <td>
                  {product.URL}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2 editbtn-admin"
                      onClick={() => handleUpdate(product._id)}
                    >
                      <i class='fas fa-edit'></i>   Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm deletebtn-admin"
                      onClick={() => handleDelete(product._id)}
                    >
                      <i class='fas fa-trash'></i>   Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Slider found</p>
        )}
      </div>
    </div>
  );
};

export default AllSlider;
