import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Sidebar from './sidebar';

import '../SuperAdmin/addcategory.css';
import '../Vendors/sidebar2.css';
import '../Vendors/UserProfile.css';
import './Vendorview.css';

const ViewVendor = () => {
  const { vendorId } = useParams();
  const [vendorData, setVendorData] = useState({});
  const [error, setError] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [existingLogoImage, setExistingLogoImage] = useState(null);
  const [existingPropertyImages, setExistingPropertyImages] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/getvendorDetails`, { vendorId })
      .then((response) => {
        if (response.data.status === 'ok') {
          setVendorData(response.data.data);
          setExistingLogoImage(response.data.data.logo);
          setExistingPropertyImages(
            Array.isArray(response.data.data.image) ? response.data.data.image : []
          );
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error.message);
      });
  }, [vendorId]);

  const renderField = (label, field) => (
    <div className="row mb-3">
      <label className="col-md-4 fw-bold">{label}</label>
      <div className="col-md-8">{vendorData[field] || '-'}</div>
    </div>
  );

  return (
    <div className="">
      <Sidebar />
      <div className="container-fluid p-4 bg-light" style={{ minHeight: '100vh',textAlign:'left' }}>
        <div className="container shadow-sm p-4 bg-white rounded">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-primary">Vendor Details</h3>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
            <div className="col-lg-6">
              <div className="card mb-4 p-3">
                <h5 className="mb-3 text-secondary">Basic Information</h5>
                {renderField('Company Name:', 'businessName')}
                {renderField('Contact Person:', 'contactPerson')}
                {renderField('Contact Number:', 'contactNumber')}
                {renderField('Address:', 'address')}
                {renderField('Pincode:', 'pincode')}
                {renderField('Since From:', 'sinceFrom')}
                {renderField('Specialist In:', 'specialistIn')}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card mb-4 p-3">
                <h5 className="mb-3 text-secondary">Business Details</h5>
                {renderField('Pesticide Licence:', 'pesticideLicence')}
                {renderField('GST Number:', 'gstNumber')}
                {renderField('Membership:', 'membership')}
                {renderField('Branch Details:', 'branchDetails')}
                {renderField('Technical Qualification:', 'technicalQualification')}
              </div>
            </div>
          </div>

          <div className="card mb-4 p-3">
            <h5 className="mb-3 text-secondary">About Us</h5>
            <p>{vendorData.aboutUs || '-'}</p>
          </div>

          <div className="card mb-4 p-3">
            <h5 className="mb-3 text-secondary">Company Logo</h5>
            {logoImage ? (
              <img src={logoImage.preview} alt="Uploaded Logo" width={120} className="img-thumbnail" />
            ) : existingLogoImage ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${existingLogoImage}`}
                alt="Existing Logo"
                width={120}
                className="img-thumbnail"
                onError={(e) => (e.target.style.display = 'none')}
              />
            ) : (
              <p className="text-muted">No logo available</p>
            )}
          </div>

          <div className="card mb-4 p-3">
            <h5 className="mb-3 text-secondary">Property Images</h5>
            <div className="d-flex flex-wrap gap-3">
              {existingPropertyImages.length > 0 ? (
                existingPropertyImages.map((url, index) => (
                  <img
                    key={index}
                    src={`${process.env.REACT_APP_API_URL}/uploads/${url}`}
                    alt={`Gallery ${index}`}
                    className="img-thumbnail"
                    width={200}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.png';
                    }}
                  />
                ))
              ) : (
                <p className="text-muted">No gallery images found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVendor;
