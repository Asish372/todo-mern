const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    console.log('Token decoded:', decoded);
    
    // Make sure we have a consistent user object with id property
    if (decoded.userId) {
      req.user = { id: decoded.userId };
    } else if (decoded.id) {
      req.user = { id: decoded.id };
    } else {
      req.user = decoded;
    }
    
    console.log('User set in request:', req.user);
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};