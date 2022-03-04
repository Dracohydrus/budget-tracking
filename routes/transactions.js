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
    const { email, cat: catName } = req.query;

    let transaction = {};
    if (email) {
        transaction.email = email;
    }
    if (catName) {
        transaction["categories.name"] = {
            $in: [catName]
        }
    }
    Transaction.find(transaction)
        .then((trans) => res.status(200).json(trans))
        .catch((err) => res.status(404).json(err))
});

//CREATE
router.post('/', async (req, res) => {
    const { data = [] } = req.body;
    if (data.length === 0) return res.status(500).json("No data passed in for transactions")
    Transaction.insertMany(data)
        .then((trans) => res.status(200).json(trans))
        .catch((err) => res.status(500).json(data))
});

//DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    Transaction.findByIdAndDelete(id)
        .then((transaction) => res.status(200).json("Record deleted"))
        .catch((err) => res.status(500).json(err))
})

module.exports = router;