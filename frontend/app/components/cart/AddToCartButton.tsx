// //import React, { useState } from 'react';

// export interface Coin {
//     _id: string;
//     title: string;
//     prizeWithoutShipping: number;
//     prizeWithShipping: number;
//     quantityInStock: number;
//   }

//   interface AddToCartButtonProps {
//     coin: Coin;
//     quantity: number;
//     prizeWithShipping: number;
//   }
  
//   function AddToCartButton({ coin, quantity, prizeWithShipping }: AddToCartButtonProps) {
//     const { cart, setCart } = useCart();
  
//     const addToCart = () => {
//       setCart((prevCart) => {
//         const existingCoin = prevCart.find((item) => item.coin._id === coin._id);
//         if (existingCoin) {
//           return prevCart.map((item) =>
//             item.coin._id === coin._id ? { ...item, quantity: item.quantity + quantity } : item
//           );
//         } else {
//           return [...prevCart, { coin, quantity, prizeWithShipping }];
//         }
//       });
//     };
  
//     return (
//       <button onClick={addToCart} className="rounded bg-gray-800 text-white p-2">
//         Add to cart
//       </button>
//     );
//   }
  
//   export default AddToCartButton;