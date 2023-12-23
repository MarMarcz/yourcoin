// CoinCard.js
import React from 'react';

function CoinCard({ coin }) {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-2">
        <img className="w-full" src={coin.image} alt="Coin" />
        <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{coin.title}</div>
        <p>Prize without shipping: {coin.prizeWithoutShipping}</p>
        <p>Prize with shipping: {coin.prizeWithShipping}</p>
        <p>{coin.shortDescription}</p>
        <p>Quantity: {coin.quantityInStock}</p>
      </div>
    </div>
  );
}

export default CoinCard;