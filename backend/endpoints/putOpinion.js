//putOpinion.js
const express = require('express');
const Coin = require('../models/CoinSchema');

const router = express.Router();

router.put('/api/editOpinion/:coinId/:reviewId', (req, res) => {
    const { coinId, reviewId } = req.params;
    const { user, text, rating } = req.body;
  
    Coin.findById(coinId)
      .then(coin => {
        if (!coin) {
          return res.status(404).send();
        }
  
        const review = coin.reviews.id(reviewId);
        if (!review) {
          return res.status(404).send();
        }
  
        if (user) review.user = user;
        if (text) review.text = text;
        if (rating) review.rating = rating;
  
        return coin.save();
      })
      .then(coin => res.send(coin))
      .catch(error => res.status(500).send(error));
  });


module.exports = router;