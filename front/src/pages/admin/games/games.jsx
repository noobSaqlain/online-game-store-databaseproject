import React, { useState, useEffect } from 'react';
import NavBar from '../../user/home/navbar/navbar';
import axios from 'axios';
import './games.css';

const Games = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [error, setError] = useState();
    const [searchQuery, setSearchQuery] = useState('');  // State for search query

    // Fetch games
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin/games');
                if (res.data.success) {
                    setGames(res.data.games);
                    setFilteredGames(res.data.games); // Initially display all games
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

    // Handle the delivery status change
    const handleDeliveryStatusChange = async (deliveryId, newStatus) => {
        console.log(deliveryId, newStatus);
        try {
            const res = await axios.put('http://localhost:4000/admin/delivery-status', {
                deliveryId: deliveryId,
                status: newStatus,
            });
            if (res.data.success) {
                console.log('Worked');
            } else {
                setError(res.data.message || 'Failed to update delivery status');
            }
        } catch (e) {
            console.error('Error updating delivery status:', e);
            setError('An error occurred while updating delivery status');
        }
    };

    // Filter games based on search query
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = games.filter((game) => {
            return (
                game.game_name.toLowerCase().includes(query) ||  // Search by game name
                (game.first_name && game.first_name.toLowerCase().includes(query)) ||  // Search by owner's first name
                (game.last_name && game.last_name.toLowerCase().includes(query)) // Search by owner's last name
            );
        });

        setFilteredGames(filtered); // Update the filtered list
    };

    return (
        <>
            <NavBar />
            <div className="admin-games-container">
                <h1>Games</h1>
                {error && <p className="admin-error">{error}</p>}

                {/* Search input */}
                <div className="admin-search">
                    <input
                        type="text"
                        placeholder="Search by game name or owner..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="admin-games-list">
                    {filteredGames.length > 0 ? (
                        filteredGames.map((game, index) => (
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
                                        value={game.delivery_status}
                                        onChange={(e) => {
                                            // If the current status is already 'Delivered', prevent any change
                                            if (game.delivery_status === 'Delivered') {
                                                return; // Don't allow any changes
                                            }

                                            // Otherwise, proceed with status update
                                            handleDeliveryStatusChange(game.delivery_id, e.target.value);
                                        }}
                                        disabled={game.delivery_status === 'delivered'}  // Disable the entire select when status is 'Delivered'
                                    >
                                        <option value="Pending" disabled={game.delivery_status === 'delivered'}>
                                            {game.delivery_status === 'delivered' ? 'Closed' : 'Pending'}
                                        </option>
                                        <option value="Shipped" disabled={game.delivery_status === 'delivered'}>
                                            Shipped
                                        </option>
                                        <option value="Delivered" disabled={game.delivery_status === 'delivered'}>
                                            Delivered
                                        </option>
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
