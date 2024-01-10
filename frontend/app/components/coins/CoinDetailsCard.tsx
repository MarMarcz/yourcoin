// CoinDetailsCard.tsx
import React from 'react';
import StarRatings from 'react-star-ratings';
import AddReview from '../AddReview';
import { useMemo, useState } from 'react';
import { useReducer, useEffect } from 'react';
import "../../../styles/price.css"
import { Provider } from 'react-redux';
import store from './../footer/store';
import Footer from '../footer/Footer';

interface Review {
  user: string;
  text: string;
  rating: number;
}

interface Coin {
  _id: string;
  image: string;
  title: string;
  prizeWithoutShipping: number;
  prizeWithShipping: number;
  shortDescription: string;
  quantityInStock: number;
  extendedDescription: string;
  reviews: Review[];
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

function CoinDetailsCard({ coin }: { coin: Coin }) {
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatchCart({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatchCart({ 
      type: 'ADD_TO_CART', 
      payload: { 
        coin, 
        quantity, 
        prizeWithShipping: coin.prizeWithShipping 
      } 
    });
    window.alert("Successfully added item to the cart!");
  };


  const averageRating =
    coin.reviews.length > 0
      ? coin.reviews.reduce((prev, curr) => prev + curr.rating, 0) / coin.reviews.length
      : 0;

  const renderedReviews = useMemo(() => coin.reviews.map((review, index) => (
    <div key={index}>
      <p>{review.user}: {review.text}
        <StarRatings
          rating={review.rating}
          starRatedColor="gold"
          numberOfStars={5}
          name='rating'
          starDimension="20px"
          starSpacing="2px"
          starHoverColor="gold"
          starEmptyColor="gray"
        />
      </p>
    </div>
  )), [coin.reviews]);


  return (
    <div className="flex flex-col max-w-2xl rounded overflow-hidden shadow-lg m-2 relative">
          <Provider store={store}>
      <div className="flex">
        <img className="w-1/2 bg-white" src={coin.image} alt="Coin" />
        <div className="px-6 py-4 w-1/2">
          <div className="font-bold text-xl mb-2">{coin.title}</div>
          <p className="price">Price without shipping: {coin.prizeWithoutShipping}</p>
          <p className="price">Price with shipping: {coin.prizeWithShipping}</p>
          <p>{coin.shortDescription}</p>
          <p>MORE: {coin.extendedDescription}</p>
          <p>Quantity: {coin.quantityInStock}</p>
          <p>Shipping available: inpost, courier</p>

          <p>Average Rating:
            <StarRatings
              rating={averageRating}
              starRatedColor="gold"
              numberOfStars={5}
              name='averageRating'
              starDimension="20px"
              starSpacing="2px"
              starHoverColor="gold"
              starEmptyColor="gray"
            />
          </p>

          <div className="space-x-2 flex">
            <input
              type="number"
              min="1"
              max={coin.quantityInStock}
              value={quantity}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= coin.quantityInStock) {
                    setQuantity(value);
                }
            }}
              className="rounded p-2"
            />
       <button className="rounded bg-gray-800 text-white p-2" onClick={addToCart}>Add to cart</button>

          </div>

        </div>
      </div>

      <div className="px-6 py-4">
        <p>Opinions:</p>
        {renderedReviews}
      </div>

      <AddReview coinId={coin._id} />
      <Footer initialFooterText="Tekst stopki" />   
            </Provider> 
    </div>
 
  );
}

export default CoinDetailsCard;