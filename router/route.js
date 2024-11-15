
const express = require('express')
const router = express.Router()
const env =  require('dotenv').config()
const generateToken = require('../middleware/token')
const { default: axios } = require('axios');

router.get('/stkpush/home', (req, res)=>{
    res.status(200).render('../user/home')
})


router.post('/stkpush', generateToken, async (req, res) => {
    const phone = req.body.phone ? req.body.phone.substring(1) : null;
    const amount = req.body.amount;

    console.log(phone && amount);
    

    if (!phone || !amount) {
        return res.status(400).json({ message: "Phone number and amount are required" });
    }

    const date = new Date();
    const Timestamp = date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const shortcode = process.env.SHORT_CODE;
    const passkey = process.env.PASS_KEY;
    const password = Buffer.from(shortcode + passkey + Timestamp).toString("base64");
    
    const token = req.token

    try {
        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: Timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: `254${phone}`,
                PartyB: shortcode,
                PhoneNumber: `254${phone}`,
                CallBackURL: "https://mydomain.com/pat",
                AccountReference: `254${phone}`,
                TransactionDesc: "Test"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        res.status(200).json(response.data);
    } catch (err) {
        console.error("Full error:", err.response ? err.response.data : err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router