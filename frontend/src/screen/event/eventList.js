import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CustomerNav from '../../components/customer-Nav';
import { API_URL } from '../../constants/constants';
import eventImage from '../../images/event.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '99.5vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
    },
    gridContainer: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(3),
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    appTitle: {
        textAlign: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
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
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            marginBottom: theme.spacing(1),
        }
    }
}));

const InteractiveMallEventHomePage = () => {
    const classes = useStyles();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL + "/event/get");
            const data = await response.data;
            setEvents(data.eventList);
        };
        getData();
    }, [events]);

    return (
        <div className={classes.root}>
            <CustomerNav />
            <Grid container justify="center">
                <Grid item>
                    <img src={eventImage} alt="login illustration" className={classes.illustration} />
                </Grid>
            </Grid>
            <div className={classes.container}>
                <div className={classes.subContainer}>
                    <Typography variant="h4" className={classes.appTitle}>Interactive Mall Events</Typography>
                    <hr/>
                    <Grid container spacing={3} className={classes.gridContainer}>
                        {events.map((event) => (
                            <Grid item xs={12} sm={6} md={4} key={event._id}>
                                <Card className={classes.card}>
                                    <CardActionArea component={Link} to={`/event/${event._id}`}>
                                        <CardMedia
                                            className={classes.media}
                                            image={event.image || eventImage} // Assuming event.image contains the URL of the image
                                            title={event.eventName}
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {event.eventName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {event.description}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Date & Time: {event.dateTime}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Location: {event.location}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Category: {event.category}
                                            </Typography>
                                            {event.capacity && (
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Capacity: {event.capacity}
                                                </Typography>
                                            )}
                                            {event.registrationLink && (
                                                <Button variant="contained" color="primary" component={Link} to={event.registrationLink}>
                                                    Register
                                                </Button>
                                            )}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default InteractiveMallEventHomePage;
