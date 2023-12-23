// endpoints/getCoin.js
const express = require('express');
const databaseConnection = require('../database/ConnectToDatabase');
const Coin = require('../models/CoinSchema');
const router = express.Router();
const db = databaseConnection();

router.get('/api/coins/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const coin = await Coin.findOne({ title: title });
        if (coin) {
            res.json(coin);
        } else {
            res.status(404).send('Coin not found');
        }
    } catch (error) {
        console.error('Error fetching coin:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;