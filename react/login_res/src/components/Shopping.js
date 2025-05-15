import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EnquiryModal from './EnquiryMode';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { color } from 'chart.js/helpers';

function Shopping() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
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
              setUserData(data.data);
            } else {
              setError(data.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            setError(error.message);
          });
      }
      
      const fetchProducts = async () => {
        try {
          let url = `${process.env.REACT_APP_API_URL}/getProductswithVendor`;
  
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
    });  // Fix to avoid unnecessary re-renders
  
    const handleEnquiryClick = (product) => {
      setSelectedProduct(product);
      setShowModal(true);
    };
  
    const handleModalClose = () => {
      setShowModal(false);
      setSelectedProduct(null);
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
    
  
    return (
        <>
        <Navbar />
      <div className="mx-3 mt-4">
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-4 feacture-product-card">
              <div className="card h-100">
                <div className='card-imagehomecontainer'>
                <img 
                  src={product.image ? `${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}` : "path_to_default_image.jpg"} 
                  className="card-img-top homeproductimage" 
                  alt={product.name || "default"}
                /></div>
                <div className="card-body allpoductcard-body">
                  <Link to={`/ProductView/${product._id}`} className="card-title ellipsis2">
                    <div>{product.name}</div>
                  </Link>
  
                  {/* Ensure vendorDetails exists before accessing properties */}
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
  
                  <button type="submit" name="Enquiry" className="mt-2 submit-btn" onClick={() => handleEnquiryClick(product)}>
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
          userData={userData} 
        />
      </div></>
    );
  };
    
  
  export default Shopping;
  