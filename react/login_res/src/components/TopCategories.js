import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
 import './categoryhome.css';
const TopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getCategoryHome`);
        const data = response.data;

        if (data.status === "ok") {
          setCategories(data.data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("An error occurred: " + error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleView = (categoryId) => {
    if (categoryId) {
      window.location.href = `/CategoryView/${categoryId}`;
    } else {
      setMessage("Category ID is undefined");
    }
  };

  return (
    <div className="container py-5">
      {message && <p className="text-danger">{message}</p>}
      <div className="row">
        {categories.map((cat, index) => (
          <div key={index} className="col-lg-4 col-md-4 col-sm-6 mb-4">
            <div className="category-card shadow-lg">
              {cat.image ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/${cat.image.replace(/\\/g, "/")}`}
                  alt={cat.name}
                  className="category-image"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <div className="category-body">
                <h4 className="category-title">{cat.name}</h4>
                <button className="category-btn" onClick={() => handleView(cat._id)}>
                  View Category
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategory;
