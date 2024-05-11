const express = require('express');
const app = express();
const axios = require('axios');

// Middleware to extract client IP address
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    req.clientIP = ip;
    next();
});

// Route to fetch IP address and location
app.get('/', async (req, res) => {
    try {
        // Get IP address
        const ipResp = await axios.get("https://api.ipify.org/?format=json");
        const ipAddress = ipResp.data.ip;

        // Get location
        const locationResp = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_xVkfvej9Ld6Gh23G3nbb6TT9FwJVy&ipAddress=${ipAddress}`);
        const data = locationResp.data;

        res.json({ AllData: data });
        
    } catch (error) {
        console.error("Error fetching IP address or location:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
