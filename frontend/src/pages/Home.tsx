import { useNavigate } from 'react-router-dom';
import './Home.css';  

const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="home-container">
      <h1 id="home-heading">Welcome to Highway Delite</h1>
      <p id="home-description">
        Explore the best routes and travel solutions with Highway Delite. Our platform provides comprehensive information on road conditions, traffic updates, and travel tips to make your journey smoother and more enjoyable.
      </p>
      <div id="button-container">
        <button className="button" onClick={() => navigate("/signup")}>Sign Up</button>
        <button className="button" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Home;
