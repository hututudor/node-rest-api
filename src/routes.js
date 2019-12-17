const express = require('express');
const { UserController } = require('./controllers');
const { auth } = require('./middlewares');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('App is running!');
});

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', auth, UserController.me);

module.exports = router;
