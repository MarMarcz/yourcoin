import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

interface Review {
    user: string;
    text: string;
    rating: number;
    _id: {
        $oid: string;
      };
}

interface Coin {
    _id: {
        $oid: string;
      };
    title: string;
    reviews: Review[];
}

const ReviewEditSchema = Yup.object().shape({
    user: Yup.string().required('Required'),
    text: Yup.string().required('Required'),
    rating: Yup.number()
        .min(1, 'Rating cannot be less than 1')
        .max(5, 'Rating cannot be more than 5')
        .required('Required'),
});

const EditReviewForm: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);

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

    const handleInputChange = (coinId: string, reviewId: string, field: string, value: string | number) => {
        setCoins((prevCoins) =>
            prevCoins.map((coin) => {
                if (coin._id.$oid === coinId) {
                    return {
                        ...coin,
                        reviews: coin.reviews.map((review) => {
                            if (review._id.$oid === reviewId) {
                                return {
                                    ...review,
                                    [field]: value,
                                };
                            }
                            return review;
                        }),
                    };
                }
                return coin;
            })
        );
    };

    const handleSendClick = async (coinId: string, reviewId: string) => {
        const confirmed = window.confirm('Are you sure you want to update it?');
        if (confirmed) {
            try {
                const coinToUpdate = coins.find((coin) => coin._id.$oid === coinId);
                const reviewToUpdate = coinToUpdate?.reviews.find((review) => review._id.$oid === reviewId);
                if (coinToUpdate && reviewToUpdate) {
                    const response = await axios.put(`http://localhost:3001/api/editOpinion/${coinId}/${reviewId}`, reviewToUpdate);
                    console.log('Data sent successfully:', response.data);
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }
    };

    return (
        <div>
            <h1>Edit Review</h1>
            {coins.map((coin) =>
                coin.reviews.map((review) => (
                    <div key={review._id.$oid}>
                        <h3>
                            {coin.title}
                            <button onClick={() => handleSendClick(coin._id.$oid, review._id.$oid)}>Send</button>
                        </h3>
                        <p>
                            User:
                            <input
                                type="text"
                                value={review.user}
                                onChange={(e) => handleInputChange(coin._id.$oid, review._id.$oid, 'user', e.target.value)}
                            />
                        </p>
                        <p>
                            Text:
                            <input
                                type="text"
                                value={review.text}
                                onChange={(e) => handleInputChange(coin._id.$oid, review._id.$oid, 'text', e.target.value)}
                            />
                        </p>
                        <p>
                            Rating:
                            <input
                                type="number"
                                value={review.rating}
                                min={1}
                                max={5}
                                onChange={(e) => handleInputChange(coin._id.$oid, review._id.$oid, 'rating', Number(e.target.value))}
                            />
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default EditReviewForm;