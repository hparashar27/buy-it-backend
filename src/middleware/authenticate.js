const jwtProvider = require("../config/jwtProvider.js"); 
const userService = require("../services/user.service.js");

const authenticate = async (req, res, next) => {
    try {
        // Extract Bearer token from the header
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(404).send({ error: "Token not found..." });
        }

        // Get user ID from the token
        const userId = jwtProvider.getUserIdByToken(token);

        // Find the user by ID
        const user = await userService.findUserById(userId);

        if (!user) {
            return res.status(404).send({ error: "User not found..." });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Handle errors
        return res.status(500).send({ error: error.message });
    }
};

module.exports = authenticate;
