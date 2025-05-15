import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './components/index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SignUp from './components/signup_component';
import Login from './components/login_component';
import UserDetails from './components/userDetails';
import AllEnquiryCustomer from './components/AllEnquiry';
import Logout from './components/logout';
import vendorLogout from './Vendors/logout';
import TextEditor from './components/TextEditor';
import CurrencyConverter from './components/Geolocation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './SuperAdmin/sidebar.css';
import './Vendors/vendorsidebar.css';
import './Vendors/login.css';
import './Vendors/table.css';
import SuperAdmin from './SuperAdmin/Login';
import Sidebar from './SuperAdmin/sidebar';  // Corrected path
import AddCategory from './SuperAdmin/AddCategory';
import AllCategory from './SuperAdmin/AllCategory';
import AllUser from './SuperAdmin/Alluser';
import AddPlan from './SuperAdmin/AddPlan';
import Plandetails from './SuperAdmin/Plandetails';
import UpdatePlan from "./SuperAdmin/EditPlanSuperAdmin";
import MainCategory from './SuperAdmin/AddMainCategory';
import AddSlider from './SuperAdmin/AddSilder';
import AddBanner from './SuperAdmin/AddBanner';
import AllSlider  from './SuperAdmin/AllSlider';
import UpdateSlider from './SuperAdmin/UpdateSlider';
import AllBannerSuperAdmin from './SuperAdmin/AllBanner';
import UpdateBanner from './SuperAdmin/UpdateBanner';
import AddMainService from './SuperAdmin/AddMainService';
import AllMainService from './SuperAdmin/AllService';
import AddProductAdmin from './SuperAdmin/AddProductAdmin';
import AllVendor from './SuperAdmin/AllVendors';
import ViewVendor from './SuperAdmin/ViewVendor';
import VendorBusiness from './SuperAdmin/VendorBusiness';
import VendorCategory from './SuperAdmin/VendorCategory';
import AdminDashboard from './SuperAdmin/AdminDashboard';
import UpdateSubCategory from './SuperAdmin/UpdateSubcategory';

import UpdateCategorySuperAdmin from './SuperAdmin/UpdateCategory';
import AllProductSuperAdmin from './SuperAdmin/AllProduct';
import AddvendorBulk from './SuperAdmin/AddvendorBulk';

import VendorLogin from './Vendors/VendorLogin';
import VendorSignup from './Vendors/VendorSignup';
import BusinessDetails  from './Vendors/BusinessDetails';
import AddCategoryVendor from './Vendors/addCategory';
import AllCategoryVendor from './Vendors/AllCategory';
import Vendorsidebar from './Vendors/Vendorsidebar ';
import AddProductVendor from './Vendors/Addproduct';
import AllProductVendor from './Vendors/Allproducts';
import UpdateProductVendor from './Vendors/UpdateProduct';
import UpdateCategoryVendor from './Vendors/UpdateCategory';
import VendorDashboard from './Vendors/Dashboard';
import EditProfileVendor from './Vendors/EditProfile';
import ImageSlider from './components/ImageSlider';
import VendorAllEnquiry from './SuperAdmin/VendorEnquiry';
import AllEnquiry from './Vendors/AllEnquiry';
import AddSubCategoryAdmin from './SuperAdmin/AddSubCategoryAdmin';
import AllSubcategory from './SuperAdmin/AllSubCategory';
import AllEnquiryAdmin from './SuperAdmin/AllEnquiry';
import AddCustomer from './SuperAdmin/AddCustomerAdmin';
import UpdateBuyer from './SuperAdmin/UpdateBuyer';

import OnboardedVendors from './SuperAdmin/OnboardedVendors';
import AddVendor from './SuperAdmin/AddVendor';
import EditVendor from './SuperAdmin/EditVendor';
import ViewEnquiry from './SuperAdmin/ViewEnquiry';

import SearchResult from './SuperAdmin/SearchResult';
import ExpiredVendors from './SuperAdmin/ExpiredVendors';
import ForgetPassword from './Vendors/ForgetPassword';
import ResetPassword from './Vendors/ResetPassword';
import VendorSelectPlan from './Vendors/PlanDetails';
import UserProfile from './Vendors/UserProfile';
import VendorHeader from './Vendors/vendorHeader';

