import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        // Redirect the user to another page or perform any other action
        // For example: window.location.href = '/dashboard';
        console.log('Login successful');
      } else {
        // Login failed
        const data = await response.json();
        setError(data.error || 'Failed to login');
      }
    } catch (error) {
      setError('Failed to login');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="login-form-label">Email</label>
          <input type="email" className="login-form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="login-form-label">Password</label>
          <input type="password" className="login-form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary login-btn-primary">Login</button>
      </form>
      <p>Don't have an account? <a href="/register" className="login-link">Register here</a></p>
    </div>
  );
};

export default LoginPage; 

/*import React, { useState } from 'react';
import Dashboard from './Dashboard'; // Import your Dashboard component
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        setIsLoggedIn(true);
        console.log('Login successful');
      } else {
        // Login failed
        const data = await response.json();
        setError(data.error || 'Failed to login');
      }
    } catch (error) {
      setError('Failed to login');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <Dashboard userEmail={email} /> 
      ) : (
        <>
          <h2>Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="login-form-label">Email</label>
              <input type="email" className="login-form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="login-form-label">Password</label>
              <input type="password" className="login-form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary login-btn-primary">Login</button>
          </form>
          <p>Don't have an account? <a href="/register" className="login-link">Register here</a></p>
        </>
      )}
    </div>
  );
};

export default LoginPage; */
