// endpoints/getOpinion.js
const express = require('express');
const cors = require('cors'); // must have to have access to the API
const databaseConnection = require('../database/ConnectToDatabase');
const Coin = require('../models/CoinSchema');
const router = express.Router();
const db = databaseConnection();

router.use(cors()); // dont forget to use cors in other endpoints

router.get('/api/opinions/:coinId', async (req, res) => {
    const coinId = req.params.coinId;
  
    try {
      const coin = await Coin.findById(coinId);
      if (!coin) {
        return res.status(404).json({ message: 'Coin not found' });
      }
  
      res.json(coin.opinions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;