import SelectBusiness from './Vendors/Business';
import AddService from './Vendors/AddService';
import AllService from './Vendors/AllService';
import BusinessProfile from './Vendors/BusinessProfile';
import AddProductVendor2 from './Vendors/AddProductVendor';
import MyOrders from './Vendors/MyOrders';
import WebsitePage from './Vendors/websitepage';
import HomePageForm from './Vendors/Homepage';
import AboutPageForm from './Vendors/aboutpage';
import VendorWebAbout from './Vendors/about';
import VendorWebProduct from './Vendors/AllProductWeb';
import VendorWebContact from './Vendors/contact';

import CategoryView from './components/CategoryView';

import EditProfile  from './components/EditProfile';

import ProductView from './components/ProductView';
import Shopping from './components/Shopping';
import UserDashboard from './components/UserDashboard';
import ServiceView from './components/ServiceView';
import  VendorWebsite from './Vendors/Index';
import LeadForm from './components/leadForm';
import AccountNotApproved from './Vendors/notApproved';

function App() {
  const isLoggedIn = window.localStorage.getItem('loggedIn');

  return (
    <Router>
      <div className="App">
        {/* Navbar is included on all pages */}
      
        {/* Define application routes */}
        <Routes>
          {/* Default route based on login status */}
          
          {/* <Route path="/" element={isLoggedIn === 'true' ? <UserDetails /> : <Login />} /> */}
          <Route path="/CurrencyConverter" element={< CurrencyConverter  />} /> 
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          {/* Signup route */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/vendor/logout" element={<vendorLogout />} />
          <Route path="/TextEditor" element={<TextEditor />} />
          
          {/* User Details route */}
          <Route path="/userDetails" element={<UserDetails />} />
          {/* SuperAdmin route */}
          <Route path="/" element={<SuperAdmin />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/SuperAdmin/AddCategory" element={<AddCategory />} />
          <Route path="/SuperAdmin/AllCategories" element={< AllCategory />} />
          <Route path="/SuperAdmin/AllUser" element={< AllUser />} />
          <Route path="/SuperAdmin/AddPlan" element={<   AddPlan />} />
          <Route path="/SuperAdmin/Plandetails" element={< Plandetails/>} />
          <Route path="/SuperAdmin/EditPlan/:planId" element={<UpdatePlan />} />
          <Route path="/SuperAdmin/Plandetails" element={< Plandetails/>} />
          <Route path="/SuperAdmin/MainCategory" element={< MainCategory/>} />
          <Route path="/SuperAdmin/AddSlider" element={< AddSlider/>} />
          <Route path="/SuperAdmin/AddBanner" element={< AddBanner/>} />
          <Route path="/SuperAdmin/AllSlider" element={< AllSlider/>} />
          <Route path="/SuperAdmin/UpdateSlider/:id" element={< UpdateSlider/>} />
          <Route path="/SuperAdmin/AllBanner" element={< AllBannerSuperAdmin/>} />
          <Route path="/AllVendor" element={< AllVendor/>} />
          <Route path="/AddVendor" element={< AddVendor/>} />
          <Route path="/EditVendor/:vendorId" element={< EditVendor/>} />
          <Route path='/ViewEnquiry/:id' element={<ViewEnquiry />} />
             <Route path="/SuperAdmin/AddMainService" element={< AddMainService/>} />
             <Route path="/SuperAdmin/AllService" element={< AllMainService/>} />
             <Route path="/SuperAdmin/AddProductAdmin" element={< AddProductAdmin/>} />
             <Route path="/SuperAdmin/VendorCategory/:id" element={<  VendorCategory />} />
             <Route path="/SuperAdmin/VendorEnquiry/:id" element={< VendorAllEnquiry/>} />
          <Route path="/SuperAdmin/UpdateBanner/:id" element={< UpdateBanner/>} />
          <Route path="/SuperAdmin/AddSubCategoryAdmin" element={< AddSubCategoryAdmin/>} />
          <Route path='/UpdatesubCategory/:id' element={<UpdateSubCategory/>} />
          <Route path='/UpdateBuyer/:id' element={<UpdateBuyer/>} />
          
          <Route path="/ViewVendor/:vendorId" element={< ViewVendor/>} />
          
          <Route path="/SuperAdmin/VendorBusiness/:id" element={< VendorBusiness/>} />
          <Route path="/Dashboard" element={< AdminDashboard />} />

          <Route path="/SuperAdmin/UpdateCategory/:id" element={< UpdateCategorySuperAdmin/>} />
          <Route path="/SuperAdmin/AllProduct" element={< AllProductSuperAdmin />} />
          <Route path="/SuperAdmin/AllSubcategory" element={< AllSubcategory />} />
          <Route path="/SuperAdmin/AddvendorBulk" element={<  AddvendorBulk />} />
          <Route path="/SuperAdmin/AllEnquiry" element={<  AllEnquiryAdmin />} />
          <Route path="/SuperAdmin/AddCustomer" element={<  AddCustomer />} />
          <Route path="/OnboardedVendors" element={<  OnboardedVendors />} />
          <Route path="/ExpiredVendors" element={<  ExpiredVendors />} />
          <Route path="/SearchResult" element={< SearchResult />} />
          <Route path="/AddVendor" element={< AddVendor />} />
          <Route path="/Vendor/Login" element={< VendorLogin />} />
          <Route path="/Vendor/Signup" element={< VendorSignup />} />
          <Route path="/ForgetPassword" element={< ForgetPassword />} />
          <Route path="/reset-password/:token" element={< ResetPassword />} />
          <Route path="/Vendor/AccountNotApproved" element={< AccountNotApproved />} />
          <Route path="/Vendor/businessDetails" element={< BusinessDetails />} />
          <Route path="/Vendor/sidebar" element={< Vendorsidebar />} />
          <Route path="/Vendor/AddCategory" element={< AddCategoryVendor />} />
          <Route path="/Vendor/AllCategory" element={< AllCategoryVendor />} />
          <Route path="/Vendor/UpdateCategory/:id" element={< UpdateCategoryVendor/>} />
        
          <Route path="/Vendor/Addproduct" element={< AddProductVendor />} /> 
          <Route path="/Vendor/AllProduct" element={< AllProductVendor />} />
          <Route path="/Vendor/UpdateProduct/:id" element={<UpdateProductVendor />} />
          <Route path="/Vendor/Dashboard" element={< VendorDashboard />} />
          <Route path="/Vendor/EditProfile" element={<  EditProfileVendor />} />
          <Route path="/Vendor/AllEnquiryVendor" element={<  AllEnquiry  />} />
          <Route path="/Vendor/VendorSelectPlan" element={<   VendorSelectPlan  />} />
          <Route path="/Vendor/SelectBusiness" element={<   SelectBusiness  />} />
          <Route path="/Vendor/AddService" element={<   AddService  />} />
          <Route path="/Vendor/AllService" element={<   AllService  />} />
          <Route path="/Vendor/UserProfile" element={<   UserProfile  />} />
          <Route path="/Vendor/VendorHeader" element={<   VendorHeader  />} />
          <Route path="/Vendor/BusinessProfile" element={<  BusinessProfile />} />
          <Route path="/Vendor/AddProductVendor" element={<  AddProductVendor2 />} />
          <Route path="/Vendor/MyOrders" element={<  MyOrders />} />
          
          
          <Route path="/Vendor/Websitepage" element={<  WebsitePage />} />
         
          <Route path="/Vendor/Homepage" element={<  HomePageForm />} />
          <Route path="/Vendor/AboutPage" element={< AboutPageForm />} />
          
        
          
          
          <Route path="/AllEnquiry" element={<  AllEnquiryCustomer />} />
          <Route path="/Shopping" element={<  Shopping />} />
          <Route path="/EditProfile" element={<  EditProfile />} />
          <Route path="/ImageSlider" element={<  ImageSlider />} />
          <Route path="/CategoryView/:category" element={< CategoryView/>} />
        
          <Route path="/ServiceView/:service" element={<ServiceView />} />

          <Route path="/ProductView/:id" element={<  ProductView/>} />

          <Route path="/UserDashboard/" element={< UserDashboard />}/>
         
          <Route path="/:businessName" element={<  VendorWebsite />} />
          <Route path="/:businessName/about" element={< VendorWebAbout />} />
          <Route path="/:businessName/product" element={<  VendorWebProduct />} />
          <Route path="/:businessName/contact" element={<   VendorWebContact />} />
          <Route path="/leadform" element={<   LeadForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
