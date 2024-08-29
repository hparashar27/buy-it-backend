require('dotenv').config();

const jwt = require('jsonwebtoken');
const SECRET_KEY = "3d6f647f23e560c3b9c9a7896a2f2b3b5f702fbc08b22c6f80a1c8aab065ae68";

const generateJwtToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '48h' });
  return token;
};

const getUserIdByToken = (token) => {
  try {
    console.log('Verifying token:', token);
    let decodedToken = jwt.verify(token,SECRET_KEY);
    console.log('Decoded token:', decodedToken);
    return decodedToken.userId;
  } catch (error) {
    console.error('Token verification error:', error.message);
    throw new Error('Invalid or expired token');
  }
};


module.exports = { generateJwtToken, getUserIdByToken };
