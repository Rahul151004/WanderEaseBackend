const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        const existingUser = await User.findOne({ email });
        
        if(existingUser){
            return res.status(400).json({ error : "User already exists" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(200).json({ message : "New User created successfully" });
    } catch (err){
        res.status(500).json({ error : "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user || password !== user.password){
            res.status(401).json({ error : 'Invalid credentials' });
        }

        const jwtToken = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '2h'});

        res.json({ isLogin : true, jwtToken });

    }catch (err){
        res.status(500).json({ error : 'Internal Server Error' });
    }
};