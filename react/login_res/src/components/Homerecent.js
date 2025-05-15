import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './homerecent.css';
import TopRankingCarousel from '../components/TopRankingCarousel';

const Homerecent = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [lowestPriceProducts, setLowestPriceProducts] = useState([]);
  const [bestDealer, setbestDealer] = useState([]); 
  const [message, setMessage] = useState('');

  // Fetch recent products (new arrivals)
  const fetchProductsRecent = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/recent-products`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        setRecentProducts(data.data);
      } else {
        setRecentProducts([]);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
      setRecentProducts([]);
    }
  };

  // Fetch the lowest price products (an array of 2 products)
  const fetchLowestprice = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/lowest-price-product`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        setLowestPriceProducts(data.data);
      } else {
        setLowestPriceProducts([]);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
      setLowestPriceProducts([]);
    }
  };

  // Fetch best dealer (top enquiry product)
  const bestDealerlist = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/best-dealer`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        setbestDealer(data.data);
      } else {
        setbestDealer([]); // Fixed: clear bestDealer, not lowestPriceProducts
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
      setbestDealer([]);
    }
  };

  useEffect(() => {
    fetchProductsRecent();
    fetchLowestprice();
    bestDealerlist();
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-row">
        {/* ===== Column 1: Top ranking ===== */}
        <div className="homepage-column col-sm-3">
          <div className="section-header">
            <h2>Top Enquiry Product</h2>
            <a href="#more">View more</a>
          </div>
          <TopRankingCarousel />
        </div>

        {/* ===== Column 2: New arrivals ===== */}
        <div className="homepage-column">
          <div className="section-header">
            <h2>New arrivals</h2>
            <a href="#more">View more</a>
          </div>
          <div className="section-subtitle"></div>
          <div className="product-grid">
            {recentProducts.map((product, index) => (
              <div key={index} className="product-card">
                <img
                  src={
                    product.image
                      ? `${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`
                      : "path_to_default_image.jpg"
                  }
                  alt={product.name}
                />
              </div>
            ))}
          </div>
          {message && <p className="error-message">{message}</p>}
        </div>

        {/* ===== Column 3: Top deals ===== */}
        <div className="homepage-column">
          <div className="section-header">
            <h2>Top deals</h2>
            <a href="#more">View more</a>
          </div>
          <div className="section-subtitle">
            <h4>Deals on best sellers</h4>
          </div>
          {bestDealer && bestDealer.length > 0 ? (
  bestDealer.map((dealer, index) => (
    <div key={index} className="product-card">
      <img
        src={
          dealer.productDetails.image
            ? `${process.env.REACT_APP_API_URL}/${dealer.productDetails.image.replace('\\', '/')}`
            : "path_to_default_image.jpg"
        } style={{height:"180px",objectFit:"contain"}}
        alt={dealer.productDetails.name}
      />
    </div>
  ))
) : (
  <p>No best dealer found</p>
)}

          <div className="section-subtitle">
            <h4>Lowest price</h4>
          </div>
          <div className="product-grid">
            {lowestPriceProducts && lowestPriceProducts.length > 0 ? (
              lowestPriceProducts.map((product, index) => (
                <div key={index} className="product-card">
                  <img
                    src={
                      product.image
                        ? `${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`
                        : "path_to_default_image.jpg"
                    }
                    alt={product.name}
                  />
                </div>
              ))
            ) : (
              <p>No lowest price product found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homerecent;
