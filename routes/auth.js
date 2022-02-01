const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { response } = require('express');

//REGISTER
router.post('/register', async (req, res) => {
    const { username, email, password, currency = 'CAD' } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        currency
    })

    newUser.save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err))
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const errorMessage = "Wrong credientials!";
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    
        if(!user) return res.status(400).json(errorMessage);
    
        const { password: userPassword } = user;
        const validated = await bcrypt.compare(password, userPassword);
    
        if(!validated) return res.status(400).json(errorMessage);
    
        const { password:parsedPassword, ...parsedUser } = user._doc;
        return res.status(200).json(parsedUser);
    } catch(err) {
        return res.status(500).json(err);
    }
});

module.exports = router;