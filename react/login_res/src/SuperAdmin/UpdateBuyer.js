import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar'; 
import './addcategory.css';

const UpdateBuyer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (id) {
      fetchBuyerDetails();
    }
  }, [id]);

  const fetchBuyerDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetBuyer/${id}`);
      if (response.data.status === 'ok') {
        const buyer = response.data.data;
        setFname(buyer.fname);
        setEmail(buyer.email);
        setNumber(buyer.number);
      } else {
        setMessage('Failed to fetch buyer details.');
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert('Invalid Buyer ID');
      return;
    }

    const buyerData = {
      _id: id,
      fname,
      email,
      number,
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateBuyer`, buyerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'ok') {
        alert('Buyer updated successfully!');
        navigate('/SuperAdmin/AllUser'); // Redirect to buyers list
      } else {
        alert(response.data.message || 'Buyer update failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        alert(`Update failed: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        alert('No response received from server.');
      } else {
        alert('An error occurred: ' + error.message);
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="add-category-container">
        <div className="add-category-content">
          <h1 className="page-title">Update Buyer</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="category-form">
              <div className='form-row row'>
                <div className='form-group mb-4'>
                  <label htmlFor="fname">Name</label>
                  <input
                    type='text'
                    id='fname'
                    placeholder='Enter Name'
                    className='form-control'
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>

                <div className='form-group mb-4'>
                  <label htmlFor="email">Email</label>
                  <input
                    type='email'
                    id='email'
                    placeholder='Enter Email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group mb-4'>
                  <label htmlFor="number">Mobile Number</label>
                  <input
                    type='tel'
                    id='number'
                    placeholder='Enter Mobile Number'
                    className='form-control'
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">Update Buyer</button>
            </form>
          )}

          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default UpdateBuyer;
