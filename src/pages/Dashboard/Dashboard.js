import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuthContext();

  return (
    <div>
      <p>Secret Dashboard</p>
      <p>{user.firstName} is Logged In!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
