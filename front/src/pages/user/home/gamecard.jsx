import React, { useState } from 'react';

function GameCard({ game, onCardClick }) {
    const [isHovered, setHover] = useState(false);

    const borderStyle = {
        border: isHovered ? '2px solid white' : '0px solid black',
        boxSizing: 'border-box',
    };

    return (
        <div
            key={game.game_id}
            className="game-card"
            style={borderStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => onCardClick(game)} // Pass game data to parent
        >
            <div className="game-image">
                <img src={game.image_url} alt={game.name} />
            </div>
            <div className="game-details">
                <h3 className="game-title">{game.game_name}</h3>
                <p className="game-publisher">{game.publisher}</p>
                <p className="game-genre">{game.genre}</p>
                <div className="game-condition-price">
                    <span className="game-price">${game.price ? game.price : 'N/A'}</span>
                    <span className="game-condition">{game.condition}</span>
                </div>
                <p className="game-availability">Available for Rent</p>
            </div>
        </div>
    );
}

export default GameCard;
