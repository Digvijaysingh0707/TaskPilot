import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../config/services/user';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../App';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton'; // Correct import for LoadingButton

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserDetails } = useContext(TaskContext);
  const [loginLoader, setLoginLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter all fields.');
      return;
    }

    try {
      setLoginLoader(true);
      const result = await loginUser({ email, password });
      toast.success('Login successful!');
      const response = result.data;
      const token = response?.token;
      const userEmail = response?.email;
      const name = response?.userName;
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userName', name);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUserDetails({ name });
      navigate("/tasks");
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage ?? "Something went wrong!");
      console.error(error);
    } finally {
      setLoginLoader(false);
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
        <LoadingButton
          variant="contained"
          color="primary"
          loading={loginLoader}
          loadingIndicator={<CircularProgress color="inherit" size={20} />}
          type="submit"
        >
          Login
        </LoadingButton>
      </form>
    </div>
  );
};

export default LoginPage;
