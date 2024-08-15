const express = require('express');
const { verifyToken } = require('../utils/verifyUser.js');
const { create, getposts, deletepost, updatepost } = require('../controllers/post.controller.js'); // Added missing imports

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);

module.exports = router;
