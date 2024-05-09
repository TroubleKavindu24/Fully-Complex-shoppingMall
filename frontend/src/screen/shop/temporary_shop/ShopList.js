import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CustomerNav from '../../../components/customer-Nav';
import { API_URL } from '../../../constants/constants';
import shopImage from '../../../images/shop.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        position: 'relative',
    },
    container: {
        padding: theme.spacing(3),
        position: 'relative',
        zIndex: 1,
    },
    illustration: {
        position: 'absolute',
        zIndex: 0,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
    shopButton: {
        marginTop: theme.spacing(2),
    },
    illustration: {
        position: 'absolute',
        zIndex: 0,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'blur(5px)', // Apply blur effect directly here
    },
    blur: {
        filter: 'blur(5px)', // Adjust the blur intensity as needed
    },
}));

const TemporaryShopHomePage = () => {
    const classes = useStyles();
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL + '/temporaryShop/get');
            const data = await response.data;
            setShops(data.temporaryShops);
        };
        getData();
    }, [shops]);

    return (
        <div className={classes.root}>
            <img src={shopImage} alt="login illustration" className={classes.illustration} />


            <div className={classes.container}>
                <Typography variant="h4" className={`${classes.title} text-white`}>Temporary Shops</Typography>
                <hr />
                <Grid container spacing={3} justify="center">
                    {shops.map((shop) => (
                        <Grid item xs={12} sm={6} md={3} key={shop.stallID}>
                            <Card className={classes.card}>
                                <CardActionArea component={Link} to={`/shop/${shop.stallID}`}>
                                    <CardMedia
                                        className={classes.media}
                                        image={shop.stallImage || shopImage} // Assuming shop.stallImage contains the URL of the image
                                        title={shop.stallName}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {shop.stallName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {shop.stallDescription}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.shopButton}
                                            component={Link}
                                            to={`/shop`}
                                            onClick={() => {
                                                localStorage.setItem('shop', shop.stallID);
                                                localStorage.setItem('shopName', shop.stallName);
                                            }}
                                        >
                                            Shop Now
                                        </Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default TemporaryShopHomePage;
