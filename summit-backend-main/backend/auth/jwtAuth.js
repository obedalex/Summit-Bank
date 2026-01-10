const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthMiddleware = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied, no token provided" });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.split(" ")[1];
  
    try {
        // Verify token
        // the decoded token contains the data pass to the sign token(i.e admin_id,admin.email)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded data to request
        next(); // Proceed to next middleware
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = AuthMiddleware;