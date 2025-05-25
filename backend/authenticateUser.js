const jwt = require("jsonwebtoken"); // Correct package name

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Received token:", token); // Log the token

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "81r/UsmP~cK|nq7"); // Replace with your secret key
    console.log("Decoded token:", decoded); // Log the decoded token
    req.userId = decoded._id; // Attach the user ID to the request object
    next();
  } catch (err) {
    console.error("Token verification failed:", err); // Log the error
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authenticateUser; // Export the middleware