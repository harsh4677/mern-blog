const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js')

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Mongodb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json()); // To parse JSON bodies

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

