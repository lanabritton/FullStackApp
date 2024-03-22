import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css'; // Import your custom CSS file for additional styling

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user input
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send registration request to backend API
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // Handle response
      if (response.ok) {
        // Registration successful
        // Redirect user to login page
        window.location.href = '/login';
      } else {
        // Registration failed
        const data = await response.json();
        setError(data.error || 'Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register user');
    }
  };

  return (
    <div className="register-container">
      <div>
        <h2>Register</h2>
        {error && <div className="register-alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="register-form-label">Name</label>
            <input type="text" className="register-form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="register-form-label">Email</label>
            <input type="email" className="register-form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="register-form-label">Password</label>
            <input type="password" className="register-form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="register-btn-primary">Register</button>
        </form>
        <div className="mt-3">
          <p>Already have an account? <Link to="/login" className="register-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
