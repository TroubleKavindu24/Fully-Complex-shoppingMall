import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon, AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import CustomerNav from '../../components/customer-Nav';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  leftNavLink: {
    display: 'flex',
    alignItems: 'center',
    float: 'left',
    marginRight: theme.spacing(2),
    '&>*': {
      marginRight: theme.spacing(2),
      color: 'inherit',
    }
  },
  rightNavLink: {
    display: 'flex',
    alignItems: 'center',
    float: 'right',
  },
  nac: {
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  hero: {
    background: 'url("/path/to/hero-image.jpg")', // Replace with path to hero image
    backgroundSize: 'cover',
    height: '400px', // Adjust height as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
  },
}));

const CustomerHomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomerNav />

      <div className={classes.hero}>
        <Typography variant="h2">Welcome to Our Store</Typography>
        <Typography variant="h5">Discover the latest trends and deals</Typography>
      </div>

      {/* Add your shop, stalls, and events sections here */}
    </div>
  );
};

export default CustomerHomePage;
