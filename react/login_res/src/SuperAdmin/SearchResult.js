import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchResult = () => {
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loadingId, setLoadingId] = useState(null); // Track which vendor is being deleted

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/filter-users`);
      if (response.data.status === 'ok') {
        setVendors(response.data.data);
        setMessage('');
      } else {
        setMessage(response.data.message);
        setVendors([]);
      }
    } catch (err) {
      setMessage('Error fetching users: ' + err.message);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/filter-users`, {
        params: { startDate, endDate }
      });
      if (response.data.status === 'ok') {
        setVendors(response.data.data);
        setMessage('');
      } else {
        setMessage(response.data.message);
        setVendors([]);
      }
    } catch (err) {
      setMessage('Error fetching users: ' + err.message);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date");
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/filter-users`, {
        params: { startDate, endDate, export: 'excel' },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'FilteredUsers.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      toast.error('Failed to download Excel file: ' + err.message);
    }
  };

  const handleView = (id) => {
    window.location.href = `/ViewEnquiry/${id}`;
  };

  const handleDelete = async (VendorId) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;

    setLoadingId(VendorId);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/deleteUser`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ VendorId })
      });
      const data = await response.json();
      if (data.status === 'ok') {
        setVendors(prev => prev.filter(vendor => vendor._id !== VendorId));
        toast.success('Vendor deleted successfully');
      } else {
        toast.error('Error deleting vendor: ' + data.message);
      }
    } catch (error) {
      toast.error('Error deleting vendor: ' + error.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid p-4">
        <ToastContainer />
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <h3 className="text-center text-primary mb-4">Searched Result</h3>

            <div className="row mb-4">
              <div className="col-md-3">
                <label>Start Date:</label>
                <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className="col-md-3">
                <label>End Date:</label>
                <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button className="btn btn-primary me-2" onClick={handleFilter} disabled={loading}>
                  {loading ? 'Filtering...' : 'Filter'}
                </button>
                <button className="btn btn-success" onClick={handleDownloadExcel} disabled={loading}>
                  {loading ? 'Downloading...' : 'Download Excel'}
                </button>
              </div>
            </div>

            {loading && !vendors.length ? (
              <p>Loading users...</p>
            ) : message ? (
              <div className="alert alert-danger">{message}</div>
            ) : vendors.length ? (
              <table className="table table-striped table-hover text-center">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Number</th>
                 
                    <th>Pincode</th>
                    <th>Business Type</th>
                    <th>Created At</th>
                    <th>Actions</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v, i) => (
                    <tr key={v._id}>
                      <td>{i + 1}</td>
                      <td>{v.name}</td>
                      <td>{v.number}</td>
                      
                      <td>{v.pincode}</td>
                      <td>{v.businessType}</td>
                      <td>{new Date(v.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-primary" onClick={() => handleView(v._id)}>View</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(v._id)}
                          disabled={loadingId === v._id}
                        >
                          {loadingId === v._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
