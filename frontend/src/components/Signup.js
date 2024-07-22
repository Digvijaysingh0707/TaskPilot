// src/components/Signup.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../config/services/user';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const result = await addUser(data);
      toast.success('User Registered!');
      navigate("/login")

    } catch (err) {
      // console.error(error);
      const { error } = err?.response?.data
      toast.error(error ?? 'Signup failed. Please try again.');
    }
  };

  const password = watch('password');

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
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, width: '100%', maxWidth: '400px' }}
      >
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          {...register('firstName', { required: 'First name is required' })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          {...register('lastName', { required: 'Last name is required' })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
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
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          {...register('confirmPassword', {
            validate: (value) =>
              value === password || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
