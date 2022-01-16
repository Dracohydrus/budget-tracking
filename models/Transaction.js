const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    categories: {
        type: Array,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model("Transaction", TransactionSchema);