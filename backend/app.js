const express = require('express');
const databaseConnection = require('./database/ConnectToDatabase');
const getCoinsRouter = require('./endpoints/getCoins');
const getCoinRouter = require('./endpoints/getCoin');

const app = express();
const port = 3000;

databaseConnection();

app.use(getCoinsRouter);
app.use(getCoinRouter);

app.listen(port, () => {
    console.log(`Application works on port: ${port}`);
});