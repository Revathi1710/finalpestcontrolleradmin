import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../SuperAdmin/addcategory.css';
import '../Vendors/sidebar2.css';
import '../Vendors/table.css';
import '../Vendors/myorder.css';
import '../Vendors/UserProfile.css';
const AllEnquiryCustomer = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [userData, setUserData] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove vendorId
    window.location.href = '/login'; // Redirect to login page
  };
  useEffect(() => {
    const fetchUserDataAndEnquiries = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) return;

      try {
        // Fetch user data
        const userResponse = await axios.post(`${process.env.REACT_APP_API_URL}/userData`, { id: storedUserId });
        if (userResponse.data.status === 'ok') {
          const fetchedUserData = userResponse.data.data; // Ensure correct data extraction
          setUserData(fetchedUserData);

          // Fetch enquiries only if userData exists
          const enquiryResponse = await fetch(`${process.env.REACT_APP_API_URL}/getCustomerEnquiry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UserId: fetchedUserData._id }),
          });

          const enquiryData = await enquiryResponse.json();
          if (enquiryData.status === 'ok') {
            setEnquiries(enquiryData.data);
          } else {
            setMessage('Error fetching enquiries: ' + enquiryData.message);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data');
      }
    };

    fetchUserDataAndEnquiries();
  }, []);

  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <div className="content row mt-4">
      <div className='col-sm-3'>
          
          <ul className="nano-content VendorList">
            <li className={`sub-menu list ${activeSubMenu === 5 ? 'active' : ''}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(5)}>
                <i className="fas fa-user-alt sidebaricon"></i><span>Profile</span><i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 5 ? 'block' : 'none' }} className='vendorsidebarmenu'>
                <li className='list_sidebar'><Link to="/EditProfile" className='listsidebar'>Edit Profile</Link></li>
              
               {/* <li className='list_sidebar'><Link to="/Vendor/BankDetails" className='listsidebar'>Bank Details</Link></li>*/}
              </ul>
            </li>
            <li className={`sub-menu list ${activeSubMenu === 0 ? 'active' : ''}`}>
              <a href="#!" onClick={() => handleSubMenuToggle(0)}>
                <i className="fas fa-paper-plane sidebaricon"></i><span>Enquiry</span><i className="arrow fa fa-angle-right pull-right"></i>
              </a>
              <ul style={{ display: activeSubMenu === 0 ? 'block' : 'none' }} className='vendorsidebarmenu'>
              <li className='list_sidebar'><Link to="/Vendor/AllProduct" className='listsidebar'>All Enquiry</Link></li>
              
              </ul>
            </li>
            <ul className="VendorList" onClick={handleLogout}>
              <li className="list">
                <i className="fas fa-key sidebaricon"></i>Change Password
              </li>
            </ul>
         
            <ul className='VendorList' onClick={handleLogout}>
            <li className='list'><i className="fas fa-sign-out-alt sidebaricon"></i>Logout</li>
          </ul>
         
          </ul>
        
        </div>

        <div className="col-sm-9">

          <div className='allenquiry'>
          <div className="title">
            <h2 className='text-center mb-2'>All Enquiries</h2>
           
          </div>
            {message && <p>{message}</p>}
            {enquiries.length > 0 ? (
              <div>
                {enquiries.map((enquiry) => (
                  <div className="row container ordercontainer" key={enquiry._id}>
                    <div className='col-sm-3'>
                      <img
                        src={enquiry.product_id?.image ? `${process.env.REACT_APP_API_URL}/${enquiry.product_id.image.replace('\\', '/')}` : 'default-image.jpg'}
                        style={{ width: '100px', height: '100px' }}
                        alt="Product"
                      />
                    </div>
                    <div className='col-sm-5'>
                      <div className="orderProductName">Product Name:{enquiry.productname}</div>
                      <div className="orderProductprice">Product Price:₹{enquiry.productPrice}</div>
                      <div className="orderProductprice">Product Quantity:{enquiry.Quality}</div>
                    </div>
                    <div className='col-sm-3'>
                    <div className="orderProductprice">Date & Time:{new Date(enquiry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Enquiries found</p>
            )}
          </div>
        </div>

        <div className='col-sm-3 mt-5'></div>
      </div>
    </div>
  );
};

export default AllEnquiryCustomer;
