import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';

interface Review {
    _id: string;
    user: string;
    text: string;
    rating: number;
}

interface Coin {
    _id: string;
    reviews: Review[];
    title: string;
}

const EditReviewForm: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [activeInput, setActiveInput] = useState<string | null>(null);

    useLayoutEffect(() => {
        const inputElements = document.querySelectorAll('input');
        inputElements.forEach(input => {
            if (input.id === activeInput) {
                input.style.backgroundColor = 'pink';
            } else {
                input.style.backgroundColor = '';
            }
        });
    }, [activeInput]);

    const fetchCoins = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/coins');
            setCoins(response.data);
        } catch (error) {
            console.error('Error fetching coins:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Coin[]>('http://localhost:3001/api/coins');
                setCoins(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log('Coins:', coins);
    }, [coins]);

    const handleInputChange = (coinId: string, reviewId: string, field: string, value: string | number) => {
        if ((field === 'user' || field === 'text') && !/^[a-zA-Z0-9\s]*$/.test(value as string)) {
            alert('No special characters allowed');
            return;
        }

        if (field === 'rating' && ((value as number) < 1 || (value as number) > 5)) {
            alert('Rating must be between 1 and 5');
            return;
        }
        setCoins((prevCoins) =>
            prevCoins.map((coin) => {
                if (coin._id === coinId) {
                    return {
                        ...coin,
                        reviews: coin.reviews.map((review) => {
                            if (review._id === reviewId) {
                                return {
                                    ...review,
                                    [field]: value,
                                };
                            }
                            return { ...review };
                        }),
                    };
                }
                return { ...coin };
            })
        );
    };

    const handleSendClick = async (coinId: string, reviewId: string) => {
        const confirmed = window.confirm('Are you sure you want to update it?');
        if (confirmed) {
            try {
                const coinToUpdate = coins.find((coin) => coin._id === coinId);
                const reviewToUpdate = coinToUpdate?.reviews.find((review) => review._id === reviewId);
                if (coinToUpdate && reviewToUpdate) {
                    const response = await axios.put(`http://localhost:3001/api/editOpinion/${coinId}/${reviewId}`, reviewToUpdate);
                    console.log('Data sent successfully:', response.data);
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }
    };

    const handleDeleteClick = async (coinId: string, reviewId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this review?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:3001/api/deleteOpinion/${coinId}/${reviewId}`);
                fetchCoins();
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 m-4 bg-white rounded shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-center">Edit Review</h1>
                {coins.map((coin) =>
                    coin.reviews.map((review) => (
                        <div key={review._id} className="mb-4">
                            <h3 className="flex justify-between">
                                {coin.title}
                                <div>
                                    <button className="px-3 py-1 bg-green-500 text-white rounded mr-2" onClick={() => handleSendClick(coin._id, review._id)}>Send</button>
                                    <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDeleteClick(coin._id, review._id)}>Delete</button>
                                </div>
                            </h3>
                            <p>
                                User:
                                <input
                                    id={`${coin._id}-${review._id}-user`}
                                    type="text"
                                    value={review.user}
                                    onFocus={() => setActiveInput(`${coin._id}-${review._id}-user`)}
                                    onBlur={() => setActiveInput(null)}
                                    onChange={(e) => handleInputChange(coin._id, review._id, 'user', e.target.value)}
                                    className="w-full px-3 py-2 mt-1 border rounded-md"
                                />
                            </p>
                            <p>
                                Text:
                                <input
                                    id={`${coin._id}-${review._id}-text`}
                                    type="text"
                                    value={review.text}
                                    onFocus={() => setActiveInput(`${coin._id}-${review._id}-text`)}
                                    onBlur={() => setActiveInput(null)}
                                    onChange={(e) => handleInputChange(coin._id, review._id, 'text', e.target.value)}
                                    className="w-full px-3 py-2 mt-1 border rounded-md"
                                />
                            </p>
                            <p>
                                Rating:
                                <input
                                    id={`${coin._id}-${review._id}-rating`}
                                    type="number"
                                    value={review.rating}
                                    min={1}
                                    max={5}
                                    onFocus={() => setActiveInput(`${coin._id}-${review._id}-rating`)}
                                    onBlur={() => setActiveInput(null)}
                                    onChange={(e) => handleInputChange(coin._id, review._id, 'rating', Number(e.target.value))}
                                    className="w-full px-3 py-2 mt-1 border rounded-md"
                                />
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EditReviewForm;