import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../config/services/user';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../App';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { setUserDetails } = useContext(TaskContext);
  const [loginLoader, setLoginLoader] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoginLoader(true);
      const result = await loginUser(data);
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8,
      }}
    >
      <Typography variant="h4" component="h1">
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, width: '100%', maxWidth: '400px' }}
      >
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          loading={loginLoader}
          loadingIndicator={<CircularProgress color="inherit" size={20} />}
          type="submit"
        >
          Login
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default LoginPage;
