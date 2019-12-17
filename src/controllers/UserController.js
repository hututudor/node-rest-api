const Yup = require('yup');

const { User } = require('../models');
const { validate, Hash, message } = require('../utils');

class UserController {
  async register(req, res) {
    await validate(res, req.body, {
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });

    if (await User.existsWithEmail(req.body.email)) {
      return res.status(400).send(message('Email is already in use'));
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = await Hash.make(req.body.password);
    await user.save();

    const jwt = user.generateJWT();

    return res.send({ user, jwt });
  }

  async login(req, res) {
    await validate(res, req.body, {
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send(message('Email or password is incorrect'));

    const validPassword = await Hash.verify(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).send(message('Email or password is incorrect'));

    const jwt = user.generateJWT();

    return res.send({ user, jwt });
  }

  async me(req, res) {
    return res.send({
      user: req.user
    });
  }
}

module.exports = new UserController();
