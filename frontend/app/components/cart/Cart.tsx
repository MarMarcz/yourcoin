import React from 'react';
import Link from 'next/link';
import Coin from '@/app/components/coins/Coin';
import ShippingForm from './ShippingForm';

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

export default function Cart() {
    const [cart, setCart] = React.useState<CartItem[]>([]);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        const initialCart = localStorage.getItem('cart');
        if (initialCart) {
            setCart(JSON.parse(initialCart));
        }
    }, []);

    const removeFromCart = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const updateQuantity = (index: number, quantity: string) => {
        const newCart = [...cart];
        newCart[index].quantity = Number(quantity);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const totalPrice = cart.reduce((total, item) => total + item.prizeWithShipping * item.quantity, 0);

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
                <Link href="/">
                    <h1 className="text-4xl font-bold mb-4 ">Return</h1>
                </Link>
                <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                    Show Form
                </button>
                <h2 className="text-2xl font-semibold mb-4">Cart:</h2>
                <p className="text-base font-bold text-blue-600 price">Total price (shipping included): {totalPrice}</p>
                {cart.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-start mb-4">
                        <h3 className="text-xl font-medium">{item.coin.title}</h3>
                        <p className="text-base">
                            Quantity:
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(index, e.target.value)}
                                className="ml-2 w-20"
                            />
                        </p>
                        <p className="text-base price">Price with shipping: {item.prizeWithShipping}</p>
                        <button onClick={() => removeFromCart(index)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                            Remove
                        </button>
                    </div>
                ))}


                {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-3/4 md:w-1/2 lg:w-3/4 xl:w-3/4">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <form>
                                        <ShippingForm />
                                    </form>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}