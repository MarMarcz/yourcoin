'use client';

import { useEffect, useState } from 'react';

function Coins() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/coins')
      .then(response => response.json())
      .then(data => setCoins(data));
  }, []);

  return (
    <div>
      {coins.map((coin, index) => (
        <div key={index}>
          <h2>{coin.title}</h2>
          <img src={coin.image} alt="Coin" style={{ width: '200px', height: '200px' }} />          <p>{coin.prizeWithoutShipping}</p>
          <p>{coin.prizeWithShipping}</p>
          <p>{coin.shortDescription}</p>
          <p>{coin.quantityInStock}</p>
        </div>
      ))}
    </div>
  )
}

export default Coins;