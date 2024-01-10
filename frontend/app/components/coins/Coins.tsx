'use client';

import { useEffect, useState } from 'react';
import CoinCard from './CoinCard';

export interface Coin {
  _id: string;
  title: string;
  prizeWithoutShipping: number;
  prizeWithShipping: number;
  quantityInStock: number;
}

function Coins() {
  const [coins, setCoins] = useState([]);
  const [displayedCoins, setDisplayedCoins] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [error, setError] = useState('');


  useEffect(() => {
    fetch('http://localhost:3001/api/coins')
      .then(response => response.json())
      .then(data => {
        setCoins(data);
        setDisplayedCoins(data);
      });
  }, []);


  useEffect(() => {
    let sortedCoins = [...coins];
    if (sortType === 'priceAsc') {
      sortedCoins.sort((a: any, b: any) => a.prizeWithoutShipping - b.prizeWithoutShipping);
    } else if (sortType === 'priceDesc') {
      sortedCoins.sort((a: any, b: any) => b.prizeWithoutShipping - a.prizeWithoutShipping);
    } else if (sortType === 'ratingAsc') {
      sortedCoins.sort((a: any, b: any) => a.averageRating - b.averageRating);
    } else if (sortType === 'ratingDesc') {
      sortedCoins.sort((a: any, b: any) => b.averageRating - a.averageRating);
    } else if (sortType === 'goldFirst') {
      sortedCoins.sort((a: any, b: any) => (a.material === 'Gold' ? -1 : 1));
    } else if (sortType === 'silverFirst') {
      sortedCoins.sort((a: any, b: any) => (a.material === 'Silver' ? -1 : 1));
    }
    setDisplayedCoins(sortedCoins);
  }, [sortType]);


  useEffect(() => {
    let filteredCoins = [...coins];
    if (!error) {
      filteredCoins = filteredCoins.filter((coin: any) =>
        (priceRange.min === undefined || coin.prizeWithoutShipping >= priceRange.min) &&
        (priceRange.max === undefined || coin.prizeWithoutShipping <= priceRange.max)
      );
    }
    setDisplayedCoins(filteredCoins);
  }, [priceRange, error]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    console.log("works");
    setSortType(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, ''); // remove non-numeric characters
    if (value === '' || Number(value) >= 0) {
      setPriceRange(prev => ({ ...prev, [e.target.name]: value ? Number(value) : undefined }));
      setError('');
    } else {
      setError('Please enter a valid number');
    }
  };


  return (
    <div>
      <h3>Sort Coins: </h3>
      <select onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="priceAsc">Price Ascending</option>
        <option value="priceDesc">Price Descending</option>
        <option value="ratingAsc">Rating Ascending</option>
        <option value="ratingDesc">Rating Descending</option>
        <option value="goldFirst">Gold First</option>
        <option value="silverFirst">Silver First</option>
      </select>

      <div>
        <h3>Set Price Range: </h3>
        <input type="number" name="min" min="0" onChange={handlePriceChange} placeholder="Min price" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) event.preventDefault(); }} />
        <input type="number" name="max" min="0" onChange={handlePriceChange} placeholder="Max price" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) event.preventDefault(); }} />
        {error && <p>{error}</p>}
      </div>

      <div className="flex flex-wrap justify-around">
        {displayedCoins.map((coin, index) => (
          <CoinCard key={index} coin={coin} />
        ))}
      </div>
    </div>
  )
}

export default Coins;