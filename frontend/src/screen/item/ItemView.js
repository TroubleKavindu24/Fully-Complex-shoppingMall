import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent, CardMedia, Button } from '@material-ui/core';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CustomerNav from '../../components/customer-Nav';
import { API_URL } from '../../constants/constants';
import shopImage from '../../images/shop.png';

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
    subContainer: { 
    },
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
    }
}));


const addToCart = async (id, price) => {
    try {
        let customerID = JSON.parse(localStorage.getItem("user"))._id;
        const response = await axios.post(API_URL + "/cart/add", {
            itemID: id,
            stallID: localStorage.getItem("shopId"),
            customerID: customerID,
            price: price

        });
        if (response.data.success) {
            alert("Item added to cart successfully!");
        } else {
            alert("Error adding item to cart: " + response.data.message);
        }
    } catch (error) {
        console.error("Error adding item to cart: ", error);
    }
}

const ItemView = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(API_URL + `/item/get/${id}`);
                setItem(response.data.item);
            } catch (error) {
                console.error("Error fetching item data: ", error);
            }
        };
        fetchItem();
    }, [id]);

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
                    {item && (
                        <Card className={classes.card}> 
                            <CardMedia
                                className={classes.media}
                                image={item.itemImage || shopImage}
                                title={item.itemName}
                            />
                            <CardContent className={classes.content}> 
                                <Typography variant="h5" component="h2">
                                    {item.itemName}
                                </Typography>
                                <Typography className={classes.description} variant="body1" color="textSecondary" component="p">
                                    {item.itemDescription}
                                </Typography>
                                <Typography className={classes.price} variant="h6" color="textPrimary">
                                    Price: ${item.itemPrice}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={() => addToCart(item._id, item.itemPrice)} component={Link} to="/cart">
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemView;
