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

  const specialistOptions = [
    "Termite Control",
    "Preconstruction Anti-Termite Treatment",
    "General Pest Control",
    "Cockroach Gel Treatment",
    "Cockroach Control",
    "Mosquito Control",
    "Ants Control",
    "Wood Borer Treatment",
    "Rat Control",
    "Bird Control",
    "Spider Control",
    "Lizard Control",
    "Dog Ticks Control Treatment",
    "Bed Bug Treatment"
  ];

  const [formData, setFormData] = useState({
    businessName: "",
    pincode: "",
     contactPerson: "",
    contactNumber: "",
      sinceFrom: "",
    email: "",
    pesticideLicence: "",
    gstNumber: "",
    membership: "",
    branchDetails: "",
    technicalQualification: "",
    password: "",
    website: "",
    address: "",
    aboutUs: "",
  
   
    specialistIn: []
  });

  const [logoImage, setLogoImage] = useState(null);
  const [existingLogoImage, setExistingLogoImage] = useState("");
  const [propertyImages, setPropertyImages] = useState([]);
  const [existingPropertyImages, setExistingPropertyImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/getVendor/${vendorId}`)
      .then((res) => {
        const data = res.data.vendor;
        setFormData({
          businessName: data.businessName || "",
          pincode: data.pincode || "",
          contactNumber: data.contactNumber || "",
          email: data.email || "",
          pesticideLicence: data.pesticideLicence || "",
          gstNumber: data.gstNumber || "",
          membership: data.membership || "",
          branchDetails: data.branchDetails || "",
          technicalQualification: data.technicalQualification || "",
          password: "",
          website: data.website || "",
          address: data.address || "",
          aboutUs: data.aboutUs || "",
          sinceFrom: data.sinceFrom || "",
          contactPerson: data.contactPerson || "",
          specialistIn: data.specialistIn || []
        });
        setExistingLogoImage(data.logo || "");
        setExistingPropertyImages(data.image || []);
      })
      .catch((err) => {
        console.error("Error fetching vendor", err);
        alert("Failed to load vendor data");
      });
  }, [vendorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImage({ file, preview: URL.createObjectURL(file) });
      setExistingLogoImage("");
    }
  };

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setPropertyImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveGalleryImage = (index, isExisting = false) => {
    if (isExisting) {
      setRemovedImages((prev) => [...prev, existingPropertyImages[index]]);
      setExistingPropertyImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setPropertyImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const getCoordinatesFromPincode = async (pincode) => {
    const apiKey = 'AIzaSyCGhSnndOY38FfCgNfSldjpZQX6cT_KpC8';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.results && response.data.results.length > 0) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForm = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "specialistIn") {
        updatedForm.append("specialistIn", JSON.stringify(value));
      } else if (key === "password" && !value) {
        return;
      } else {
        updatedForm.append(key, value);
      }
    });

    if (logoImage) {
      updatedForm.append("logoImage", logoImage.file);
    }
    propertyImages.forEach((img) => {
      updatedForm.append("propertyImages", img.file);
    });
    if (removedImages.length > 0) {
      updatedForm.append("removedImages", JSON.stringify(removedImages));
    }

    const coordinates = await getCoordinatesFromPincode(formData.pincode);
    if (!coordinates) {
      alert("Invalid coordinates from pincode");
      return;
    }
    updatedForm.append("latitude", coordinates.lat);
    updatedForm.append("longitude", coordinates.lng);

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/editVendor/${vendorId}`, updatedForm, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Vendor updated successfully!");
      setTimeout(() => navigate("/allVendor"), 1500);
    } catch (error) {
      console.error("Error updating vendor", error);
      toast.error("Failed to update vendor");
    }
  };

  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div className="container-fluid p-4">
        <h3 className="text-center mb-4">Edit Vendor</h3>
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row">
                {Object.entries(formData).map(([key, value]) => (
                  key !== "specialistIn" && (
                    <div className="col-sm-3 mb-3" key={key}>
                      <label className="form-label text-capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                      {key === "address" || key === "aboutUs" ? (
                        <textarea
                          className="form-control"
                          name={key}
                          value={value}
                          onChange={handleChange}
                          rows={5}
                        ></textarea>
                      ) : key === "password" ? (
                        <input
                          type="password"
                          className="form-control"
                          name={key}
                          value={value}
                          onChange={handleChange}
                          placeholder="New Password"
                        />
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          name={key}
                          value={value}
                          onChange={handleChange}
                        />
                      )}
                    </div>
                  )
                ))}
              </div>

              <div className="row">
                <label className="form-label">Specialist In</label>
                {specialistOptions.map((option, idx) => (
                  <div className="col-md-4" key={idx}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`specialist-${idx}`}
                        checked={formData.specialistIn.includes(option)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...formData.specialistIn, option]
                            : formData.specialistIn.filter((item) => item !== option);
                          setFormData((prev) => ({
                            ...prev,
                            specialistIn: updated
                          }));
                        }}
                      />
                      <label className="form-check-label" htmlFor={`specialist-${idx}`}>
                        {option}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-sm-3 mb-3">
                <label>Upload Logo</label>
                <div className="upload-logo mb-3" style={{ width: '150px' }}>
                  <label className="upload-box" style={{ width: '150px' }}>
                    <input type="file" accept="image/*" onChange={handleLogoImageChange} hidden />
                    <div className="upload-content text-center">
                      <span className="display-5">+</span>
                      <p>Upload Logo</p>
                    </div>
                  </label>
                  {logoImage ? (
                    <div className="image-thumbnail">
                      <img src={logoImage.preview} alt="Uploaded Logo" width={100} />
                      <button type="button" className="remove-btn btn-close" onClick={() => setLogoImage(null)}></button>
                    </div>
                  ) : existingLogoImage && (
                    <div className="image-thumbnail">
                      <img src={`${process.env.REACT_APP_API_URL}/uploads/${existingLogoImage}`} alt="Existing Logo" width={100} />
                    </div>
                  )}
                </div>
              </div>

              <div className="col-sm-3 mb-3">
                <label>Upload Property Photos</label>
                <div className="gallery-grid mt-3 d-flex flex-wrap gap-3">
                  <label className="upload-box" style={{ width: '150px' }}>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryImageChange} hidden />
                    <div className="upload-content text-center">
                      <span className="display-5">+</span>
                      <p>Upload Photos</p>
                    </div>
                  </label>
                  {existingPropertyImages.map((img, index) => (
                    <div className="image-thumbnail" key={`existing-${index}`}>
                      <img src={`${process.env.REACT_APP_API_URL}/uploads/${img}`} width={200} alt={`existing-${index}`} />
                      <button type="button" className="remove-btn btn-close" onClick={() => handleRemoveGalleryImage(index, true)}></button>
                    </div>
                  ))}
                  {propertyImages.map((img, index) => (
                    <div className="image-thumbnail" key={`new-${index}`}>
                      <img src={img.preview} alt={`new-${index}`} width={200} />
                      <button type="button" className="remove-btn btn-close" onClick={() => handleRemoveGalleryImage(index)}></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="">
                <button type="submit" className="btn btn-primary mt-4">Update Vendor</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVendor;
