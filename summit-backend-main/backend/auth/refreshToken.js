const jwt = require("jsonwebtoken");
require("dotenv").config()


// Route to refresh the access token using the refresh token
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token provided" });
    }

    try {
        // Verify the refresh token
        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired refresh token" });
            }

            // get data fromthe dcoded
            req.admin = decoded
     
            // Generate a new access token
            const newAccessToken = jwt.sign(
                { id: decoded.id, email: decoded.email, roles: "superAdmin" },
                process.env.JWT_SECRET,
                { expiresIn: "1h" } // New access token valid for 1 hour
            );

            return res.status(200).json({ newAccessToken,admin:decoded });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = refreshToken