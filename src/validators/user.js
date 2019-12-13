const { body } = require('express-validator/check');

module.exports = {
  register: [
    body('name').exists(),
    body('email')
      .exists()
      .isEmail()
      .withMessage('Email needs to be a valid email address'),
    body('password')
      .exists()
      .isLength({ min: 6 })
      .withMessage('Password must have at least 6 characters')
  ],
  login: [body('email').exists(), body('password').exists()]
};
