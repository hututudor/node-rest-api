const { validationResult } = require('express-validator/check');

const middleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed', errors: errors.array() });
  }
  next();
};

module.exports = middleware;
