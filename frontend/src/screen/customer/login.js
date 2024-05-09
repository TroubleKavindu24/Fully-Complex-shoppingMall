import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LoginStyle from './style/login-style'
import { API_URL } from '../../constants/constants';
import axios from 'axios';
import LoginImage from '../../images/login.webp';
import { ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Login = () => {
  const classes = LoginStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password
    };

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (email == 'admin@gmail.com' && password == 'admin') {
      window.location.href = "/admin_dashboard";
      return;
    }
    try {
      const shopOwnerResponse = await axios.post(API_URL + '/shopOwner/login', formData);
      const shopOwnerData = shopOwnerResponse.data;
      if (shopOwnerData.success) {
        localStorage.setItem("user", JSON.stringify(shopOwnerData.shopOwner));
        window.location.href = "/permenentshop";
        return; // Exit the function if shop owner login is successful
      } else {
      }

      // If not a shop owner, attempt customer login
      const customerResponse = await axios.post(API_URL + '/customer/login', formData);
      if (customerResponse.status === 200) {
        localStorage.setItem("user", JSON.stringify(customerResponse.data.customer));
        window.location.href = "/";
      } else {
        console.log("Login failed");
        // Handle customer login failure
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.container}>
        <Grid container justify="center">
          <Grid item>
            <Grid container justify="center">
              <Grid item>
                <img src={LoginImage} alt="login illustration" className={classes.illustration} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <form className={classes.form} onSubmit={handleLogin}> 
          <Typography component="h1" variant="h5">
            Sign in to Emporium
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<ShoppingCartIcon />}
          >
            Sign In
          </Button>

          <Button
            type="submit"
            fullWidth
            component={Link }
            to="/register"
            variant="contained"
            color="secondary" 
            startIcon={<ExitToApp />}
          >
            Sign up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;