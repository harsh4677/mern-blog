const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const { create, getposts, deletepost, updatepost } = require('../controllers/post.controller.js'); // Added missing imports

const router = express.Router();

router.post('/create', verifyToken, create); // Ensure 'create' is defined
router.get('/getposts', getposts); // Ensure 'getposts' is defined
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost); // Ensure 'deletepost' is defined
router.put('/updatepost/:postId/:userId', verifyToken, updatepost); // Ensure 'updatepost' is defined


module.exports = router;
