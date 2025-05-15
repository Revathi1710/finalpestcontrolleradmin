import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './categoryview.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const { category } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem('userId');
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
      if (!category) {
        setMessage('Category is not defined.');
        return;
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getProductsByCategory/${category}`);
        if (response.data.status === 'ok') {
          setProducts(response.data.data);
        } else {
         
        }
      } catch (error) {
       
      }
    };
    const fetchSubcategories = async () => {
      if (!category) {
       
        return;
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getSubCategory/${category}`);
        const data = response.data;
        if (data.status === 'ok') {
          setSubcategories(data.data);
        } else {
          
        }
      } catch (error) {
       
      }
    };
    fetchUserData();
    fetchProducts();
      fetchSubcategories();
  }, [category]);

  const handleEnquiry = async (e) => {
    e.preventDefault();
    if (!userData) {
      window.localStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.location.href = '/login';
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const enquiryData = {
      productname: formData.get('name'),
      product_id: formData.get('id'),
      productPrice: formData.get('price'),
      vendorId: formData.get('vendorId'),
      UserId: userData._id,
      Username: userData.fname,
      UserNumber: userData.number,
      

    
      Quality:1,
      vendorName:formData.get('vendor_name'),
      vendorBusinessName:formData.get('business_name'),
      vendorNumber:formData.get('vendor_number'),
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sendEnquiry`, enquiryData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      if (data.status === 'ok') {
        setMessage('Enquiry sent successfully!');
      } 
      else {
        setMessage(data.message);
      }
    } catch (error) {
     console.error("Error:", error);
      setMessage('An error occurred: ' + error.message);
    }
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
    <div>
      <Navbar />
      <div className="container2 mt-4">
      {message && <div className="alert alert-info">{message}</div>}
     
        <div className="row">
          {/* Sidebar (Categories) */}
          <div className="col-md-2">
            <div className="bg-white p-3 border rounded" style={{position:"sticky",top:"85px",left:"0px"}}>
              <h5 className="mb-3">Related Categories</h5>
             
                    
              <ul className="list-group">
  {subcategories.length > 0 ? (
    subcategories.map((subcategory, index) => (
      <li key={index} className="list-group-item">{subcategory.name}</li>
    ))
  ) : (
    <li className="list-group-item ">No subcategories available</li>
  )}
</ul>

            </div>
          </div>

          {/* Product Grid */}
          <div className="col-md-7">
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className=" mb-4">
                  <div className="card border shadow-sm ">
                    <div className='row px-3'>
                    <div className="position-relative col-sm-4">
                      {product.image ? (
                        <img 
                          src={`${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`} 
                          className="card-img-top p-3" 
                          alt={product.name}
                          style={{ height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <img 
                          src="default_image.jpg" 
                          className="card-img-top p-3" 
                          alt="default"
                          style={{ height: '100%', objectFit: 'contain' }}
                        />
                      )}
                    </div>
                    <div className="card-body col-sm-4">
                      <h5 className="card-title  text-truncate">{product.name}</h5>
                      <p className="text-danger fw-bold  mt-2 mb-2">₹{product.sellingPrice}</p>
                      <p className=''>{product.description}</p>
                    
                    </div> 
                    <div className="card-body  col-sm-3" style={{background:"rgb(255, 250, 241)"}}>
                        <h4>Seller Details</h4>
                        <h6 className='mb-4'>Brand Name:  {maskBusinessName(product.vendorId.businessName)}</h6>
                        <h6  className='mb-4' >Establishment: {product.vendorId.establishment} Years</h6>
                        <form onSubmit={handleEnquiry}>
                        <input type="hidden" name="name" value={product.name} />
                        <input type="hidden" name="vendor_name" value={product.vendorId.fname} />
                        <input type="hidden" name="business_name" value={product.vendorId.businessName} />
                        <input type="hidden" name="vendor_number" value={product.vendorId.number} />
                        <input type="hidden" name="id" value={product._id} />
                        <input type="hidden" name="price" value={product.sellingPrice} />
                        <input type="hidden" name="vendorId" value={product.vendorId._id} />
                        <button type="submit" className="btn submit-btn mt-5 w-100 fw-bold">
                          <i className="fas fa-envelope"></i> Send Enquiry
                        </button>
                      </form>
                    </div> 
                    
                      </div>
                  
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
