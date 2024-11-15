import './home.css';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    function buyButtonHandler() {
        navigate('buy');
    }
    function sellButtonHandler() {
        navigate('sell');
    }
    function rentButtonHandler() {
        navigate('rent');
    }
    return (
        <div className="home-wrapper">
            <div className="home-buy" onClick={buyButtonHandler}>background image buy</div>
            <div className="home-rent" onClick={rentButtonHandler}>background image rent</div>
            <div className="home-sell" onClick={sellButtonHandler}>background image sell</div>
        </div>
    );
}


export default Home;