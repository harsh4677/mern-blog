const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save();
        res.json("Signup successful");
    } catch (error) {
        next(error);
    }
};

module.exports = { signup };
