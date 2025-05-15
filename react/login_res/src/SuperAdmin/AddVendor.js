import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddVendor = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    pincode: '',
    sinceFrom: '',
    specialistIn: '',
    contactPerson: '',
    contactNumber: '',
    email: '',
    pesticideLicence: '',
    gstNumber: '',
    membership: '',
    branchDetails: '',
    technicalQualification: '',
    password: '',
    logo: '',
    image: [''],
    aboutUs: '',
    website: '',
    location: '',
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    return newErrors;
  };


   const getCoordinatesFromPincode = async (pincode) => {
    const apiKey = 'AIzaSyCGhSnndOY38FfCgNfSldjpZQX6cT_KpC8';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      if (
        response.data.results &&
        response.data.results.length > 0
      ) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error('Unable to geocode the provided pincode');
      }
    } catch (error) {
      console.error('Geocoding Error:', error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      if (name === 'logo') {
        const file = files[0];
        setFormData({ ...formData, logo: file });
        setLogoPreview(URL.createObjectURL(file));
      } else if (name.startsWith('image')) {
        const file = files[0];
        const index = parseInt(name.split('-')[1]);
        const newImages = [...formData.image];
        const newPreviews = [...imagePreviews];
        newImages[index] = file;
        newPreviews[index] = URL.createObjectURL(file);
        setFormData({ ...formData, image: newImages });
        setImagePreviews(newPreviews);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, image: [...formData.image, null] });
    setImagePreviews([...imagePreviews, null]);
  };

  const removeImageField = (index) => {
    const updatedImages = [...formData.image];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFormData({ ...formData, image: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Trim all string fields
      const cleanedData = {};
      Object.keys(formData).forEach((key) => {
        cleanedData[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
      });

      // Get coordinates
      const { lat, lng } = await getCoordinatesFromPincode(cleanedData.pincode);
      if (!lat || !lng) {
        toast.error('Invalid coordinates from pincode');
        return;
      }

      const form = new FormData();
      for (const key in cleanedData) {
        if (key === 'image') {
          cleanedData.image.forEach((img) => {
            if (img) form.append('image', img);
          });
        } else {
          form.append(key, cleanedData[key]);
        }
      }

      // Append coordinates
      form.append('latitude', lat);
      form.append('longitude', lng);

      await axios.post(`${process.env.REACT_APP_API_URL}/addVendor`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Vendor added successfully!');
      setTimeout(() => navigate('/allVendor'), 1500);
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to add vendor');
    }
  };



  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div className="px-3 mt-4">
      <h3 className="mb-4 ">Add Vendor</h3>
        <div className="card p-4 shadow rounded-4">
      
          <form onSubmit={handleSubmit}>
  <div className="row">
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Business Name</label>
      <input type="text" className="form-control" name="businessName" value={formData.businessName} onChange={handleChange} required />
    </div>
   
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Pincode</label>
      <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} required />
      {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Since From</label>
      <input type="text" className="form-control" name="sinceFrom" value={formData.sinceFrom} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Specialist In</label>
      <input type="text" className="form-control" name="specialistIn" value={formData.specialistIn} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Contact Person</label>
      <input type="text" className="form-control" name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Contact Number</label>
      <input type="text" className="form-control" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
      {errors.contactNumber && <small className="text-danger">{errors.contactNumber}</small>}
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Email</label>
      <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Pesticide Licence</label>
      <input type="text" className="form-control" name="pesticideLicence" value={formData.pesticideLicence} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">GST Number</label>
      <input type="text" className="form-control" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Membership</label>
      <input type="text" className="form-control" name="membership" value={formData.membership} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Branch Details</label>
      <input type="text" className="form-control" name="branchDetails" value={formData.branchDetails} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Technical Qualification</label>
      <input type="text" className="form-control" name="technicalQualification" value={formData.technicalQualification} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Password</label>
      <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Website</label>
      <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
      <label className="form-label">Address</label>
      <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-3">
      <label className="form-label">About Us</label>
      <textarea className="form-control" name="aboutUs" value={formData.aboutUs} onChange={handleChange} />
    </div>
    <div className="form-group col-sm-3 mb-2">
                <label className="form-label">Logo</label>
                <input type="file" name="logo" className="form-control" onChange={handleChange} />
                {logoPreview && (
                  <div className="mt-2">
                    <img src={logoPreview} alt="Logo Preview" width="100" />
                  </div>
                )}
              </div>

              <div className="d-flex align-items-center form-group col-sm-6 mb-2">
                <div>
                <label className="form-label">Images</label>
                {formData.image.map((img, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="file"
                      name={`image-${index}`}
                      className="form-control"
                      onChange={handleChange}
                    />
                    {imagePreviews[index] && (
                      <div className="d-flex align-items-center mt-1">
                        <img src={imagePreviews[index]} alt={`Preview ${index}`} width="100" />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => removeImageField(index)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}</div>
                <div className='me-3'>
                <button type="button" className="btn btn-secondary btn-sm mt-2" onClick={addImageField}>
                  Add More Images
                </button>
                </div>
              
              </div>
            </div>
 
  {/* Submit */}
  <button type="submit" className="btn btn-primary ">
    Add Vendor
  </button>
</form>

        </div>
      </div>
    </>
  );
}

export default AddVendor;
