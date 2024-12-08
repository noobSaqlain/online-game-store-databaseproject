import React, { useState, useEffect } from 'react';
import NavBar from '../../user/home/navbar/navbar';
import axios from 'axios';
import './games.css';

const Games = () => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    // Fetch games data from the backend
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin/games');
                if (res.data.success) {
                    setGames(res.data.games);
                } else {
                    setError(res.data.message || 'Failed to fetch games');
                }
            } catch (e) {
                console.error('Error fetching games:', e);
                setError('An error occurred while fetching games data');
            }
        };
        fetchGames();
    }, []);

    // Handle delivery status change
    const handleDeliveryStatusChange = async (trackingNumber, newStatus) => {
        try {
            const res = await axios.put(`http://localhost:4000/admin/delivery-status`, {
                trackingNumber,
                status: newStatus,
            });
            if (res.data.success) {
                setGames((prevGames) =>
                    prevGames.map((game) =>
                        game.tracking_number === trackingNumber
                            ? { ...game, delivery_status: newStatus }
                            : game
                    )
                );
            } else {
                setError(res.data.message || 'Failed to update delivery status');
            }
        } catch (e) {
            console.error('Error updating delivery status:', e);
            setError('An error occurred while updating delivery status');
        }
    };

    return (
        <>
            <NavBar />
            <div className="admin-games-container">
                <h1>Games</h1>
                {error && <p className="admin-error">{error}</p>}
                <div className="admin-games-list">
                    {games.length > 0 ? (
                        games.map((game, index) => (
                            <div key={index} className="admin-game-card">
                                <h2>{game.game_name}</h2>
                                <p>
                                    <strong>Price:</strong> ${game.price}
                                </p>
                                <p>
                                    <strong>Rate Per Day:</strong> ${game.rate_per_day}
                                </p>
                                <p>
                                    <strong>Rented:</strong> {game.is_rent === 'Y' ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Owner:</strong> {game.first_name} {game.last_name} ({game.email})
                                </p>
                                <p>
                                    <strong>Delivery Status:</strong> {game.delivery_status || 'Not Applicable'}
                                </p>
                                {(!game.isavailable) && (
                                    <select
                                        value={game.delivery_status || 'Pending'}
                                        onChange={(e) =>
                                            handleDeliveryStatusChange(game.tracking_number, e.target.value)
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No games found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Games;
