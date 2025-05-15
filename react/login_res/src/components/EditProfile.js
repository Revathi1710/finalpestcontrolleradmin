import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import "../SuperAdmin/addcategory.css";
import "../Vendors/UserProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem("userId"); // Get user ID from localStorage
      if (!storedUserId) return;

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/userData`,
          { id: storedUserId }
        );

        if (response.data.status === "ok") {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserId = localStorage.getItem("userId"); // Fetch stored user ID

   

    axios.put(`${process.env.REACT_APP_API_URL}/updateEditProfilebuyer`, UserData, {

      headers: { 'Authorization': `Bearer ${storedUserId}` }
    })
    .then(response => {
      if (response.data.status === 'ok') {
       alert('updated successflly')
      } else {
        setError(response.data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error.message);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />
      <div className="content row mt-4">
        <div className="col-sm-3">
          <ul className="nano-content VendorList">
            <li className={`sub-menu list ${activeSubMenu === 5 ? "active" : ""}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(5)}>
                <i className="fas fa-user-alt sidebaricon"></i>
                <span>Profile</span>
                <i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul
                style={{ display: activeSubMenu === 5 ? "block" : "none" }}
                className="vendorsidebarmenu"
              >
                <li className="list_sidebar">
                  <Link to="/EditProfile" className="listsidebar">
                    Edit Profile
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`sub-menu list ${activeSubMenu === 4 ? "active" : ""}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(4)}>
              <i className="fas fa-paper-plane sidebaricon"></i>
                <span>Enquiry</span>
                <i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul
                style={{ display: activeSubMenu === 4 ? "block" : "none" }}
                className="vendorsidebarmenu"
              >
                <li className="list_sidebar">
                <Link to="/AllEnquiry" className="listsidebar">
                    All Enquiry
                  </Link>
                </li>
              </ul>
            </li>
            <ul className="VendorList" onClick={handleLogout}>
              <li className="list">
                <i className="fas fa-key sidebaricon"></i>Change Password
              </li>
            </ul>
            <ul className="VendorList" onClick={handleLogout}>
              <li className="list">
                <i className="fas fa-sign-out-alt sidebaricon"></i>Logout
              </li>
            </ul>
          </ul>
        </div>

        <div className="col-sm-8 userinfo-container">
          <h3 className="title-vendorInfo">User Profile</h3>
         
          <div className="form-container1">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="mb-2">
                  <label htmlFor="fname">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    name="fname"
                    placeholder="Enter First Name"
                    value={UserData.fname || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group">
                  <div className="mb-2">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={UserData.email || ""}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="form-group">
                  <div className="mb-2">
                    <label htmlFor="number">Phone Number:</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="number"
                      name="number"
                      placeholder="Enter Phone Number"
                      value={UserData.number || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="button-container mt-3">
                <button type="submit" className="btn btn-primary submitbtn">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
