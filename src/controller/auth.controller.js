const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateJwtToken(user._id);
    return res.status(200).send({ jwt, message: "Registration successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(404).send({ message: "User not found by email: " + email });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const jwt = jwtProvider.generateJwtToken(user._id);
    return res.status(200).send({ jwt, message: "Login successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { login, register };
