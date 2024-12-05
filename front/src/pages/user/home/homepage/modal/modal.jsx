import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./modal.css";

const Modal = ({ isOpen, game, onClose, isRent }) => {
    const navigate = useNavigate();

    // State to track the date inputs and error message
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState(""); // Track the error message

    if (!isOpen) return null;

    function toPayment() {
        if (isRent && (!startDate || !endDate)) {
            setError("Please select both start and end dates."); // Set the error message
        } else {
            // Parse the dates to compare
            const start = new Date(startDate);
            const end = new Date(endDate);
            const minRentalPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

            if (isRent && end - start < minRentalPeriod) {
                setError("Minimum 7 days are required for rent."); // Set error for invalid rental period
            } else {
                setError(""); // Clear the error message if inputs are valid
                navigate("/home/payment", { state: { price: game.price } });
            }
        }
    }
    return (
        <div className="modal">
            <button className="modal-close" onClick={onClose}>×</button>
            <div className="modal-content">
                <div className="modal-image">
                    <img src={game.image_url} alt="Game Image" />
                </div>
                <div className="modal-details">
                    <div className="modal-title">{game.game_name}</div>
                    <div className="modal-publisher">{game.publisher}</div>
                    {isRent && (
                        <div className="date-input-container">
                            <span>from : </span>
                            <input
                                type="date"
                                className="init-date"
                                placeholder="From"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                            <span>to : </span>
                            <input
                                type="date"
                                className="end-date"
                                placeholder="To"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>} {/* Display error */}

                    <div className="modal-genre">{game.genre}</div>
                    <div className="modal-condition-price">
                        <div className="modal-condition">{game.condition}</div>
                        <div className="modal-price">{`$${game.price}`}</div>
                    </div>
                    <button className="proceed-btn" onClick={toPayment}>
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
