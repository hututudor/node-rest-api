const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('x-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const user_id = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(user_id._id);

    if (user) {
      req.user = user;
    } else {
      return res.status(400).send({ message: 'Invalid token' });
    }

    next();
  } catch (ex) {
    return res.status(400).send({ message: 'Invalid token' });
  }
};
