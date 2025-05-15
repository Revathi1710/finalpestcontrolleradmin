import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import VendorHeader from './vendorHeader';
import '../SuperAdmin/addcategory.css';
import './sidebar2.css';
import './UserProfile.css';
import infogif from '../icons/gifinfo.gif';
import percentageimage1 from '../icons/percentageimage1.png';
import './dashboard.css';

const AlldetailsVendor = () => {
  const [error, setError] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const vendorId = localStorage.getItem('vendorId'); // Assuming vendorId is stored in local storage

        const productResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getVendorProductcount`, { vendorId });
        if (productResponse.data.status === 'ok') {
          setProductCount(productResponse.data.data.productCount);
        } else {
          console.error(productResponse.data.message);
        }

        const categoryResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getVendorCategorycount`, { vendorId });
        if (categoryResponse.data.status === 'ok') {
          setCategoryCount(categoryResponse.data.data.categoryCount);
        } else {
          console.error(categoryResponse.data.message);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="update-profile-vendor">
    <VendorHeader />
   
    <div className="content row mt-4">
      <div className='col-sm-3'>
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
        
       
          <ul className='VendorList'>
          <li className='list'><i className="fas fa-sign-out-alt sidebaricon"></i>Logout</li>
        </ul>
       
        </ul>
        <img 
      src={infogif} 
      alt="Loading..." 
      style={{  height: 'auto', borderRadius: '10px' }} 
    />
      </div>
      <div className='col-sm-6 userinfo-container'>
          <h3 className='title-vendorInfo'>Dashboard</h3>
          {error && <p className="error">{error}</p>}
       
      </div>
      </div>
    </div>
  );
};

export default AlldetailsVendor;
