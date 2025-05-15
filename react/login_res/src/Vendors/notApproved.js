import React from "react";
import Navbar from '../components/navbar';
import "bootstrap/dist/css/bootstrap.min.css";

const AccountNotApproved = () => {
  return (
    <>
      <Navbar />
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 text-center" style={{ width: "24rem" }}>
       
        <h2 className="h5 text-dark mb-2">Account Not Approved</h2>
        <p className="text-muted mb-3">
          Your account is currently under review. You will be notified once it is approved.
        </p>
        <button className="btn btn-danger w-100">Contact Support</button>
      </div>
    </div></>
  );
};

export default AccountNotApproved;
