// const { default: User } = require("../models/user.model.js");
const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs')


const signup = async(req, res) => {
    const {username, email, password} = req.body;

    if(!username || 
        !email ||
        !password || 
        username === '' || 
        email === ''|| 
        password === '')
        {
        return res.status(400).json({message: "All fields are requires"});
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashPassword
    });

    try{
        await newUser.save();
        res.json("Signup succesful")

    }catch(error){
        res.status(500).json({message: error.message});

    }


}

module.exports = { signup };