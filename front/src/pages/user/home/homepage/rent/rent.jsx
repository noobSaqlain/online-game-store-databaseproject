import { React, useEffect, useState } from 'react';
import axios from "axios";
import SideBar from '../../sidebar/sidebar.jsx';
import NavBar from '../../navbar/navbar.jsx';
import "../buyRent.css";
import GameCard from '../../gamecard.jsx';


const RentPage = () => {
    const [games, setGames] = useState([]);
    const [filters, setFilters] = useState({
        publisher: '',
        genre: '',
        condition: '',
        searchTitle: '',
        priceRange: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:4000/home/rent');
                if (res.data.success) {
                    setGames(res.data.data);
                } else {
                    setError(res.data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const filteredGames = games.filter((game) => {
        let isValid = true;

        // Publisher Filter
        if (filters.publisher !== '' && game.publisher !== filters.publisher) {
            isValid = false; // Exclude if publisher doesn't match
        }

        // Genre Filter
        if (filters.genre !== '' && game.genre !== filters.genre) {
            isValid = false; // Exclude if genre doesn't match
        }

        // Condition Filter
        if (filters.condition !== '' && game.condition !== filters.condition) {
            isValid = false; // Exclude if condition doesn't match
        }

        // Price Range Filter
        if (filters.priceRange !== '' && !checkPriceRange(game.price, filters.priceRange)) {
            isValid = false; // Exclude if price range doesn't match
        }

        // Search Title Filter
        if (filters.searchTitle !== '' && !game.game_name.toLowerCase().includes(filters.searchTitle.toLowerCase())) {
            isValid = false; // Exclude if title doesn't match the search input
        }

        return isValid; // If all conditions are satisfied, keep the game, otherwise filter out
    });


    function checkPriceRange(price, range) {
        console.log(price);
        console.log(range);
        const ranges = {
            '0-20': [0, 20],
            '21-50': [21, 50],
            '51-100': [51, 100],
            '100+': [101, Infinity],
        };
        if (range === 'all' || range === '') {
            return true;
        }
        const [min, max] = ranges[range] || [0, Infinity];
        return price >= min && price <= max;
    }

    const options = {
        genres: Array.from(new Set(games.map((game) => game.genre))),
        conditions: Array.from(new Set(games.map((game) => game.condition))),
        publishers: Array.from(new Set(games.map((game) => game.publisher))),
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="rent-container">
            <NavBar />
            <SideBar onFilterChange={setFilters} options={options} />
            <div className="rent-content">
                <div className="games-list">
                    {filteredGames.length ? (
                        filteredGames.map((game) => <GameCard key={game.game_id} game={game} />)
                    ) : (
                        <div className="no-games">No games found matching the filters.</div>
                    )}
                </div>
            </div>
        </div>
    );

}
export default RentPage;