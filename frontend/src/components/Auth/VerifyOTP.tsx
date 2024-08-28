// src/components/Auth/VerifyOTP.tsx
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const VerifyOTP: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const { verifyOTP } = React.useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyOTP) {
      await verifyOTP(email, otp);
      navigate('/welcome');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Verify OTP</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOTP;
