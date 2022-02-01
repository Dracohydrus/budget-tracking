const router = require('express').Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcrypt');

//GET
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    User.findById(id)
    .then((user) => {
        const { password, ...parsedUser } = user._doc;
        res.status(200).json(parsedUser);
    })
    .catch((err) => res.status(404).json("User not found."))
});

//UPDATE
router.put('/:id', async (req, res) => {
    const { userId, password, username, email } = req.body;
    const { id } = req.params;
    if(userId === id) {
        let newUser = {}
        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            hashedPassword && (newUser.password = hashedPassword);
        }

        if(username) {
            newUser.username = username;
        }

        if(email) {
            newUser.email = email;
        }

        User.findByIdAndUpdate(id, {
            $set: newUser,
        }, {new:true})
        .then((updatedUser) => {
            const {password, ...rest} = updatedUser._doc;
            return res.status(200).json(rest);
        })
        .catch((err) => res.status(404).json("User not found."))
    } else {
        res.status(401).json("You can only updated your own account.");
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    if(userId === id) {
        const { username } = await User.findById(id);
        Transaction.deleteMany({ username })
        User.findByIdAndDelete(id)
        .then(res.status(200).json("User has been deleted."))
        .catch((err) => res.status(404).json("User not found."))
    } else {
        res.status(401).json("You can only delete your own account.");
    }
})

module.exports = router;