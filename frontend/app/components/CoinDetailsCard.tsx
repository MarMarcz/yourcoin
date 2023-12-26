// CoinDetailsCard.tsx
import React from 'react';
import StarRatings from 'react-star-ratings';

interface Review {
    user: string;
    text: string;
    rating: number;
}

interface Coin {
  image: string;
  title: string;
  prizeWithoutShipping: number;
  prizeWithShipping: number;
  shortDescription: string;
  quantityInStock: number;
  extendedDescription: string;
  reviews: Review[];
}

function CoinDetailsCard({ coin }: { coin: Coin }) {
  const averageRating = 
    coin.reviews.reduce((prev, curr) => prev + curr.rating, 0) / coin.reviews.length;

  return (
    <div className="flex flex-col max-w-2xl rounded overflow-hidden shadow-lg m-2 relative">
      <div className="flex">
        <img className="w-1/2 bg-white" src={coin.image} alt="Coin" />
        <div className="px-6 py-4 w-1/2">
          <div className="font-bold text-xl mb-2">{coin.title}</div>
          <p>Price without shipping: {coin.prizeWithoutShipping}</p>
          <p>Price with shipping: {coin.prizeWithShipping}</p>
          <p>{coin.shortDescription}</p>
          <p>MORE: {coin.extendedDescription}</p>
          <p>Quantity: {coin.quantityInStock}</p>
          <p>Shipping available: inpost, courier</p>
          <div className="absolute bottom-0 right-0 transform -translate-x-1/2 -translate-y-1/2 space-x-2 flex">
            <button className="rounded bg-gray-800 text-white p-2">Add to cart</button>
          </div>

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
        </div>
      </div>

      <div className="px-6 py-4">
      <p>Opinions:</p> 
        {coin.reviews.map((review, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default CoinDetailsCard;