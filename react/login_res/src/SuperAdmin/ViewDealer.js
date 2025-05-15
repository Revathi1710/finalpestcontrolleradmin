import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


import Sidebar from './sidebar'; 
import '../Vendors/UserProfile.css';
import './Vendorview.css';

const ViewDealer = () => {
    const { id } = useParams();
    return(
<>
<Sidebar/>
</>
    )
}