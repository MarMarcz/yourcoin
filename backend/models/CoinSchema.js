// models/CoinSchema.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: String,
    text: String,
    rating: Number,
});

const coinSchema = new mongoose.Schema({
    title: String,
    image: String,
    prizeWithoutShipping: Number,
    prizeWithShipping: Number,
    shortDescription: String,
    quantityInStock: Number,
    material: String,
    extendedDescription: String,
    averageRating: Number,
    reviews: [reviewSchema],
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
