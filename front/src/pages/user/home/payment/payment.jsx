import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css';

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const location = useLocation(); // Use the hook to access passed state
    const { price } = location.state || {};
    const navigate = useNavigate();

    function back() {
        ///here check if the payment procedure is done correctly
        navigate('/home/buy');
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
                <p><strong>{price}$</strong></p>
                <button className="confirm-payment-btn" onClick={back}>Confirm Payment</button> {/* write the payment logic and send the details to the backend */}
            </div>
        </div>
    );
}

export default Payment;
