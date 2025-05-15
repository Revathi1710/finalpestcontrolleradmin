import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import './addcategory.css';
import '../Vendors/dashboard.css';
import AcceptRejectGraph from "./acceptRejectGraph";
import EnquiryGraph from "./EnquiryGraph";

const AlldetailsVendor = () => {
  const [productCount, setProductCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [activeVendorCount, setActiveVendorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [enquiryCount, setEnquiryCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const productResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getProductcount`);
        if (productResponse.data.status === 'ok') {
          setProductCount(productResponse.data.data.productCount);
        }

        const vendorResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getVendorcount`);
        if (vendorResponse.data.status === 'ok') {
          setVendorCount(vendorResponse.data.data.vendorCount);
        }

        const onboardingResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getOnboardingcount`);
        if (onboardingResponse.data.status === 'ok') {
          setActiveVendorCount(onboardingResponse.data.data.activeVendors);
        }

        const userResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getUsercount`);
        if (userResponse.data.status === 'ok') {
          setUserCount(userResponse.data.data.userCount);
        }

        const enquiryResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getEnquiryClickcount`);
        if (enquiryResponse.data.status === 'ok') {
          setEnquiryCount(enquiryResponse.data.data.enquiryCount);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="add-category-container">
        <section className="fullpage">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-3 vendorlist">
                <div className="alldetails">
                  <div className="total">Total Vendors</div>
                  <div className="count">{vendorCount}</div>
                </div>
              </div>

              <div className="col-lg-3 categorylist">
                <div className="alldetails">
                  <div className="total">Active  Vendors</div>
                  <div className="count">{activeVendorCount}</div>
                </div>
              </div>

              <div className="col-lg-3 productlist">
                <div className="alldetails">
                  <div className="total">Total Users</div>
                  <div className="count">{userCount}</div>
                </div>
              </div>

              <div className="col-lg-3 enquirylist mt-3">
                <div className="alldetails">
                  <div className="total">Total Enquiry Clicks</div>
                  <div className="count">{enquiryCount}</div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h4>Customer Accept and Reject Overview</h4>
              <AcceptRejectGraph />
            </div>

            <div className="mt-5">
              <EnquiryGraph />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlldetailsVendor;
