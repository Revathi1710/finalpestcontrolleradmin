import React, { useState } from 'react';
import Sidebar from './sidebar'; // Adjust the path according to your directory structure
import './addcategory.css'; // Import a CSS file for styling

const AddCategory = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState(''); 
  const [image, setImage] = useState(null);  // Store File object, not a string
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("image", image);  // Ensure `image` is a File object
    formData.append("active", active);

    fetch(`${process.env.REACT_APP_API_URL}/addcategory`, {
      method: "POST",
      body: formData,  // No need to set Content-Type; browser handles it
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'ok') {
        alert('Category added successfully!');
        window.location.href = "/SuperAdmin/AllCategories";
      } else {
        alert(data.message || 'Category addition failed!');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert('An error occurred! Please try again later.');
    });
  };

  return (
    <>
      <Sidebar />
      <div className="add-category-container">
        <div className="container add-category-content">
          <h1 className="page-title">Add a New Category</h1>
          <form onSubmit={handleSubmit} className="category-form">
            <div className='form-row row'>
              <div className='form-group col-sm-6 mb-4'>
                <label htmlFor="name">Name</label>
                <input
                  type='text'
                  id='name'
                  placeholder='Category Name'
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='form-group col-sm-6 mb-4'>
                <label htmlFor="slug">Slug</label>
                <input
                  type='text'
                  id='slug'
                  placeholder='Category Slug'
                  className='form-control'
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-4'>
                <label htmlFor="description">Description</label>
                <textarea
                  id='description'
                  className='form-control'
                  placeholder='Category Description'
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='form-group mb-4'>
                <label htmlFor="image">Category Image</label>
                <input
                  type='file'
                  id='image'
                  className='form-control'
                  accept="image/*" // Restrict to images only
                  onChange={(e) => setImage(e.target.files[0])} // Store File object
                  required
                />
              </div>
              <div className='form-group'>
                <label>Status</label>
                <div className="status-options">
                  <label>
                    <input
                      type='radio'
                      name="status"
                      value={true}
                      checked={active === true}
                      onChange={() => setActive(true)}
                    /> Active
                  </label>
                  <label>
                    <input
                      type='radio'
                      name="status"
                      value={false}
                      checked={active === false}
                      onChange={() => setActive(false)}
                    /> Inactive
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="submit-btn">Add Category</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
