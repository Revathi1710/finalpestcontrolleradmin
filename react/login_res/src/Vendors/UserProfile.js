import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../SuperAdmin/addcategory.css';
import './sidebar2.css';
import './UserProfile.css';
import menu from '../icons/menu.png'; // Adjust path if needed
import userIcon from '../icons/user-header.png'; 
import infogif from '../icons/gifinfo.gif';
import percentageimage1 from '../icons/percentageimage1.png';

const UpdateProfileVendor = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem('vendorId'); // Remove vendorId
    window.location.href = '/vendor/login'; // Redirect to login page
  };
  const toggleVendorsidebar = () => { 
    setsidebarMenuOpen(!sidebarmenuOpen);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [sidebarmenuOpen, setsidebarMenuOpen] = useState(false);
  const [vendorData, setVendorData] = useState(null);
  const [error, setError] = useState(null);
  const [profileCompleteness, setProfileCompleteness] = useState(0); 
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  useEffect(() => {
    const vendortoken = window.localStorage.getItem('vendortoken');

    if (!vendortoken) {
      setError('No token found');
      return;
    }
 

    axios.post(`${process.env.REACT_APP_API_URL}/vendorData`, { vendortoken })
      .then(response => {
        if (response.data.status === 'ok') {
          const vendorInfo = response.data.data;

          // Check if vendor is approved
          if (!vendorInfo.approved) {
            navigate('/Vendor/AccountNotApproved');  // Redirect if not approved
            return;
          }

          setVendorData(vendorInfo);
        } else {
          setError(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  }, [vendorId, navigate]);
  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  
  useEffect(() => {
    if (vendorData) {
      calculateCompleteness(vendorData);
    }
  }, [vendorData]); 

  const calculateCompleteness = (data) => {
    let filledFields = 0;
    const totalFields = 8; 

    if (data.fname) filledFields++;
    if (data.lname) filledFields++;
    if (data.email) filledFields++;
    if (data.alterEmail) filledFields++;
    if (data.number) filledFields++;
    if (data.alterNumber) filledFields++;
    if (data.whatsappNumber) filledFields++;
    if (data.jobTitle) filledFields++;

    const completeness = Math.round((filledFields / totalFields) * 100);
    setProfileCompleteness(completeness);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vendortoken = window.localStorage.getItem('vendortoken');

    axios.put(`${process.env.REACT_APP_API_URL}/updateUserProfileVendor`, vendorData, {
      headers: { 'Authorization': `Bearer ${vendortoken}` }
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vendorData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="update-profile-vendor">
      <Navbar />
      <div className="vendor-sidebarmobile-menu mx-2 mt-2">
  <div style={{ position: "relative" }}>
    <img 
      src={menu} 
      width={30} 
      alt="Menu" 
      className="usermenu-bar-vendor" 
      onClick={toggleVendorsidebar} 
    />
  </div>
</div>
      <div className="content row mt-4">
      
        <div className='col-sm-3 desktop-vendor-sidebar'>
          <ul className='VendorList'>
            <li className='list'> <Link to="/Vendor/Dashboard"><i className="fas fa-home sidebaricon"></i> Dashboard</Link></li>
          </ul>
          <ul className="nano-content VendorList">
            <li className={`sub-menu list ${activeSubMenu === 5 ? 'active' : ''}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(5)}>
                <i className="fas fa-user-alt sidebaricon"></i><span>Profile</span><i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 5 ? 'block' : 'none' }} className='vendorsidebarmenu'>
                <li className='list_sidebar'><Link to="/Vendor/UserProfile" className='listsidebar'>User Profile</Link></li>
                <li className='list_sidebar'><Link to="/Vendor/BusinessProfile" className='listsidebar'>Business Profile</Link></li>
               {/* <li className='list_sidebar'><Link to="/Vendor/BankDetails" className='listsidebar'>Bank Details</Link></li>*/}
              </ul>
            </li>
            <li className={`sub-menu list ${activeSubMenu === 0 ? 'active' : ''}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(0)}>
                <i className="fab fa-product-hunt sidebaricon"></i><span>Product</span><i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 0 ? 'block' : 'none' }} className='vendorsidebarmenu'>
              <li className='list_sidebar'><Link to="/Vendor/AllProduct" className='listsidebar'>All Product</Link></li>
              <li className='list_sidebar'><Link to="/Vendor/AddProductVendor" className='listsidebar'>Add Product</Link></li>
              </ul>
            </li>
          
         
            <ul className='VendorList' onClick={handleLogout}>
            <li className='list'><i className="fas fa-sign-out-alt sidebaricon"></i>Logout</li>
          </ul>
         
          </ul>
      
        </div>
        <div className={` mobiles-vendor-sidebar ${sidebarmenuOpen ? "active" : ""}`}>
          <div className='overlay'>
            <div className='text-left'>
            <button className='mt-2'><i class='fas fa-arrow-left'></i></button>
            </div>
           
  {sidebarmenuOpen && (
    <ul className='VendorList'>
      <li className='list'> 
        <Link to="/Vendor/Dashboard">
          <i className="fas fa-home sidebaricon"></i> Dashboard
        </Link>
      </li>
    </ul>
  )}

  {sidebarmenuOpen && (
    <ul className="nano-content VendorList">
      <li className={`sub-menu list ${activeSubMenu === 5 ? 'active' : ''}`}>
        <a href="#!" onClick={() => handleSubMenuToggle(5)}>
          <i className="fas fa-user-alt sidebaricon"></i><span>Profile</span>
          <i className="arrow fa fa-angle-right pull-right"></i>
        </a>
        <ul style={{ display: activeSubMenu === 5 ? 'block' : 'none' }} className='vendorsidebarmenu'>
          <li className='list_sidebar'><Link to="/Vendor/UserProfile" className='listsidebar'>User Profile</Link></li>
          <li className='list_sidebar'><Link to="/Vendor/BusinessProfile" className='listsidebar'>Business Profile</Link></li>
        </ul>
      </li>

      <li className={`sub-menu list ${activeSubMenu === 0 ? 'active' : ''}`}>
        <a href="#!" onClick={() => handleSubMenuToggle(0)}>
          <i className="fab fa-product-hunt sidebaricon"></i><span>Product</span>
          <i className="arrow fa fa-angle-right pull-right"></i>
        </a>
        <ul style={{ display: activeSubMenu === 0 ? 'block' : 'none' }} className='vendorsidebarmenu'>
          <li className='list_sidebar'><Link to="/Vendor/AllProduct" className='listsidebar'>All Product</Link></li>
          <li className='list_sidebar'><Link to="/Vendor/AddProductVendor" className='listsidebar'>Add Product</Link></li>
        </ul>
      </li>

      <ul className='VendorList' onClick={handleLogout}>
        <li className='list'>
          <i className="fas fa-sign-out-alt sidebaricon"></i>Logout
        </li>
      </ul>
    </ul>
  )}
</div></div>
        <div className='col-sm-8 userinfo-container'>
          <h3 className='title-vendorInfo'>User Profile</h3>
          {error && <p className="error">{error}</p>}
          <div className="form-container1">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="mb-2 col-sm-6">
                  <div className="labelcontainer">
                    <label htmlFor="fname">First Name:</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    name="fname"
                    placeholder='Enter First Name'
                    value={vendorData.fname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2 col-sm-6">
                  <div className="labelcontainer">
                    <label htmlFor="lname">Last Name:</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    placeholder='Enter Last Name'
                    value={vendorData.lname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='row'>
                <div className="form-group col-sm-6">
                  <div className="mb-2">
                    <div className="labelcontainer">
                      <label htmlFor="email">Email:</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={vendorData.email}
                      onChange={handleChange}
                      placeholder='Enter Email'
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div className="mb-2">
                    <div className="labelcontainer">
                      <label htmlFor="alterEmail">Alternate Email:</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="alterEmail"
                      name="alterEmail"
                      placeholder='Alternate Email'
                      value={vendorData.alterEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="form-group col-sm-6">
                  <div className="mb-2">
                    <div className="labelcontainer">
                      <label htmlFor="number">Phone Number:</label>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="number"
                      name="number"
                      placeholder='Enter Phone Number'
                      value={vendorData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div className="mb-2">
                    <div className="labelcontainer">
                      <label htmlFor="alterNumber">Alternate Phone Number:</label>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="alterNumber"
                      name="alterNumber"
                      placeholder='Alternate Phone Number'
                      value={vendorData.alterNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="form-group col-sm-6">
                  <div className="mb-2">
                    <div className="labelcontainer">
                      <label htmlFor="whatsappNumber">WhatsApp Number:</label>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      placeholder='Enter WhatsApp Number'
                      value={vendorData.whatsappNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div className="mb-2">
                    <div className="labelcontainer">
                      <label htmlFor="jobTitle">Job Title:</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="jobTitle"
                      name="jobTitle"
                      placeholder='Enter Job Title'
                      value={vendorData.jobTitle}
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
          
       {/*<div className='col-sm-3'>
          <div className='percentage'>
  

  
  <div class="circle-wrap">
    <div class="circle">
      <div class="mask full-1">
        <div class="fill-1"></div>
      </div>
      <div class="mask half">
        <div class="fill-1"></div>
      </div>
      <div className="inside-circle"> {profileCompleteness}% </div>
    </div>
  </div>
   
     

        <h6>My Profile Completeness</h6>
        <p>Please add your Standard Certificate</p>
          </div>
          <img src={percentageimage1}  />
          
          </div>*/}
      </div>
    </div>
  );
};

export default UpdateProfileVendor;