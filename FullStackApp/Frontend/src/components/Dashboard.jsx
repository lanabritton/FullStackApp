import React from 'react';

const Dashboard = ({ userEmail }) => {
  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      <p>You are logged in as: {userEmail}</p>
    </div>
  );
};

export default Dashboard;
