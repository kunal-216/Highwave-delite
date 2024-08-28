import React, { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ResetPassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { resetPassword } = React.useContext(AuthContext) || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetPassword) {
      await resetPassword(currentPassword, newPassword);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
