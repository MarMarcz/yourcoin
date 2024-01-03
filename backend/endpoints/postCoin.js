//postCoin.js
const express = require('express');
const Coin = require('../models/CoinSchema');

const router = express.Router();

router.post('/api/addCoin', async (req, res) => {
    const { title, image, prizeWithoutShipping, prizeWithShipping, shortDescription, quantityInStock, material, extendedDescription } = req.body;

    try {
        const newCoin = new Coin({ title, image, prizeWithoutShipping, prizeWithShipping, shortDescription, quantityInStock, material, extendedDescription });
        await newCoin.save();

        res.status(201).json({ message: 'Coin added successfully', coin: newCoin });
    } catch (error) {
        res.status(500).json({ message: 'Error adding coin', error: error.message });
    }
});

module.exports = router;