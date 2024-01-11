import React, { useReducer, useState, useEffect } from 'react';
import Link from 'next/link';
import "../../../styles/price.css"

interface Coin {
  image: string;
  title: string;
  prizeWithoutShipping: number;
  prizeWithShipping: number;
  shortDescription: string;
  quantityInStock: number;
  averageRating: number;
}

interface CartItem {
  coin: Coin;
  quantity: number;
  prizeWithShipping: number;
}

type AddToCartAction = {
  type: 'ADD_TO_CART';
  payload: CartItem;
};

type LoadCartAction = {
  type: 'LOAD_CART';
  payload: CartItem[];
};

type CartAction = AddToCartAction | LoadCartAction;


function cartReducer(state: CartItem[], action: CartAction) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
}

function CoinCard({ coin }: { coin: Coin }) {
  const [isHovered, setIsHovered] = useState(false);
  const storedCart = localStorage.getItem('cart');
  const initialState: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
  const [cart, dispatchCart] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const addToCart = () => {
    const newCartItem: CartItem = { coin, quantity: 1, prizeWithShipping: coin.prizeWithShipping };
    dispatchCart({ type: 'ADD_TO_CART', payload: newCartItem });
    window.alert("Successfully added item to the cart!");
  };

  return (
    <div
      className="max-w-xs rounded overflow-hidden shadow-lg m-2 relative transition-colors duration-500 hover:bg-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img className="w-full bg-white" src={coin.image} alt="Coin" />
        {isHovered && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-2 flex">
            <Link href={`coins/${coin.title}`}>
              <button className="rounded bg-gray-800 text-white p-2">
                See details
              </button>
            </Link>
            <button className="rounded bg-gray-800 text-white p-2" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{coin.title}</div>
        <p className="price">Price without shipping: {coin.prizeWithoutShipping}</p>
        <p className="price">Price with shipping: {coin.prizeWithShipping}</p>
        <p>{coin.shortDescription}</p>
        <p>Quantity: {coin.quantityInStock}</p>
      </div>
    </div>
  );
}

export default CoinCard;
