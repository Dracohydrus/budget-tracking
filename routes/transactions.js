const router = require('express').Router();
const Transaction = require('../models/Transaction');

//GET
router.get('/:ids', async (req, res) => {
    const { ids } = req.params;
    if (!ids) return res.status(500).json('ID is a required parameter')
    let idArray = ids.split(',')
    if (!idArray || idArray.length === 0) return res.status(500).json('No transaction IDs to get')
    Transaction.find({
        _id: {
            $in: idArray
        }
    })
        .then(transaction => res.status(200).json(transaction))
        .catch(err => res.status(500).json(err))
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
router.delete('/:ids', async (req, res) => {
    const { ids } = req.params;
    if (!ids) return res.status(500).json('ID is a required parameter')
    let idArray = ids.split(',')
    Transaction.deleteMany({
        _id: {
            $in: idArray
        }
    })
        .then(transaction => res.status(200).json(transaction))
        .catch(err => res.status(500).json(err))
})

//UPDATE
router.put('/', async (req, res) => {
    const { id, description, value, currency, transactionDate, categories } = req.body;
    var newTransaction = {
        description,
        value,
        currency,
        transactionDate,
        categories
    };

    Transaction.findByIdAndUpdate(id, {
        $set: newTransaction
    }, { new: true })
        .then(newRecord => res.status(200).json(newRecord._doc))
        .catch(err => res.status(500).json(err))
})

module.exports = router;