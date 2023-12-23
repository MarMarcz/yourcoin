// endpoints/getCoins.js
const express = require('express');
const databaseConnection = require('../database/ConnectToDatabase');
const Coin = require('../models/CoinSchema');
const router = express.Router();
const db = databaseConnection();

router.get('/api/coins', async (req, res) => {
    try {
        const coins = await Coin.find({});
        res.json(coins);
    } catch (error) {
        console.error('Error fetching coins:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
