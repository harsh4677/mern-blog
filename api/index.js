// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/user.route.js')
// const authRoutes = require('./routes/auth.route.js');
// const postRoutes = require('./routes/post.route.js');
// const commentRoutes = require('./routes/comment.route.js'); // Ensure you import this route
// const cookieParser = require('cookie-parser');

// dotenv.config();

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log('MongoDB is connected');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// // Define your routes
// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes); // Added the commentRoutes

// // Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}!`);
// });


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js'); // No need to destructure router here
const authRoutes = require('./routes/auth.route.js');
const postRoutes = require('./routes/post.route.js');
const commentRoutes = require('./routes/comment.route.js');
const cookieParser = require('cookie-parser');

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

// Define your routes
app.use('/api/user', userRoutes); // Use userRoutes directly
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
