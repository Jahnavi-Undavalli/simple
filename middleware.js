const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token received:", token); // Log the received token

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error("Token verification error:", err); // Log the error
                return res.status(403).json({ message: "Invalid token" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "No token provided" }); // Unauthorized
    }
};
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming user role is stored in req.user
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};


module.exports = { authenticateJWT, authorizeRole };
