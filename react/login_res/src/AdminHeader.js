import React from 'react';
import './Header.css'; // Move your styles here
import logo from './uploads/Group-7-2 (1).webp'; // Adjust the path if needed

const Header = () => {
  const menuItems = [
    { name: "Dashboard", path: "Dashboard" },
    { name: "Add Enquiry", path: "addEnquiry" },
    { name: "All Enquiry", path: "allEnquiry" },
    { name: "Add Loan", path: "addLoan" },
    { name: "Active Loan", path: "allLoan" },
    { name: "Closed Loan", path: "allClosedLoan" },
    { name: "All Customer", path: "allCustomer" },
    { name: "All Employee", path: "allEmployee" },
    { name: "Change Password", path: "changepassword" },
    { name: "Logout", path: "logout" }
  ];

  return (
    <div>
      <div className="logout-container">
        <marquee behavior="scroll" direction="left" style={{ fontSize: '18px', color: '#fff' }}>
          Welcome to ETPL Gold CRM - Your Trusted Partner for Seamless Gold Management!
        </marquee>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid logoimagesection">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Admin Logo" width="100%" height="50px" className="d-inline-block align-text-top" />
          </a>
        </div>
      </nav>

      <div className="row search-and-menu">
        <div className="col-sm-10">
          <div className="container1 mt-2 headerallList">
            {menuItems.map(item => (
              <a
                key={item.path}
              
                className={`headerlist ${currentPage === `${item.path}.php` ? 'active' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
