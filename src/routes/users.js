const express = require('express');
const uuid = require('uuid/v4');
const validators = require('../validators');
const validate = require('../middlewares/validate');
const message = require('../utils/message');
const Hash = require('../utils/hash');
const User = require('../models/User');

const router = express.Router();

router.post(
  '/register',
  validators.user.register,
  validate,
  async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(message('Email is already in use'));

    const password = await Hash.make(req.body.password);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password
    });

    await user.save();
    const token = user.generateJWT();

    res.send({
      user,
      token
    });
  }
);

router.post('/login', validators.user.login, validate, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send(message('Email or password is incorrect'));

  const validPassword = await Hash.verify(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send(message('Email or password is incorrect'));

  const token = user.generateJWT();
  res.send({
    user,
    token
  });
});

module.exports = router;
