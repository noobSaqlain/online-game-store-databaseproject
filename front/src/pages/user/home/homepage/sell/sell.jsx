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
        imageUrl: ''
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
        axios.post('http://localhost:4000/home/sell', gameDetails)
            .then(response => {
                console.log('Game listed successfully:', response.data);
                alert('Game listed successfully!');
                // Reset the form fields
                setGameDetails({
                    name: '',
                    publisher: '',
                    genre: '',
                    condition: '',
                    imageUrl: ''
                });
            })
            .catch(error => {
                console.error('Error listing game:', error);
                alert('An error occurred while submitting the game details. Please try again.');
            });

    };

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
                        <option value="Used">Used</option>
                        <option value="Refurbished">Refurbished</option>
                        <option value="damaged">Damaged</option>
                        <option value="Like-new">Like new</option>
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

                <button type="submit" className="submit-button">Submit Game</button>
            </form>
        </div>
    );
};

export default SellPage;
