import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

// Import the slick-carousel CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TopRankingCarousel = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [message, setMessage] = useState('');

  // Function to fetch top products from the enquiries-highest endpoint
  const fetchTopProducts = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/enquiries-highest`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        setTopProducts(data.data);
        setMessage('');
      } else {
        setTopProducts([]);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
      setTopProducts([]);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchTopProducts();
  }, []);

  // Slider configuration
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,   // Number of slides visible
    slidesToScroll: 1, // How many slides to scroll at a time
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <h2 style={{ marginBottom: '10px' }}>Top ranking</h2>
      {message && <p>{message}</p>}
      <Slider {...sliderSettings}>
        {topProducts.map((item, index) => {
          // Get the product image from the joined productDetails field.
          // If no image is available, use a default image path.
          const imageUrl =
            item.productDetails && item.productDetails.image
              ? `${process.env.REACT_APP_API_URL}/${item.productDetails.image.replace('\\', '/')}`
              : "path_to_default_image.jpg";

          return (
            <div key={index} style={{ padding: '0 5px' }}>
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                <img
                  src={imageUrl}
                  alt={`Top ranking item ${index + 1}`}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default TopRankingCarousel;
