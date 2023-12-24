'use client';

import { useEffect, useState } from 'react';
import CoinCard from './CoinCard';

function Coins() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/coins')
      .then(response => response.json())
      .then(data => setCoins(data));
  }, []);

  return (
    <div className="flex flex-wrap justify-around">
      {coins.map((coin, index) => (
        <CoinCard key={index} coin={coin} />
      ))}
    </div>
  )
}

export default Coins;