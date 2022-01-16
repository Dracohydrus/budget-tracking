const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const transactionRoute = require('./routes/transactions');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL) 
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err))

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/transaction', transactionRoute);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const PORT = process.env.PORT || '9000';
app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT}`);
});