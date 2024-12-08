import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sell.css';

const SellPage = () => {
    const [gameDetails, setGameDetails] = useState({
        name: '',
        publisher: '',
        genre: '',
        condition: '',
        imageUrl: '',
        price: '',
        ratePerDay: '',
        isRent: 'N',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGameDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('user_id');
        const gameData = { ...gameDetails, user_id };
        console.log(gameData)
        axios.post('http://localhost:4000/home/sell', gameData)
            .then(response => {
                console.log('Game listed successfully:', response.data);
                alert('Game listed successfully!');
                // Reset the form fields
                setGameDetails({
                    name: '',
                    publisher: '',
                    genre: '',
                    condition: '',
                    imageUrl: '',
                    price: '',
                    ratePerDay: '',
                    isRent: 'N'
                });
            })
            .catch(error => {
                console.error('Error listing game:', error);
                alert('An error occurred while submitting the game details. Please try again.');
            });
    }

    return (
        <div className="sell-page">
            <h1>Sell Your Game</h1>
            <form onSubmit={handleSubmit} className="sell-form">
                <div className="form-group">
                    <label htmlFor="name">Game Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={gameDetails.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="publisher">Publisher</label>
                    <input
                        type="text"
                        id="publisher"
                        name="publisher"
                        value={gameDetails.publisher}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={gameDetails.genre}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <select
                        id="condition"
                        name="condition"
                        value={gameDetails.condition}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Used">Used</option>
                        <option value="Damaged">Damaged</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={gameDetails.imageUrl}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price (in USD)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={gameDetails.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ratePerDay">Rate Per Day (in USD)</label>
                    <input
                        type="number"
                        id="ratePerDay"
                        name="ratePerDay"
                        value={gameDetails.ratePerDay}
                        onChange={handleInputChange}
                        required={gameDetails.isRent === 'Y'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="isRent">Available for Rent?</label>
                    <select
                        id="isRent"
                        name="isRent"
                        value={gameDetails.isRent}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">Submit Game</button>
            </form>
        </div>
    );
}

export default SellPage;
