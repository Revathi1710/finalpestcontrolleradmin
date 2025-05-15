import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import './table.css';

function EditVendor() {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    pincode: "",
    sinceFrom: "",
    specialistIn: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
    pesticideLicence: "",
    gstNumber: "",
    membership: "",
    branchDetails: "",
    technicalQualification: "",
    password: "",
    website: "",
    aboutUs: "",
  });

  const [logoImage, setLogoImage] = useState(null);
  const [existingLogoImage, setExistingLogoImage] = useState("");
  const [propertyImages, setPropertyImages] = useState([]);
  const [existingPropertyImages, setExistingPropertyImages] = useState([]);

  // Fetch existing vendor data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getVendor/${vendorId}`)
      .then((res) => {
        const data = res.data.vendor;
        setFormData({
          businessName: data.businessName || "",
          address: data.address || "",
          pincode: data.pincode || "",
          sinceFrom: data.sinceFrom || "",
          specialistIn: data.specialistIn || "",
          contactPerson: data.contactPerson || "",
          contactNumber: data.contactNumber || "",
          email: data.email || "",
          pesticideLicence: data.pesticideLicence || "",
          gstNumber: data.gstNumber || "",
          membership: data.membership || "",
          branchDetails: data.branchDetails || "",
          technicalQualification: data.technicalQualification || "",
          password: "",
          website: data.website || "",
          aboutUs: data.aboutUs || "",
        });
        setExistingLogoImage(data.logo || "");
        setExistingPropertyImages(data.image || []);
      })
      .catch((err) => {
        console.error("Error fetching vendor", err);
        alert("Failed to load vendor data");
      });
  }, [vendorId]);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Logo image handler
  const handleLogoImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImage({ file, preview: URL.createObjectURL(file) });
      setExistingLogoImage("");
    }
  };

  // Property images handler
  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPropertyImages((prev) => [...prev, ...newImages]);
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingPropertyImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setPropertyImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Get coordinates from pincode
  const getCoordinatesFromPincode = async (pincode) => {
    const apiKey = "0c4835f9b7b34a1b895d8a15e8e9691c"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.results && response.data.results.length > 0) {
        const location = response.data.results[0];
        const { lat, lng } = location.geometry;
        return { lat, lng };
      } else {
        throw new Error("Unable to geocode the provided pincode");
      }
    } catch (error) {
      console.error("Geocoding Error:", error);
      throw error;
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedForm = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedForm.append(key, value);
    });

    if (logoImage) {
      updatedForm.append("logoImage", logoImage.file);
    }

    propertyImages.forEach((img) => {
      updatedForm.append("propertyImages", img.file);
    });

    try {
      const { lat, lng } = await getCoordinatesFromPincode(formData.pincode);
      if (!lat || !lng) {
        alert("Invalid coordinates from pincode");
        return;
      }

      updatedForm.append("latitude", lat);
      updatedForm.append("longitude", lng);

      await axios.put(
        `${process.env.REACT_APP_API_URL}/editVendor/${vendorId}`,
        updatedForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  toast.success('Vendor updated successfully!');
      setTimeout(() => navigate('/allVendor'), 1500);
    
    } catch (error) {
      console.error("Error updating vendor", error);
      toast.error('Failed to update vendor');

    }
  };


  return (
    <>
      <Sidebar />
        <ToastContainer />
      <div className="container-fluid p-4">
      <h3 className="text-center  mb-4">Edit Vendor</h3>
        <div className="card shadow-sm rounded">
          <div className="card-body">
          

            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='row'>
              {Object.keys(formData).map((key) => (
                <div className="col-sm-3 mb-3" key={key}>
                  <label className="form-label text-capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  {key === "address" ? (
                    <textarea
                      className="form-control"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      rows={5}
                    ></textarea>
                  ) 
                   : key === "aboutUs" ? (
                    <textarea
                      className="form-control"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      rows={5}
                    ></textarea>
                  ) 
                  
                  
                  : key === "password" ? (
                    <input
                      type="password"
                      className="form-control"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder="New Password"
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
          <div className="col-sm-3 mb-3">
              <label>Upload Logo</label>
              <div className="upload-logo mb-3" style={{ width: '150px' }}>
                <label className="upload-box" style={{ width: '150px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoImageChange}
                    hidden
                  />
                  <div className="upload-content text-center">
                    <span className="display-5">+</span>
                    <p>Upload Logo</p>
                  </div>
                </label>

                {logoImage ? (
                  <div className="image-thumbnail">
                    <img src={logoImage.preview} alt="Uploaded Logo" width={100} />
                    <button
                      type="button"
                      className="remove-btn btn-close"
                      onClick={() => setLogoImage(null)}
                    ></button>
                  </div>
                ) : existingLogoImage && (
                  <div className="image-thumbnail">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/${existingLogoImage}`}
                      alt="Existing Logo" width={100}
                    />
                  </div>
                )}
              </div>
              </div>
              <div className="col-sm-3 mb-3">
              <label>Upload Property Photos</label>
              <div className="gallery-grid mt-3 d-flex flex-wrap gap-3">
                <label className="upload-box" style={{ width: '150px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImageChange}
                    hidden
                  />
                  <div className="upload-content text-center">
                    <span className="display-5">+</span>
                    <p>Upload Photos</p>
                  </div>
                </label>
                <div className='d-flex'>
                {existingPropertyImages.map((img, index) => (
                  <div className="image-thumbnail" key={`existing-${index}`}>
                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${img}`} width={200} alt={`existing-${index}`} />
                    <button
                      type="button"
                      className="remove-btn btn-close"
                      onClick={() => handleRemoveGalleryImage(index, true)}
                    ></button>
                  </div>
                ))}

                {propertyImages.map((img, index) => (
                  <div className="image-thumbnail" key={`new-${index}`}>
                    <img src={img.preview} alt={`new-${index}`} width={200} />
                    <button
                      type="button"
                      className="remove-btn btn-close"
                      onClick={() => handleRemoveGalleryImage(index)}
                    ></button>
                  </div>
                ))}
              </div>  </div></div>
                <div className=''>
                <button type="submit" className="btn btn-primary mt-4">Update Vendor</button>
                </div>
            
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVendor;
