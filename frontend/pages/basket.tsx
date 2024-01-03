import React from 'react';
import Link from 'next/link';
import Coin from '@/app/components/coins/Coin';


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

const Basket = () => {

    const [cart, setCart] = React.useState<CartItem[]>([]);

    React.useEffect(() => {
        const initialCart = localStorage.getItem('cart');
        if (initialCart) {
            setCart(JSON.parse(initialCart));
        }
    }, []);


    return (
        <div>
            <div>
                <Link href="/">
                    <h1>Return</h1>
                </Link>
                <h2>Koszyk:</h2>
                {cart.map((item: any, index: number) => (
                    <div key={index}>
                        <h3>{item.coin.title}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price with shipping: {item.prizeWithShipping}</p>
                        <p>Next</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Basket;