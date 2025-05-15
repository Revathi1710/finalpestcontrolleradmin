import React, { useState } from "react";
import Sidebar from "./sidebar"; // Adjust the path according to your directory structure
import "./addcategory.css";

function AddCustomerAdmin() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare form data for submission
    const formData = {
      fname,
      email,
      number,
      businessName,
      password,
      cpassword,
    };

    fetch(`${process.env.REACT_APP_API_URL}/addNewCustomer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "addCustomer");
        if (data.status === "ok") {
          alert("Customer added successfully!");
          window.location.href = "/SuperAdmin/AllCustomer";
        } else {
          alert("Customer addition failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
   <>
    <Sidebar />
   <div className="add-category-container">
  
   <div className="add-category-content">
        <h1 className="page-title">Add Seller</h1>
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-row row">
            <div className="form-group col-sm-6 mb-4">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                id="fname"
                placeholder="Enter Name"
                className="form-control"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="form-group col-sm-6 mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email ID"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-sm-6 mb-4">
              <label htmlFor="number">Mobile Number</label>
              <input
                type="text"
                id="number"
                placeholder="Mobile Number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group col-sm-6 mb-4">
              <label htmlFor="businessName">Company Name</label>
              <input
                type="text"
                id="businessName"
                className="form-control"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="form-group col-sm-6 mb-4">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group col-sm-6 mb-4">
              <label>Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                className="form-control"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Add Customer
          </button>
        </form>
      </div>
    </div></>
  );
}

export default AddCustomerAdmin;
