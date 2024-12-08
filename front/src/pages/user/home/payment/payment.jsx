import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './payment.css';

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const navigate = useNavigate();
    const location = useLocation();
    const { game, isRent, startDate, endDate } = location.state || {};

    console.log(game)
    console.log(isRent)

    function back() {
        const requestData = {
            game: game,
            user_id: localStorage.getItem("user_id"),
            isRent: isRent,
            startDate: startDate,
            endDate: endDate
        };

        // Use Axios to send a POST request to the backend
        axios.post('http://localhost:4000/home/payment', requestData)
            .then(response => {
                // Check the success flag from backend response
                if (response.data.success) {
                    alert(response.data.message);  // Show success message

                } else {
                    // Handle backend error
                    alert(`Error: ${response.data.message}`);
                }
            })
            .catch(error => {
                // Handle errors during the request
                console.error('Error during the request:', error);
                alert('An error occurred during the transaction.');
            });
    }



    return (
        <div className="payment-container">
            <h1>Payment Method</h1>

            {/* Only Credit Card Option */}
            <div className="payment-methods">
                <label>
                    <input
                        type="radio"
                        value="creditCard"
                        checked={paymentMethod === 'creditCard'}
                        onChange={() => setPaymentMethod('creditCard')}
                    />
                    Credit Card
                </label>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'creditCard' && (
                <div className="credit-card-form">
                    <h2>Enter Credit Card Details</h2>
                    <form>
                        <div>
                            <label>Card Number:</label>
                            <input type="text" placeholder="1234 5678 9101 1121" required />
                        </div>
                        <div>
                            <label>Expiration Date:</label>
                            <input type="month" required />
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input type="text" placeholder="123" required />
                        </div>
                        <div>
                            <label>Name on Card:</label>
                            <input type="text" required />
                        </div>
                    </form>
                </div>
            )}

            {/* Order Summary */}
            <div className="order-summary">
                <h2>Order Summary</h2>
                <p><strong>{!isRent ? game.price : game.price * ((endDate - startDate) / (1000 * 60 * 60 * 24))}$</strong></p>
                <button className="confirm-payment-btn" onClick={back}>Confirm Payment</button>
            </div>
        </div>
    );
}

export default Payment;
