import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import LoginImage from '../../images/login.webp';
import { ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: '5px',
    width: '60vw',
    height: '70vh',
    boxShadow: '0 0 6px 0px #1c1c1c',
    backdropFilter: 'blur(10px)',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    padding: theme.spacing(3),
  },
  form: {
    width: '60%',
    alignText: 'start',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  register: {
    margin: theme.spacing(3, 0, 2),
  },
  illustration: {
    width: '100%',
    height: 'auto',
    maxWidth: 600,
  },
}));

const Register = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !password) {
      alert('Please fill in all fields');
      return;
    }

    const formData = {
      name: name,
      email: email,
      phoneNumber: phone,
      deliveryAddress: address,
      password: password,
    };

    const response = await axios.post(API_URL + '/customer/add', formData);
    const data = await response.data;
    if (data.success) {
      alert('Successfully registered');
    } else {
      alert('Failed to register');
    }
    console.log('Register with:', name, email, phone, address);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.container}>
        <Grid container justify="center">
          <Grid item>
            <img src={LoginImage} alt="login illustration" className={classes.illustration} />
          </Grid>
        </Grid>
        <form className={classes.form} onSubmit={handleRegister}>
          <Grid container justify="center">
            <Grid item>
              <Typography component="h1" variant="h5">
                Create an Account
              </Typography>
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Delivery Address"
            name="address"
            autoComplete="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="password"
            name="password"
            autoComplete="password"
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
            Register
          </Button>
          <Button
            type="submit"
            fullWidth
            component={Link}
            to="/login"
            variant="contained"
            color="secondary"
            startIcon={<ExitToApp />}
          >
            Sign In
          </Button>
        </form>
      </div> 
    </Container>
  );
};

export default Register;
