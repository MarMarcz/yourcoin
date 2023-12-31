// CoinCard.js
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';


interface Coin {
  image: string;
  title: string;
  prizeWithoutShipping: number;
  prizeWithShipping: number;
  shortDescription: string;
  quantityInStock: number;
  averageRating: number;
}


function CoinCard({ coin }: { coin: Coin }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-2 relative transition-colors duration-500 hover:bg-gray-200"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
    <img className="w-full bg-white" src={coin.image} alt="Coin" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{coin.title}</div>
        <p>Price without shipping: {coin.prizeWithoutShipping}</p>
        <p>Price with shipping: {coin.prizeWithShipping}</p>
        <p>{coin.shortDescription}</p>
        <p>Quantity: {coin.quantityInStock}</p>
        {isHovered && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-2 flex">
            <Link href={`coins/${coin.title}`} className="rounded bg-gray-800 text-white p-2">
              See details
            </Link>
          <button className="rounded bg-gray-800 text-white p-2">Add to cart</button>
        </div>
        )}
        </div>
    </div>
  );
}

export default CoinCard;