import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar'; // Adjust path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const ViewEnquiry = () => {
  const { id } = useParams(); // userId from URL
  const [enquiries, setEnquiries] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/viewEnquiry/${id}`);
      if (response.data.status === 'ok') {
        setEnquiries(response.data.data);
        setMessage('');
      } else {
        setMessage(response.data.message || 'Failed to fetch enquiries');
        setEnquiries([]);
      }
    } catch (err) {
      setMessage('Error fetching data: ' + err.message);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? 'Date not available' : parsedDate.toLocaleString();
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid p-4">
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <h3 className="text-center text-primary mb-4">Viewed Profile Enquiries</h3>

            {loading ? (
              <p className="text-center">Loading enquiries...</p>
            ) : message ? (
              <div className="alert alert-danger text-center">{message}</div>
            ) : enquiries.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped table-hover text-center">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                    
                      <th>Company Name</th>
                      <th>Phone Number</th>
                      <th>Viewed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        
                        <td>{item.vendorDetails?.businessName || 'Unknown Vendor'}</td>
                        <td>{item.vendorDetails?.contactNumber || 'N/A'}</td>
                        <td>{formatDate(item.clickedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center">No enquiry records found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEnquiry;
