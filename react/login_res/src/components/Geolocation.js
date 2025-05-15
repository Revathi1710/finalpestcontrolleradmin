import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
    const [currency, setCurrency] = useState("USD"); // Default currency

    useEffect(() => {
        // Get user's location on component mount
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    const success = (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "0c4835f9b7b34a1b895d8a15e8e9691c"; // Replace with your OpenCage API Key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const country = data.results[0].components.country;
                    updateCurrency(country);
                }
            })
            .catch(() => alert("Error fetching location data."));
    };

    const error = () => {
        alert("Unable to retrieve your location.");
    };

    const updateCurrency = (country) => {
        const currencyMap = {
            "United States": "USD",
            "India": "INR",
            "United Kingdom": "GBP",
            "Japan": "JPY",
            "Canada": "CAD",
            "Australia": "AUD",
            "Germany": "EUR",
            "France": "EUR",
            "China": "CNY"
        };

        setCurrency(currencyMap[country] || "USD"); // Default to USD if country not found
    };

    return (
        <div>
            <h2>Product Price: <span>100</span> <span>{currency}</span></h2>
        </div>
    );
};

export default CurrencyConverter;
