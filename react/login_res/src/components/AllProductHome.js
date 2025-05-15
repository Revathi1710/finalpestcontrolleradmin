import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EnquiryModal from './EnquiryMode';
import { Link } from 'react-router-dom';

const AllProducts = ({ location }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [vendorData, setVendorData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const vendortoken = window.localStorage.getItem("vendortoken");

    if (vendortoken) {
      fetch(`${process.env.REACT_APP_API_URL}/vendorData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ vendortoken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setVendorData(data.data);
          } else {
            setError(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
        });
    }

    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem('userId'); // Get user ID from localStorage
      if (!storedUserId) return;
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/userData`, { id: storedUserId });
        if (response.data.status === 'ok') {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
 
    const fetchProducts = async () => {
      try {
        let url = `${process.env.REACT_APP_API_URL}/getFeactureProductsHome`;
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'ok') {
          setProducts(data.data);
          setMessage('');
        } else {
          setProducts([]);
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('An error occurred: ' + error.message);
        setProducts([]);
      }
    };

    fetchProducts();
    fetchUserData();
  }, [location.pathname]);

  const handleEnquiryClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const maskBusinessName = (name) => {
    if (name.length <= 3) return name; // If the name is very short, return it as is
    return (
      <span>
        <span>{name.charAt(0,1)}</span>
        <span className="blur-text">{name.slice(1, -1)}</span>
        <span>{name.charAt(name.length - 1)}</span>
      </span>
    );
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container14 mt-4">
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-4 feacture-product-card">
            <div className="card h-100">
              <div className='card-imagehomecontainer '>
                <img 
                  src={product.image ? `${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}` : "path_to_default_image.jpg"} 
                  className="card-img-top homeproductimage" 
                  alt={product.name || "default"}
                />
              </div>
           
              <div className="card-body">
                <Link to={`/ProductView/${product._id}`} className="card-title ellipsis2">
                  <h5 className='feacture-product-name'>{product.name}</h5>
                </Link>
                {product.vendorDetails ? (
                    
                    <>
                 
                  
                 {product.vendorDetails?.businessName && (
  <div className="companydetails companyname mt-4">
    <h6 style={{ color: "black" }}>Brand Name:</h6>
    {maskBusinessName(product.vendorDetails.businessName)}
  </div>
)}


                     {/* <div className='companydetails mt-4'>
                        {product.vendorDetails.City}, {product.vendorDetails.State}
                      </div>
                      <a className="viewnumber-btn">
                        {product.vendorDetails.number}
                      </a>
                    </>*/}
                 </>  ) : (
                    <div className="companydetails mt-4 text-muted">Vendor details unavailable</div>
                  )}
  
                  <button type="submit" name="Enquiry" className="mt-4 submit-btn" onClick={() => handleEnquiryClick(product)}>
                 Send Inquiry  &nbsp;<i class="fas fa-paper-plane"></i>
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal 
        show={showModal} 
        handleClose={handleModalClose} 
        product={selectedProduct} 
        vendorData={vendorData} 
        userData={userData} 
      />
    </div>
  );
};

export default AllProducts;
