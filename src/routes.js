const express = require('express');
const { UserController } = require('./controllers');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('App is running!');
});

router.post('/register', UserController.register);

module.exports = router;
