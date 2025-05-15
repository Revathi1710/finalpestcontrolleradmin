import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const AcceptRejectGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/vendor-stats`);
      console.log("API Response:", response.data);

      if (!response.data || !Array.isArray(response.data.data)) {
        console.error("Invalid API response:", response.data);
        setData([]);
        return;
      }

      setData(response.data.data); // Correctly setting data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="approved" fill="green" name="Approved" />
        <Bar dataKey="rejected" fill="red" name="Rejected" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AcceptRejectGraph;
