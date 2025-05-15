import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';// Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const AllVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [onboardVendorId, setOnboardVendorId] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [expiryDays, setExpiryDays] = useState('');
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const navigate = useNavigate(); // Declare navigate for redirection

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allVendor`);
        if (response.data.status === 'ok') {
          setVendors(response.data.data);
        } else {
          setMessage(response.data.message);
        }
      } catch (err) {
        setMessage('Error fetching vendors: ' + err.message);
        toast.error('Error fetching vendors: ' + err.message); // Show error toast
      }
    };
    fetchVendors();
  }, []);

  const handleView = (id) => {
    navigate(`/ViewVendor/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/EditVendor/${id}`); // Adjust the path to your actual AllVendor page
  };

  const handleDelete = (VendorId) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      fetch(`${process.env.REACT_APP_API_URL}/deleteVendor`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ VendorId })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          // Remove the deleted vendor from the state
          setVendors(vendors.filter(vendor => vendor._id !== VendorId));
          setMessage('Vendor deleted successfully');
          toast.success('Vendor deleted successfully'); // Show success toast
        } else {
          console.error('Error:', data.message);
          setMessage('Error deleting vendor: ' + data.message);
          toast.error('Error deleting vendor: ' + data.message); // Show error toast
        }
      })
      .catch(error => {
        console.error('Delete error:', error);
        setMessage('Error deleting vendor');
        toast.error('Error deleting vendor'); // Show error toast
      });
    }
  };

  const handleApproved = async (id, status) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/updateApprovedVendor/${id}`, { approved: status });
      if (res.data.status === 'ok') {
        setVendors(vendors.map(v => (v._id === id ? { ...v, approved: status } : v)));
        toast.success('Vendor status updated successfully'); // Show success toast
      } else {
        alert(res.data.message);
        toast.error(res.data.message); // Show error toast
      }
    } catch (err) {
      alert('Error: ' + err.message);
      toast.error('Error: ' + err.message); // Show error toast
    }
  };

  const toggleRow = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openOnboardModal = (vendorId) => {
    setOnboardVendorId(vendorId);
    setShowModal(true);
  };

  const calculateExpiryDate = (startDate, expiryDays) => {
    const start = new Date(startDate);
    const expiry = new Date(start);
    switch (expiryDays) {
      case '1 month': expiry.setMonth(expiry.getMonth() + 1); break;
      case '3 month': expiry.setMonth(expiry.getMonth() + 3); break;
      case '6 month': expiry.setMonth(expiry.getMonth() + 6); break;
      case '1 Year': expiry.setFullYear(expiry.getFullYear() + 1); break;
      default: break;
    }
    return expiry.toISOString().split('T')[0]; // Format as yyyy-mm-dd
  };
  
  const handleOnboardSubmit = async () => {
    if (!businessType || !expiryDays || !startDate) {
      toast.error('All fields are required'); // Show error toast
      return;
    }
    const expiry = calculateExpiryDate(startDate, expiryDays);
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/onboardVendor`, {
        vendorId: onboardVendorId,
        businessType,
        expiryDays,
        startDate,
        expiryDate: expiry
      });
      if (res.data.status === 'ok') {
        toast.success('Vendor onboarded successfully'); // Show success toast
        setShowModal(false);
        setBusinessType('');
        setExpiryDays('');
        setStartDate('');
        setExpiryDate('');
      } else {
        toast.error(res.data.message); // Show error toast
      }
    } catch (err) {
      toast.error('Error: ' + err.message); // Show error toast
    }
  };
  

  return (
    <>
      <Sidebar />
      
      <div className="container-fluid p-4">
      <ToastContainer />
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <h3 className="text-center text-primary mb-4">All Vendors</h3>
         
            {vendors.length ? (
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
                    <th>Actions</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v, i) => (
                    <tr key={v._id}>
                      <td>
                        <i
                          className={`fas ${expandedRows[v._id] ? 'fa-minus-square' : 'fa-plus-square'} me-2`}
                          style={{ cursor: 'pointer', color: '#0d6efd' }}
                          onClick={() => toggleRow(v._id)}
                        />
                        {i + 1}
                      </td>
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
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleView(v._id)}>View</button>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openOnboardModal(v._id)}>Add Onboard</button>
                        {expandedRows[v._id] && (
                          <>
                            <button className="btn btn-sm btn-success me-2" disabled={v.approved} onClick={() => handleApproved(v._id, true)}>Approve</button>
                            <button className="btn btn-sm btn-danger" disabled={v.approved === false} onClick={() => handleApproved(v._id, false)}>Reject</button>
                          </>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(v._id)}>Edit</button>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(v._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No vendors found.</p>}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Onboard Vendor</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Business Type</label>
                  <div>
                    <label className="me-3">
                      <input type="radio" value="Residential" checked={businessType === 'Residential'} onChange={e => setBusinessType(e.target.value)} /> Residential
                    </label>
                    <label>
                      <input type="radio" value="Commercial" checked={businessType === 'Commercial'} onChange={e => setBusinessType(e.target.value)} /> Commercial
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Expiry Duration</label>
                  <select className="form-control" value={expiryDays} onChange={e => setExpiryDays(e.target.value)}>
                    <option value="">Select</option>
                    <option value="1 month">1 month</option>
                    <option value="3 month">3 month</option>
                    <option value="6 month">6 month</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleOnboardSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllVendor;
