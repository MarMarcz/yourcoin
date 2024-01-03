import React, { useReducer, useState, useEffect } from 'react';
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

const initialState: CartItem[] = [];

function cartReducer(state: CartItem[], action: CartAction) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingCartItemIndex = state.findIndex(item => {
        console.log('item.coin.title:', item.coin.title); // Debug log
        console.log('action.payload.coin.title:', action.payload.coin.title); // Debug log
        return item.coin.title === action.payload.coin.title;
      });
      
      console.log('existingCartItemIndex:', existingCartItemIndex); // Debug log
      if (existingCartItemIndex !== -1) {
        const newState = [...state];
        newState[existingCartItemIndex].quantity += 1;
        console.log('newState after quantity update:', newState); // Debug log
        return newState;
      } else {
        return [...state, action.payload];
      }
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
}

function CoinCard({ coin }: { coin: Coin }) {
  const [isHovered, setIsHovered] = useState(false);
  const [cart, dispatchCart] = useReducer(cartReducer, initialState);
  const storedCart = localStorage.getItem('cart');

  useEffect(() => {
    if (storedCart) {
      dispatchCart({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
    }
  }, []);


  const addToCart = () => {
    const existingCartItem = cart.find(item => item.coin.title === coin.title);
    console.log(existingCartItem);
  
    if (existingCartItem) {
      const updatedCartItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
      dispatchCart({ type: 'ADD_TO_CART', payload: updatedCartItem });
    } else {
      const newCartItem: CartItem = { coin, quantity: 1, prizeWithShipping: coin.prizeWithShipping };
      console.log(newCartItem);
      dispatchCart({ type: 'ADD_TO_CART', payload: newCartItem });
    }
  
    window.alert("Pomyślnie dodano przedmiot do koszyka!");
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
        <p>Price without shipping: {coin.prizeWithoutShipping}</p>
        <p>Price with shipping: {coin.prizeWithShipping}</p>
        <p>{coin.shortDescription}</p>
        <p>Quantity: {coin.quantityInStock}</p>
      </div>
    </div>
  );
}

export default CoinCard;
