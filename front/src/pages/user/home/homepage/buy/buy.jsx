import { React, useEffect, useState } from 'react';
import axios from "axios";
import SideBar from '../../sidebar/sidebar.jsx';
import NavBar from '../../navbar/navbar.jsx';
import './buy.css';

const BuyPage = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get('http://localhost:4000/home/buy');  // Ensure this is port 4000
                if (res.data.success) {
                    console.log(res);
                    setGames(res.data.data);
                } else {
                    console.error('Failed to fetch games:', res.data.message);
                }
            } catch (error) {
                console.error('Error fetching games:', error.message);
            }
        };

        fetchGames();
    }, []);


    return (
        <div className='buy-container'>
            <NavBar />
            <SideBar />
            <div className="buy-content">
                {/* Display games as cards */}
                <div className="games-list">
                    {games.map((game) => (
                        <div key={game.game_id} className="game-card">
                            <div className="game-image">
                                {/* Add an image or placeholder */}
                                <img src="https://via.placeholder.com/150" alt={game.name} />
                            </div>
                            <div className="game-details">
                                <h3>{game.name}</h3>
                                <p><strong>Publisher:</strong> {game.publisher}</p>
                                <p><strong>Condition:</strong> {game.condition}</p>
                                <button className="buy-button">Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BuyPage;
