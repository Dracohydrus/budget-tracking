const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { response } = require('express');

//REGISTER
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, currency='CAD' } = req.body; 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username, 
            email,
            password: hashedPassword,
            currency
        })

        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const errorMessage = "Wrong credientials!";
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        !user && res.status(400).json(errorMessage);

        const { password: userPassword } = user;
        const validated = await bcrypt.compare(password, userPassword);

        if(validated) {
            const { password, ...parsedUser } = user._doc;
            res.status(200).json(parsedUser);
        } else {
            res.status(400).json(errorMessage);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;