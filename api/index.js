const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const transactionRoute = require('./routes/transactions');

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL) 
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err))

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/transaction', transactionRoute);

const PORT = process.env.PORT || '9000';
app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT}`);
});