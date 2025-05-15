import React, { useEffect } from 'react';
import Sidebar from './sidebar';
import './addcategory.css';
import axios from 'axios';

const AddPlan = () => {
  const getCoordinatesFromPincode = async (pincode) => {
    const apiKey = '0c4835f9b7b34a1b895d8a15e8e9691c';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.results && response.data.results.length > 0) {
        const location = response.data.results[0];
        const { lat, lng } = location.geometry;
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
        return {
          type: 'Point',
          coordinates: [lng, lat],
        };
      } else {
        throw new Error('No results found for this pincode.');
      }
    } catch (error) {
      console.error('Geocoding Error:', error);
    }
  };

  useEffect(() => {
    getCoordinatesFromPincode('600017').then((coordinates) => {
      console.log('Coordinates:', coordinates);
    });
  }, []);

  return (
    <div>
      <Sidebar />
      <h2>Add Plan</h2>
    </div>
  );
};

export default AddPlan;
