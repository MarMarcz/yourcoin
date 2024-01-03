const express = require('express');
const databaseConnection = require('./database/ConnectToDatabase');
const getCoinsRouter = require('./endpoints/getCoins');
const getCoinRouter = require('./endpoints/getCoin');
const addReviewRouter = require('./endpoints/postReview');
const postCoin = require('./endpoints/postCoin');
const putOpinion = require('./endpoints/putOpinion');
const deleteOpinion = require('./endpoints/deleteOpinion');


const app = express();
const port = 3001;

databaseConnection();

app.use(express.json());
app.use(getCoinsRouter);
app.use(getCoinRouter);
app.use(addReviewRouter);
app.use(postCoin);
app.use(putOpinion);
app.use(deleteOpinion);

app.listen(port, () => {
    console.log(`Application works on port: ${port}`);
});