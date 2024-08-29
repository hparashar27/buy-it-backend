require('dotenv').config();
const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_0QsjPRzdrtGDGF",
  key_secret: "7WmUYIiZyypWH2PUVMchXNjX",
});

module.exports = razorpayInstance;
