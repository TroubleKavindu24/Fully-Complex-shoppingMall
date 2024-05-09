import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent, Button, Modal, TextField, IconButton } from '@material-ui/core';
import axios from 'axios';
import CustomerNav from '../../components/customer-Nav';
import { API_URL } from '../../constants/constants';
import shopImage from '../../images/shop.png'; 
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '99.5vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'relative',
  },
  card: {
    maxWidth: 1000,
    margin: 'auto',
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
  media: {
    height: 400,
    width: 600,
  },
  description: {
    marginTop: theme.spacing(2),
  },
  price: {
    marginTop: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(3),
    height: '99.5vh',
    width: '98.5vw',
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(5px)',
    position: 'absolute',
    top: '70px',
    zIndex: 1,
  },
  subContainer: {},
  illustration: {
    position: "absolute",
    zIndex: 0,
    left: 0,
    width: '100%',
    height: '92vh',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    '& > *': {
      marginBottom: theme.spacing(1),
    }
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    margin: 'auto',
    marginTop: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
  modalInput: {
    marginBottom: theme.spacing(2),
  },
  userIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
    width: '10vw',
    height: '10vh',
  }
}));

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetchUserData = async () => { 
      setLoggedUser(JSON.parse(localStorage.getItem('user')));
      console.log(loggedUser);
      try {
        const response = await axios.get(API_URL + '/customer/get/'+ loggedUser._id);
        setUser(response.data.customer);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
    fetchUserData();
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setDeliveryAddress(user.deliveryAddress);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(API_URL + '/customer/update/'+loggedUser._id , {
        name,
        email,
        phoneNumber,
        deliveryAddress,
      });
      if (response.data.success) {
        alert('User profile updated successfully!');
        setLoggedUser(JSON.parse(localStorage.getItem('user')));
        setUser(JSON.parse(localStorage.getItem('user')));
        localStorage.setItem('user', JSON.stringify(response.data.updatedCustomer));
      } else {
        console.error('Error updating user profile: ', response.data.message);
      }
    } catch (error) {
      console.error('Error updating user profile: ', error);
    }
    handleModalClose();
  };

  return (
    <div className={classes.root}>
      <CustomerNav />
      <Grid container justify="center">
        <Grid item>
          <img src={shopImage} alt="login illustration" className={classes.illustration} />
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.subContainer}>
          {user && (
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <IconButton  >
                  <AccountCircle className={classes.userIcon} />
                </IconButton>
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Email: {user.email}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Phone Number: {user.phoneNumber}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Delivery Address: {user.deliveryAddress}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleModalOpen}>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className={classes.modalContainer}>
          <Typography variant="h5" gutterBottom>
            Edit Profile
          </Typography>
          <TextField
            className={classes.modalInput}
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            className={classes.modalInput}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            className={classes.modalInput}
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
          />
          <TextField
            className={classes.modalInput}
            label="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
