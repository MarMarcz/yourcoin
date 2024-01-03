const express = require('express');
const Coin = require('../models/CoinSchema');

const router = express.Router();

router.delete('/api/deleteOpinion/:coinId/:reviewId', (req, res) => {
    const { coinId, reviewId } = req.params;
  
    Coin.findByIdAndUpdate(
      coinId,
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    )
      .then(coin => {
        if (!coin) {
          return res.status(404).send();
        }
        res.send(coin);
      })
      .catch(error => res.status(500).send(error));
  });

  module.exports = router;