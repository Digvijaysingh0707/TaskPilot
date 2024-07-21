// components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loginUser } from '../config/services/user';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter all fields.');
      return;
    }

    try {
      const result = await loginUser({ email, password })
      toast.success('Login successful!');
      localStorage.setItem('token', result.data.token);
      // console.log(result, 'THIS IS RESULT')
      // Redirect or perform additional actions
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
