import React from 'react'

function GameCard({ game }) {
    console.log(game);
    return (<div key={game.game_id} className="game-card">
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
    </div>);

};


export default GameCard;