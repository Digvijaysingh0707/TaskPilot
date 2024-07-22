import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../config/services/user';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../App';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserDetails } = useContext(TaskContext)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter all fields.');
      return;
    }

    try {
      const result = await loginUser({ email, password })
      toast.success('Login successful!');
      let response = result.data
      let token = response?.token
      let userEmail = response?.email
      let name = response?.userName
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userName', name);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUserDetails({ name })
      navigate("/tasks")
    } catch (error) {
      let errorMessage = error?.response?.data?.error
      toast.error(errorMessage ?? "Something went wrong!");
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
