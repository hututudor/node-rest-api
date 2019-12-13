const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log(`Error connecting to the database: ${err}`));

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running');
});

app.use('/users', userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
