const { default: axios } = require('axios');
const express = require('express');
const env = require('dotenv').config();

const consumer_key = process.env.CONSUMER_KEY;
const secret_key = process.env.SECRET_KEY;

console.log({
  consumer_key,
  secret_key
})


// Authorization header using base64 encoding
const auth = Buffer.from(`${consumer_key}:${secret_key}`).toString('base64');

const generateToken = async (req, res, next) => {

  try {
    const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${auth}`
      },
      
    });

    // Extract token from response data
    const token = response.data.access_token;
    console.log('Generated Token:', token);
    

    req.token = token 
    console.log("passing to the next middleware");

    next();

  }catch (err) {
    if (err.response) {
      // Response was received but with an error status code
      console.error('Error response from API:', err.response.data);
      res.status(err.response.status).json({ message: err.response.data });
    } else if (err.request) {
      // No response was received
      console.error('No response received:', err.request);
      res.status(500).json({ message: 'No response from Safaricom API' });
    } else {
      // Some other error occurred during setup
      console.error('Request setup error:', err.message);
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = generateToken;
