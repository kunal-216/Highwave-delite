import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const WelcomePage: React.FC = () => {
  const { user } = React.useContext(AuthContext) || {};
  const history = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome, {user ? user.name : 'Guest'}</h1>
      <button onClick={() => history('/reset-password')}>Reset Password</button>
    </div>
  );
};

export default WelcomePage;
