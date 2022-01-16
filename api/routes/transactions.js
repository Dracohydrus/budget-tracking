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
    const { email, categories } = req.query;
    let transactions;
    if(email) {
        transactions = await Transaction.find({email})
    } else if(categories) {
        transactions = await Transaction.find({
            categories: {
                $in: [categories]
            }
        })
    } else {
        transactions = await Transaction.find();
    }
    if(transactions) {
        res.status(200).json(transactions);
    } else {
        res.status(404).json("No transactions found.");
    }
});

module.exports = router;