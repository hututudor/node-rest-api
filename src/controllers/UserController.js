const Yup = require('yup');

const { User } = require('../models');
const { validate, Hash, message } = require('../utils');

const UserController = {
  register: async (req, res) => {
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

    res.send({ user, jwt });
  }
};

module.exports = UserController;
