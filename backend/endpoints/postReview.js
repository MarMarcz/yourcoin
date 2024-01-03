// postReview.js
const express = require('express');
const Coin = require('../models/CoinSchema');

const router = express.Router();

router.post('/api/addReview', async (req, res) => {
  const { user, text, rating, coinId } = req.body;

  try {
    const coin = await Coin.findById(coinId);
    coin.reviews.push({ user, text, rating });
    await coin.save();

    res.status(201).json(coin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;