import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

import logo from '../icons/aristostechlogo.png'; // Adjust path if needed
import shop from '../icons/shopping-head.png'; // Adjust path if needed
import sell from '../icons/shopping-bag.png'; // Adjust path if needed
import menu from '../icons/menu.png'; // Adjust path if needed
import userIcon from '../icons/user-header.png'; 


const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [menuOpen, setMenuOpen] = useState(false);
  const userId = localStorage.getItem('userId');
  const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad']; // Add more cities as needed
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const vendorId = localStorage.getItem('vendorId');

        if (!userId && !vendorId) return;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/getName`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, vendorId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'ok' && result.data && result.data.fname) {
          setUserName(result.data.fname);
        } else {
          console.error('Error in API response:', result.message || 'No name found');
        }
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };

    fetchUserName();
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    // You can also trigger an API call or update based on the selected city here
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchLocation = params.get('search') || '';
    setSelectedCity(searchLocation || 'All Cities');
  }, []);
  const fullText = "What are you looking for?";
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setPlaceholder(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(intervalId);
      }
    }, 200); // Adjust the speed (milliseconds per character) as needed

    return () => clearInterval(intervalId);
  }, []);
  
  const handleBuyerClick = () => {
    setShowModal(false);
    // Redirect buyer to the login page
    navigate('/login');
  };

  const handleSellerClick = () => {
    setShowModal(false);
    // Redirect seller to the vendor signup page
    navigate('/vendor/signup');
  };
  return (
    <nav className="navbar">
      <div className="container1">
        <div className="row header-row desktop-header">
          <div className="col-sm-2">
            <Link to="/" className="navbar-brand">
            
           <p className='logoname'>Human
           <span className='spanlogo'>Hair</span></p>
            </Link>
          </div>
         {/* <div className="col-sm-1">
            <select className="form-select headerinputfield" value={selectedCity} onChange={handleCityChange}>
              <option value="All Cities">All Cities</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>*/}
          <div className="col-sm-5">
            <form className=" mx-auto my-2 mt-2">
            <div className='search-btnseaction d-flex'>
              <input
                className="form-control me-2 headerinputfield"
                type="search"
                placeholder={placeholder}
                aria-label="Search"
              />
            
              <button
                className="btn searchheader"
                type="submit"
                aria-label="Search"
              >
                <i className="fas fa-search"></i>
              </button>
              </div>
             
            </form>
          </div>
          <div className="col-sm-5">
            <ul className="menulist">
              <li className="nav-item">
              {userId ? (
      <Link to="/Shopping" className="nav-link">
        <div style={{ display: 'flex', alignItems: 'center' }}>
       <img src={shop} width={30} alt="Shopping check"  style={{ marginRight: '8px' }} />
       <span>
       Shopping  </span> 
       </div>
      </Link>
    ) : (
      <Link to="/Signup" className="nav-link">
        <div style={{ display: 'flex', alignItems: 'center' }}>
       <img src={shop} width={30} alt="Shopping check"  style={{ marginRight: '8px' }} />
       <span>
       Shopping  </span> 
       </div>
      </Link>
    )}
              </li>
              <li className="nav-item">
                <Link to="/Vendor/Signup" className="nav-link">
                <div style={{ display: 'flex', alignItems: 'center' }}>
  <img src={sell} width={30} alt="Shopping check" style={{ marginRight: '8px' }} />
  <span>Sell</span>
</div>

                </Link>
              </li>
             {/*} <li className="nav-item">
                <Link to="/vendors" className="nav-link">
                <i class='far fa-question-circle iconsheader'></i>
                  Help
                </Link>
              </li>*/}
              <li className="nav-item">
             
                {userName ? (
                  <Link to={userId ? "/EditProfile" : "/Vendor/UserProfile"} className="nav-link">
                     <div style={{ display: 'flex', alignItems: 'center' }}>
                     <img src={userIcon} width={30} alt="Shopping check"  style={{ marginRight: '8px' }} />
                      <span>Welcome, {userName}</span> 
                    </div>
                  </Link>
                ) : (
                  
                  <Link to="/Vendor/Signup" className="nav-link">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                     <img src={userIcon} width={30} alt="Shopping check"  style={{ marginRight: '8px' }} />
                      <span>Login/Signup</span> 
                    </div>
                  </Link>
                )}
              </li>
              <li className="nav-item">
             
             {userName ? (
               <Link to="logout" className="nav-link">
                 <button className='logoutSignupbtn'>Logout</button>
               </Link>
             ) : (
               
                
              <button
              className='logoutSignupbtn'
              onClick={() => setShowModal(true)}
            >
              Signup
            </button>
               
                    
             )}
             {showModal && (
                         <div className="header-modal-overlay">
                           <div className="header-modal-content">
                          <h2>Select Your Role</h2>
                           <div className="header-modal-buttons">
                             <button onClick={handleBuyerClick}>Buyer</button>
                               <button onClick={handleSellerClick}>Seller</button>
                              </div>
                               <button className="header-modal-close" onClick={() => setShowModal(false)}>Close</button>
                              </div>
                            </div>
                          )}
           </li>
            </ul>
          </div>
        </div>

        <div className="header-row mobile-header">
      <div className="d-flex flexsearchlogo">
        <div className="col-sm-2">
          <Link to="/" className="navbar-brand">
            <p className="logoname">
              Human <span className="spanlogo">Hair</span>
            </p>
          </Link>
        </div>

        <div className="searchsection-mobile">
          <form className="mx-auto my-2 mt-2">
            <div className="search-btnseaction d-flex">
              <input className="form-control me-2 headerinputfield" type="search" placeholder={placeholder} aria-label="Search" />
              <button className="btn searchheader" type="submit" aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="headermobileuser">
          <img src={userIcon} width={20} alt="User" />
          <div style={{ position: "relative" }}>
            <img src={menu} width={20} alt="Menu" className="usermenu-bar" onClick={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Menu List */}
      <div className={`mobile-menu-list ${menuOpen ? "active" : ""}`}>
        <ul className="mobile-menulist">
          <li className="nav-item">
            {userId ? (
              <Link to="/Shopping" className="nav-link">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={shop} width={20} alt="Shopping" style={{ marginRight: "8px" }} />
                  <span>Shopping</span>
                </div>
              </Link>
            ) : (
              <Link to="/Signup" className="nav-link">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={shop} width={20} alt="Shopping" style={{ marginRight: "8px" }} />
                  <span>Shopping</span>
                </div>
              </Link>
            )}
          </li>

          <li className="nav-item">
            <Link to="/Vendor/Signup" className="nav-link">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={sell} width={20} alt="Sell" style={{ marginRight: "8px" }} />
                <span>Sell</span>
              </div>
            </Link>
          </li>

          <li className="nav-item">
            {userName ? (
              <Link to={userId ? "/EditProfile" : "/Vendor/UserProfile"} className="nav-link">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={userIcon} width={20} alt="User" style={{ marginRight: "8px" }} />
                  <span>Welcome, {userName}</span>
                </div>
              </Link>
            ) : (
              <Link to="/Vendor/Signup" className="nav-link">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={userIcon} width={20} alt="User" style={{ marginRight: "8px" }} />
                  <span>Login/Signup</span>
                </div>
              </Link>
            )}
          </li>

          <li className="nav-item">
            {userName ? (
                <Link to={userId ? "/logout" : "/Vendor/logout"} className="nav-link">
                <button className="logoutSignupbtn">Logout</button>
              </Link>
            ) : (
              <button className="logoutSignupbtn" onClick={() => setShowModal(true)}>
                Signup
              </button>
            )}
          </li>
        </ul>
      </div>

      {showModal && (
        <div className="header-modal-overlay">
          <div className="header-modal-content">
            <h2>Select Your Role</h2>
            <div className="header-modal-buttons">
              <button onClick={() => setShowModal(false)}>Buyer</button>
              <button onClick={() => setShowModal(false)}>Seller</button>
            </div>
            <button className="header-modal-close" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
    </nav>
  );
};

export default Navbar;
