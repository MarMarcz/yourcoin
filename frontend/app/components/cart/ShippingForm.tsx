import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';


const ShippingForm: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const deliveryMethodRef = useRef<HTMLSelectElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const [allGoodClicked, setAllGoodClicked] = useState(false);

    const handleAllGoodClick = () => {
        setAllGoodClicked(true);
    };

    const handleCancelClick = () => {
        setAllGoodClicked(false);
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

            console.log('Email:', emailRef.current?.value);
            console.log('Delivery method:', deliveryMethodRef.current?.value);
            console.log('Address:', addressRef.current?.value);
    
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" ref={emailRef} required />
            </label>
            <label>
                Delivery method:
                <select ref={deliveryMethodRef} required>
                    <option value="">--Please choose an option--</option>
                    <option value="Inpost">Inpost</option>
                    <option value="Courier">Courier</option>
                </select>
            </label>
            <label>
                Address:
                <input type="text" ref={addressRef} required pattern="^[a-zA-Z0-9\s,.'-/]*$" minLength={4} title="Please enter a valid address" />
            </label>
            <button type="button" onClick={handleAllGoodClick}>All Good</button>
            {allGoodClicked && (
                <>
                    <p>Are you sure you want to submit?</p>
                    <button type="submit">Submit</button>
                    <p>Or you want to cancel?</p>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </>
            )}
        </form>
    );
}

export default ShippingForm;