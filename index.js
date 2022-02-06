const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const transactionRoute = require('./routes/transactions');
const categoryRoute = require('./routes/categories');

require('dotenv').config();
var env = process.env.NODE_ENV || 'development';
if(env === 'development') {
    console.log('we are in development')
} else {
    console.log('we are in production')
}

app.use(express.json());

mongoose.connect(process.env.MONGO_URL) 
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err))

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/transaction', transactionRoute);
app.use('/api/category', categoryRoute);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const PORT = process.env.PORT || '9000';
app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT}`);
});