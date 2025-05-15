import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import RelatedProduct from '../components/RelatedProduct';
import MoreSellerProduct from '../components/MoreSellerProduct';
import axios from 'axios';
import './productview.css';

const ProductView = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [userData, setUserData] = useState(null); // Store user details
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
 

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`${process.env.REACT_APP_API_URL}/ProductView/${id}`);
        if (productResponse.data.status === 'ok') {
          setProduct(productResponse.data.data);
        } else {
          setError(productResponse.data.message);
        }

        const reviewsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/productReviews/${id}`);
        if (reviewsResponse.data.status === 'ok') {
          setReviews(reviewsResponse.data.data);
        } else {
          setError(reviewsResponse.data.message);
        }
      } catch (error) {
        setError('An error occurred: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

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

    fetchProduct();
    fetchUserData();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleEnquiry = async (e) => {
    e.preventDefault();

    if (!userData) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.location.href = '/login';
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    const enquiryData = {
      productname: product.name,
      product_id: id,
      productPrice: product.sellingPrice,
      vendorId: product.vendorId._id,
      UserId: userData._id,
      Username: userData.fname,
      UserNumber: userData.number,
      Quality: quantity,
      vendorName:product.vendorId.fname,
      vendorBusinessName:product.vendorId.businessName,
      vendorNumber:product.vendorId.number,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sendEnquiry`, enquiryData, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = response.data;

      setMessage(data.status === 'ok' ? 'Enquiry sent successfully!' : data.message);
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="">
        {product ? (
          <div className="row productview-section">
            <div className="col-md-9 productDetails">
              <div className="row productrow">
                <div className="productimage-showcase">
                <div className="productimage-sticky">
                <div className="productimage-container">
                  {product.image ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`}
                      className="img-fluid  product-view-image"
                      alt={product.name}
                    />
                  ) : (
                    <img
                      src="path_to_default_image.jpg"
                      className="img-fluid product-view-image"
                      alt="default"
                    />
                  )}
                </div> </div></div>
                <div className="product-special-section">
                  <h3 className='productName'>{product.name}</h3>
               
                  
                  <div className="enquirydetails mb-4 mt-4">
                {/*<p className='reviewcount'>⭐ 0.0 (0 Reviews)</p>*/}
                <span className="sellingprice ">₹{product.sellingPrice}</span>  <span className="originalprice">
                  <s>₹{product.originalPrice}</s>
                </span>
                <p className="des mt-2">{product.smalldescription}</p><br/>
                <div className='d-flex align-items-center'>
                <div className="">
             
                <div className="d-flex align-items-center">
      <button className="btn increse-decrese-btn" onClick={handleDecrease}>-</button>
      <input
        type="text"
        className="form-control text-center increse-decrease-input-field"
        value={quantity}
        onChange={handleChange}
        min="1"
        style={{ width: "70px" }}
      />
      <button className="btn increse-decrese-btn" onClick={handleIncrease}>+</button>
    </div>
            </div>
              
               <div className='ms-3'>
                <form onSubmit={handleEnquiry}>
                  <button className="btn btn-primary sendenq">Send Enquiry</button>
                </form></div></div>
                {message && <p>{message}</p>}
              </div>
              <div className="productOverview">
              <h3>Product Overview</h3>
              <p className="description">{product.description}</p>
            </div>
                </div>
             
              <div className='product-related mt-3 px-3'>
        <h3 className='productrecent'>Related Products </h3>
        <RelatedProduct categoryId={product.category} productId={product._id}/> 
      </div>
      <div className='product-related mt-3 px-3'>
        <h3 className='productrecent'>More Product From This seller</h3>
         <MoreSellerProduct  vendorId={product.vendorId._id} productId={product._id} /> 
      </div> </div>
            </div>
            <div className="col-md-3 sellerDetails">
              
             
              <div className="seller">
                <h5>Seller Details</h5>
                {product.vendorId ? (
                  <>
                   {/* <h6 className='Proprietor'><i class='far fa-user'></i> Proprietor</h6>
                    <p>{product.vendorId.fname}</p>*/}
                    <h6 className='Proprietor'> <i class='fas fa-landmark'></i> Company</h6>
                   
                    <p>{product.vendorId.businessName}</p>
                    <h6 className='Proprietor'> <i class='far fa-calendar'></i>Establishment</h6>
                   
                    <p>{product.vendorId.establishment} Years</p>
                    {/* <h6 className='Proprietor'>  <i class='fas fa-mail-bulk'></i>Email</h6>
                   
                    <p> {product.vendorId.email}</p>
                    <h6 className='Proprietor'><i class="fa fa-phone"></i>Contact Number</h6>
                    <p>{product.vendorId.number}</p>
                    <h6 className='Proprietor'> <i class='fas fa-map-marker-alt'></i>Address</h6>
                    <p>{product.vendorId.Address}</p>*/}
                   
                  </>
                ) : (
                  <p>No vendor details available.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}

        {/* Tab Navigation 
        <div className='overview'>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabClick('overview')}
          >
            Product Overview
          </button>
          <button
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => handleTabClick('reviews')}
          >
            Reviews
          </button>
        </div>

       
        <div className="tab-content mt-4">
          {activeTab === 'overview' && (
            <div className="productOverview">
              <h3>Product Overview</h3>
              <p className="des">{product.description}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="allreviews">
              <h2>All Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="review-card">
                    <div className="review-header">
                      <h5>{review.Username}</h5>
                      <p className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="review-body row">
                      <div className="col-sm-3">
                        {review.image && (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${review.image.replace(
                              '\\',
                              '/'
                            )}`}
                            alt="Review"
                            className="review-image"
                          />
                        )}
                      </div>
                      <div className="review-rating col-sm-2">
                        <span className="rating-label">Rating:</span>
                        <span className={`rating-stars rating-${review.starRate}`}></span>
                      </div>
                      <p className="col-sm-3">
                        <strong>Response:</strong>{' '}
                        {review.Response ? '👍' : '👎'}
                      </p>
                      <p className="col-sm-2">
                        <strong>Quality:</strong>{' '}
                        {review.Quality ? '👍' : '👎'}
                      </p>
                      <p className="col-sm-2">
                        <strong>Delivery:</strong>{' '}
                        {review.Delivery ? '👍' : '👎'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>*/}
     
    </div></div>
  );
};

export default ProductView;
