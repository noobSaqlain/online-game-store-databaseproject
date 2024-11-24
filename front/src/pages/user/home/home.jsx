import './home.css';
import { useNavigate } from 'react-router-dom';
import jugg from './images/jugg.jpg';
import phan from './images/phan.jpg';
import slayer from './images/slayer.jpg';

function Home() {
    const navigate = useNavigate();

    function buyButtonHandler() {
        navigate('/home/buy');
    }

    function sellButtonHandler() {
        navigate('/home/sell');
    }

    function rentButtonHandler() {
        navigate('/home/rent');
    }

    return (
        <div className="home-wrapper">
            <div className="home-buy" onClick={buyButtonHandler}>
                <img src={jugg} alt="juggernaut" className="jugg" />
                <div className="text-overlay">BUY</div>
            </div>
            <div className="home-rent" onClick={rentButtonHandler}>
                <img src={phan} alt="phantom assassin" className="phan" />
                <div className="text-overlay">RENT</div>
            </div>
            <div className="home-sell" onClick={sellButtonHandler}>
                <img src={slayer} alt="slayer" className="slayer" />
                <div className="text-overlay">SELL</div>
            </div>
        </div>
    );
}

export default Home;
