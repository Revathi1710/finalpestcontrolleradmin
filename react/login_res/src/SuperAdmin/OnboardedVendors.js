import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';

const OnboardedVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/OnboardedVendor`);
        if (response.data.status === 'ok') {
          setVendors(response.data.data);
        } else {
          setMessage(response.data.message);
        }
      } catch (err) {
        setMessage('Error fetching vendors: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const handleView = (id) => {
    window.location.href = `/ViewVendor/${id}`;
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid p-4">
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <h3 className="text-center text-primary mb-4">All Onboarded Vendors</h3>
            {loading ? (
              <p>Loading vendors...</p>
            ) : vendors.length ? (
              <table className="table table-striped table-hover text-center">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Number</th>
                    <th>Pincode</th>
                    <th>Added On</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v, i) => (
                    <tr key={v._id}>
                      <td>{i + 1}</td>
                      <td>{v.contactPerson}</td>
                      <td>{v.businessName}</td>
                      <td>{v.contactNumber}</td>
                      <td>{v.pincode}</td>
                      <td>{new Date(v.createdAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        <span className={`badge ${v.approved === true ? 'bg-success' : v.approved === false ? 'bg-danger' : 'bg-warning text-dark'}`}>
                          {v.approved === true ? 'Approved' : v.approved === false ? 'Rejected' : 'Pending'}
                        </span>
                      </td>
                      <td>
                      {new Date(v.startDate).toLocaleDateString('en-IN')}
                    
                      </td>
                      <td>
                      {new Date(v.expiryDate).toLocaleDateString('en-IN')}
                     
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleView(v._id)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No vendors found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardedVendors;
