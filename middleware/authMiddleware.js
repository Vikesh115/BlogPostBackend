const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debugging
    req.user = decoded.userId; // Attach user ID to the request object
    next();
  } catch (err) {
    console.error('Token verification error:', err.message); // Debugging
    res.status(401).json({ message: 'Token is not valid' });
  }
};


module.exports = authMiddleware;
