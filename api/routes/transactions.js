const router = require('express').Router();
const Transaction = require('../models/Transaction');

//GET
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    Transaction.findById(id)
    .then((transaction) => res.status(200).json(transaction))
    .catch((err) => res.status(404).json("Transaction not found"))
});

//GET ALL TRANSACTIONS
router.get('/', async (req, res) => {
    try {
        const trans = await Transaction.find({})
        console.log(trans)
        res.status(200).json(trans)
    } catch(err) {
        res.status(404).json("No Transactions found")
    } 
    // Transaction.find({})
    // .then((trans) => res.status(200).json(trans))
    // .catch((err) => res.status(404).json(err))
});

router.post('/', async (req, res) => {
    const { email, value, currency, description='' } = res.body;
    const newTransaction = new Transaction({
        email,
        value,
        currency,
        description
    })
    const trans = await newTransaction.save();
    res.status(200).json(trans)
});

module.exports = router;