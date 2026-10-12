const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretKey = process.env.SECRET_KEY;

console.log("Secret Key from .env:", secretKey); // Log the secret key to verify it's being read correctly

const authMiddleware = async (req, res, next) => {
    try {
        console.log("Secret Key from .env:", secretKey); // Log the secret key to verify it's being read correctly

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send({
                error: 'Authentication token not found'
            });
        }

        const decoded = jwt.verify(token, secretKey);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).send({
                error: 'User not found'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Auth error:", error.message);

        res.status(401).send({
            error: 'Unauthorized access'
        });
    }
};

module.exports = {authMiddleware};