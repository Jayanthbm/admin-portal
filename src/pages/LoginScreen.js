// src/pages/LoginScreen.js

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EmailInput from '../components/Input/EmailInput';
import PasswordInput from '../components/Input/PasswordInput';
import { API_ENDPOINTS, PATHS, REFRESH_KEY, TOKEN_KEY } from '../constants';
import { post } from '../helpers/api.helper';
import { setToken } from '../helpers/auth.helper';
import useAuth from '../hooks/useAuth';
import useSnackBar from '../hooks/useSnackBar';

const LoginScreen = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATHS.DASHBOARD);
    }
  }, [isLoggedIn, navigate]);

  const showSnackbar = useSnackBar();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await post(API_ENDPOINTS.LOGIN, { email, password });
      if (result.status === 200) {
        showSnackbar(result.message, 'success');
        setToken(TOKEN_KEY, result.data.accessToken);
        setToken(REFRESH_KEY, result.data.refreshToken);
        setIsLoggedIn(true);
        navigate(PATHS.DASHBOARD);
      } else {
        showSnackbar(result.message, 'error');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ mt: 20 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <Box sx={{ mt: 1 }}>
            <EmailInput
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              setValidationState={setValidEmail}
            />

            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              setValidationState={setValidPassword}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              loading={loading}
              loadingPosition="start"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<LoginIcon />}
              disabled={validEmail && validPassword ? false : true}
              onClick={handleLogin}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginScreen;
