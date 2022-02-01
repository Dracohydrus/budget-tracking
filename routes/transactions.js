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
    const { email, cat:catName } = req.query;

    let transaction;
    if(email) {
        transaction = Transaction.find({email})
    } else if(catName) {
        transaction = Transaction.find({
            "categories.name": {
                $in: [catName]
            }
        })
    } else {
        transaction = Transaction.find();
    }
    transaction
    .then((trans) => res.status(200).json(trans))
    .catch((err) => res.status(404).json(err))
});

//CREATE
router.post('/', async (req, res) => {
    const { email, value, currency, description='', transactionDate, categories } = req.body;
    const newTransaction = new Transaction({
        email,
        value,
        currency,
        description,
        transactionDate,
        categories
    })
    newTransaction.save()
    .then((trans) => res.status(200).json(trans))
    .catch((err) => res.status(500).json(err))
});

module.exports = router;