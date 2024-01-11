import React, { useRef, useState } from 'react';
import styles from "../../../styles/ShippingForm.module.scss";


const ShippingForm: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const deliveryMethodRef = useRef<HTMLSelectElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const [allGoodClicked, setAllGoodClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleAllGoodClick = () => {
        setAllGoodClicked(true);
    };

    const handleCancelClick = () => {
        setAllGoodClicked(false);
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const email = emailRef.current?.value;
        const deliveryMethod = deliveryMethodRef.current?.value;
        const address = addressRef.current?.value;
    

        console.log('Email:', emailRef.current?.value);
        console.log('Delivery method:', deliveryMethodRef.current?.value);
        console.log('Address:', addressRef.current?.value);

        if (email && deliveryMethod && address) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                localStorage.clear();
                window.location.href = '/';
            } else {
                setErrorMessage('Please enter a valid email address.');
            }
        } else {
            setErrorMessage('Please fill in all fields.');
        }
    };

    return (
        <form className={styles.shippingForm} onSubmit={handleSubmit}>
            <label className="label1">
                Email:
                <input type="email" ref={emailRef} required />
            </label>
            {errorMessage && <p>{errorMessage}</p>}
            <label className="label2">
                Delivery method:
                <select ref={deliveryMethodRef} required>
                    <option value="">--Please choose an option--</option>
                    <option value="Inpost">Inpost</option>
                    <option value="Courier">Courier</option>
                </select>
            </label>
            <label className="label3">
                Address:
                <input type="text" ref={addressRef} required pattern="^[a-zA-Z0-9\s,.'-/]*$" minLength={4} title="Please enter a valid address" />
            </label>
            <button type="button" onClick={handleAllGoodClick}>All Good</button>
            {allGoodClicked && (
                <>
                    <div className={styles.parent}>
                        <p className={`${styles.submitPrompt} ${styles.parent}`}>Are you sure you want to submit?</p>
                        <button className={styles.submitButton} type="submit" onClick={handleSubmit}>Submit</button>
                        <p className={`${styles.cancelPrompt} ${styles.parent}`}>Or you want to cancel?</p>
                        <button className={styles.cancelButton} type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>

                </>
            )}
        </form>
    );
}

export default ShippingForm;