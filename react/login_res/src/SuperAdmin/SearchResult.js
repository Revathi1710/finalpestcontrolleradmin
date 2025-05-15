import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchResult = () => {
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/filter-users`, {
        params: {
          startDate,
          endDate
        }
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
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/filter-users`, {
        params: {
          startDate,
          endDate,
          export: 'excel'
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'FilteredUsers.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Failed to download Excel file: ' + err.message);
    }
  };

  const handleView = (id) => {
    window.location.href = `/ViewEnquiry/${id}`;
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid p-4">
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
                <button className="btn btn-primary me-2" onClick={handleFilter}>Filter</button>
                <button className="btn btn-success" onClick={handleDownloadExcel}>Download Excel</button>
              </div>
            </div>

            {loading ? (
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
                    <th>Email</th>
                    <th>State</th>
                    <th>Pincode</th>
                    <th>Business Type</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v, i) => (
                    <tr key={v._id}>
                      <td>{i + 1}</td>
                      <td>{v.name}</td>
                      <td>{v.number}</td>
                      <td>{v.email}</td>
                      <td>{v.state}</td>
                      <td>{v.pincode}</td>
                      <td>{v.businessType}</td>
                      <td>{new Date(v.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-primary" onClick={() => handleView(v._id)}>View</button>
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
